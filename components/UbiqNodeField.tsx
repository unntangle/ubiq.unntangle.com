'use client';

import { useEffect, useRef } from 'react';

/* ============================================================
 * uBIQ - animated node network.
 * A lightweight canvas background: nodes drift, link to nearby
 * neighbours, and pulses of light travel along the connections -
 * evoking an interconnected, "talking" automation ecosystem.
 *
 * Interactive: the pointer gently repels nearby nodes and acts
 * as a temporary hub that links to the closest nodes.
 * Purely decorative (aria-hidden), pointer-events: none.
 * ============================================================ */

type Node = { x: number; y: number; vx: number; vy: number; bvx: number; bvy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

const LINK_DIST = 140;       // px: link two nodes when closer than this
const MOUSE_RADIUS = 180;    // px: pointer influence radius
const MAX_PULSES = 9;
const MAX_SPEED = 2.4;       // px/frame velocity cap

export default function UbiqNodeField() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let nodes: Node[] = [];
        let pulses: Pulse[] = [];
        let raf = 0;
        let lastPulse = 0;
        const mouse = { x: 0, y: 0, active: false };

        const parent = canvas.parentElement as HTMLElement;

        const buildNodes = () => {
            // denser field; scales with area, clamped to a sensible range
            const count = Math.max(26, Math.min(72, Math.round((width * height) / 16000)));
            nodes = Array.from({ length: count }, () => {
                const bvx = (Math.random() - 0.5) * 0.24;
                const bvy = (Math.random() - 0.5) * 0.24;
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: bvx,
                    vy: bvy,
                    bvx,
                    bvy,
                    r: 1.4 + Math.random() * 2,
                };
            });
            pulses = [];
        };

        const resize = () => {
            width = parent.clientWidth;
            height = parent.clientHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.max(1, Math.floor(width * dpr));
            canvas.height = Math.max(1, Math.floor(height * dpr));
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildNodes();
            if (reduce) drawScene();
        };

        const linkedPairs = (): Array<[number, number]> => {
            const pairs: Array<[number, number]> = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) pairs.push([i, j]);
                }
            }
            return pairs;
        };

        const drawScene = () => {
            ctx.clearRect(0, 0, width, height);

            // node-to-node connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK_DIST * LINK_DIST) {
                        const d = Math.sqrt(d2);
                        const a = (1 - d / LINK_DIST) * 0.18;
                        ctx.strokeStyle = `rgba(139, 92, 246, ${a})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // pointer hub: link cursor to nearby nodes
            if (mouse.active) {
                for (const n of nodes) {
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
                        const d = Math.sqrt(d2) || 1;
                        const a = (1 - d / MOUSE_RADIUS) * 0.4;
                        ctx.strokeStyle = `rgba(196, 79, 224, ${a})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(n.x, n.y);
                        ctx.stroke();
                    }
                }
            }

            // nodes
            for (const n of nodes) {
                ctx.beginPath();
                ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // travelling pulses
            for (const p of pulses) {
                const a = nodes[p.a];
                const b = nodes[p.b];
                if (!a || !b) continue;
                const x = a.x + (b.x - a.x) * p.t;
                const y = a.y + (b.y - a.y) * p.t;
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 6);
                grad.addColorStop(0, 'rgba(196, 79, 224, 0.9)');
                grad.addColorStop(1, 'rgba(196, 79, 224, 0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, 6, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                ctx.arc(x, y, 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const step = (ts: number) => {
            for (const n of nodes) {
                // pointer repulsion
                if (mouse.active) {
                    const dx = n.x - mouse.x;
                    const dy = n.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < MOUSE_RADIUS * MOUSE_RADIUS) {
                        const d = Math.sqrt(d2) || 1;
                        const force = (1 - d / MOUSE_RADIUS) * 0.6;
                        n.vx += (dx / d) * force;
                        n.vy += (dy / d) * force;
                    }
                }

                // ease velocity back toward ambient drift
                n.vx += (n.bvx - n.vx) * 0.05;
                n.vy += (n.bvy - n.vy) * 0.05;

                // cap speed
                const sp = Math.hypot(n.vx, n.vy);
                if (sp > MAX_SPEED) {
                    n.vx = (n.vx / sp) * MAX_SPEED;
                    n.vy = (n.vy / sp) * MAX_SPEED;
                }

                n.x += n.vx;
                n.y += n.vy;

                // bounce off edges (flip both current + ambient drift)
                if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); n.bvx = Math.abs(n.bvx); }
                else if (n.x > width) { n.x = width; n.vx = -Math.abs(n.vx); n.bvx = -Math.abs(n.bvx); }
                if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); n.bvy = Math.abs(n.bvy); }
                else if (n.y > height) { n.y = height; n.vy = -Math.abs(n.vy); n.bvy = -Math.abs(n.bvy); }
            }

            // spawn a pulse on a live connection now and then
            if (ts - lastPulse > 460 && pulses.length < MAX_PULSES) {
                const pairs = linkedPairs();
                if (pairs.length) {
                    const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
                    pulses.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
                    lastPulse = ts;
                }
            }

            // advance pulses
            pulses = pulses.filter((p) => {
                p.t += p.speed;
                return p.t < 1;
            });

            drawScene();
            raf = requestAnimationFrame(step);
        };

        // ---- pointer interaction (canvas is pointer-events:none, so listen on parent) ----
        const setMouse = (clientX: number, clientY: number) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
            mouse.active = true;
        };
        const onMove = (e: MouseEvent) => setMouse(e.clientX, e.clientY);
        const onLeave = () => { mouse.active = false; };
        const onTouch = (e: TouchEvent) => {
            if (e.touches[0]) setMouse(e.touches[0].clientX, e.touches[0].clientY);
        };

        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(parent);

        if (!reduce) {
            parent.addEventListener('mousemove', onMove);
            parent.addEventListener('mouseleave', onLeave);
            parent.addEventListener('touchmove', onTouch, { passive: true });
            parent.addEventListener('touchend', onLeave);
            raf = requestAnimationFrame(step);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            parent.removeEventListener('mousemove', onMove);
            parent.removeEventListener('mouseleave', onLeave);
            parent.removeEventListener('touchmove', onTouch);
            parent.removeEventListener('touchend', onLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
}
