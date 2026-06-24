"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from "motion/react";
import { useTheme } from "next-themes";

interface Node {
	baseX: number;
	baseY: number;
	x: number;
	y: number;
}

export interface HeroBackgroundProps {
	/** Vzdálenost mezi jednotlivými uzly sítě v pixelech */
	spacing?: number;
	/** Poloměr (v pixelech) okolí kurzoru, kde působí magnetická síla */
	pullRadius?: number;
	/** Jak silně jsou body přitahovány k myši (0.1 = slabě, 1.0 = extrémně) */
	pullStrength?: number;
	/** Velikost (poloměr) samotných uzlů v pixelech */
	nodeRadius?: number;
	/** Tloušťka spojovacích čar */
	lineWidth?: number;
	/** Rychlost návratu bodu do původní pozice (0.01 = velmi pomalu, 0.5 = okamžitě) */
	dampening?: number;
	/** Plynulost sledování pohybu myši (0.05 = velmi zpožděné, 1.0 = instantní) */
	mouseDampening?: number;
}

export const HeroBackground = ({
	spacing = 80,
	pullRadius = 400,
	pullStrength = 0.9,
	nodeRadius = 1.5,
	lineWidth = 1,
	dampening = 0.01,
	mouseDampening = 0.01
}: HeroBackgroundProps) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
	const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

	// Různé vrstvy parallaxu s odlišnou rychlostí a směrem (původní tvary)
	const x1 = useTransform(springX, (value) => value * 1.5);
	const y1 = useTransform(springY, (value) => value * 1.5);

	const x2 = useTransform(springX, (value) => value * -0.8);
	const y2 = useTransform(springY, (value) => value * -0.8);

	// Canvas a logika pro síť
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const nodesRef = useRef<Node[]>([]);
	const dimensions = useRef({ width: 0, height: 0 });
	const mousePixelRef = useRef({
		x: -1000,
		y: -1000,
		targetX: -1000,
		targetY: -1000
	});
	const { resolvedTheme } = useTheme();

	// Props musíme uložit do ref, abychom měli k jejich čerstvé hodnotě přístup v useAnimationFrame bez re-renderů
	const configRef = useRef({
		pullRadius,
		pullStrength,
		nodeRadius,
		lineWidth,
		dampening,
		mouseDampening,
		spacing
	});
	useEffect(() => {
		configRef.current = {
			pullRadius,
			pullStrength,
			nodeRadius,
			lineWidth,
			dampening,
			mouseDampening,
			spacing
		};
	}, [pullRadius, pullStrength, nodeRadius, lineWidth, dampening, mouseDampening, spacing]);

	useEffect(() => {
		// Sledování pohybu myši pro parallax prvky
		const handleMouseMoveParallax = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 100;
			const y = (e.clientY / window.innerHeight - 0.5) * 100;
			mouseX.set(x);
			mouseY.set(y);
		};

		window.addEventListener("mousemove", handleMouseMoveParallax);
		return () => window.removeEventListener("mousemove", handleMouseMoveParallax);
	}, [mouseX, mouseY]);

	// Inicializace mřížky pro Canvas
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			const parent = canvas.parentElement;
			const rect = parent
				? parent.getBoundingClientRect()
				: { width: window.innerWidth, height: window.innerHeight };

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			dimensions.current = { width: rect.width, height: rect.height };

			const ctx = canvas.getContext("2d");
			if (ctx) ctx.scale(dpr, dpr);

			const nodes: Node[] = [];
			const cols = Math.ceil(rect.width / spacing) + 2;
			const rows = Math.ceil(rect.height / (spacing * 0.866)) + 2;
			const numCols = cols + 1;

			for (let r = 0; r <= rows; r++) {
				for (let c = 0; c <= numCols; c++) {
					const offsetX = r % 2 === 0 ? 0 : spacing / 2;
					nodes.push({
						baseX: (c - 1) * spacing + offsetX,
						baseY: (r - 1) * spacing * 0.866,
						x: (c - 1) * spacing + offsetX,
						y: (r - 1) * spacing * 0.866
					});
				}
			}
			nodesRef.current = nodes;
		};

		resize();
		window.addEventListener("resize", resize);

		const onMouseMoveCanvas = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mousePixelRef.current.targetX = e.clientX - rect.left;
			mousePixelRef.current.targetY = e.clientY - rect.top;
		};

		const onMouseLeaveCanvas = () => {
			mousePixelRef.current.targetX = -1000;
			mousePixelRef.current.targetY = -1000;
		};

		window.addEventListener("mousemove", onMouseMoveCanvas);
		window.addEventListener("mouseleave", onMouseLeaveCanvas);

		return () => {
			window.removeEventListener("resize", resize);
			window.removeEventListener("mousemove", onMouseMoveCanvas);
			window.removeEventListener("mouseleave", onMouseLeaveCanvas);
		};
	}, [spacing]); // Při změně spacing se síť překreslí

	// Animační smyčka přes Framer Motion (vysoký výkon)
	useAnimationFrame(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const { width, height } = dimensions.current;
		ctx.clearRect(0, 0, width, height);

		const config = configRef.current;
		const mouse = mousePixelRef.current;
		// Smooth fyzika pohybu myši
		mouse.x += (mouse.targetX - mouse.x) * config.mouseDampening;
		mouse.y += (mouse.targetY - mouse.y) * config.mouseDampening;

		const nodes = nodesRef.current;

		// Výpočet nových pozic bodů
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const dx = mouse.x - node.baseX;
			const dy = mouse.y - node.baseY;
			const dist = Math.sqrt(dx * dx + dy * dy);

			if (dist < config.pullRadius) {
				// Síla roste blíž ke středu kurzoru
				const force = Math.pow((config.pullRadius - dist) / config.pullRadius, 1.5);
				node.x = node.baseX + dx * force * config.pullStrength;
				node.y = node.baseY + dy * force * config.pullStrength;
			} else {
				// Návrat do původní pozice
				node.x += (node.baseX - node.x) * config.dampening;
				node.y += (node.baseY - node.y) * config.dampening;
			}
		}

		// Dynamická barva na základě tématu
		const isDark =
			resolvedTheme === "dark" ||
			(!resolvedTheme &&
				typeof window !== "undefined" &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.06)";
		ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.25)";
		ctx.lineWidth = config.lineWidth;

		const cols = Math.ceil(width / config.spacing) + 2;
		const numCols = cols + 2; // Odpovídá c <= numCols z resize() -> numCols + 1 prvků

		ctx.beginPath();

		// Kreslení sítě a spojů
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const c = i % numCols;
			const r = Math.floor(i / numCols);

			// Vodorovné spojení doprava
			if (c < numCols - 1) {
				const rightNode = nodes[i + 1];
				if (rightNode) {
					ctx.moveTo(node.x, node.y);
					ctx.lineTo(rightNode.x, rightNode.y);
				}
			}

			// Spojení dolů, tvorba trojúhelníků
			if (i + numCols < nodes.length) {
				const bottomNode = nodes[i + numCols];
				if (bottomNode) {
					ctx.moveTo(node.x, node.y);
					ctx.lineTo(bottomNode.x, bottomNode.y);
				}

				const isEvenRow = r % 2 === 0;
				if (isEvenRow && c > 0) {
					const bottomLeft = nodes[i + numCols - 1];
					if (bottomLeft) {
						ctx.moveTo(node.x, node.y);
						ctx.lineTo(bottomLeft.x, bottomLeft.y);
					}
				} else if (!isEvenRow && c < numCols - 1) {
					const bottomRight = nodes[i + numCols + 1];
					if (bottomRight) {
						ctx.moveTo(node.x, node.y);
						ctx.lineTo(bottomRight.x, bottomRight.y);
					}
				}
			}

			// Kreslení kuliček (vrcholů)
			ctx.moveTo(node.x + config.nodeRadius, node.y);
			ctx.arc(node.x, node.y, config.nodeRadius, 0, Math.PI * 2);
		}

		ctx.stroke();
		ctx.fill();
	});

	return (
		<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
			{/* Canvas vrstva pro magnetickou trojúhelníkovou síť (Layer 3) */}
			<motion.div
				className="absolute inset-0 opacity-80"
				animate={{
					y: [0, -10, 0],
					x: [0, 5, 0]
				}}
				transition={{
					duration: 15,
					repeat: Infinity,
					ease: "easeInOut"
				}}
			>
				<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
			</motion.div>

			{/* Vzdálenější geometrické tvary (Layer 2) */}
			<motion.div className="absolute inset-0" style={{ x: x2, y: y2 }}>
				<svg
					className="absolute top-1/4 left-[15%] w-32 h-32 text-zinc-400/50 dark:text-zinc-600/30"
					viewBox="0 0 100 100"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<circle cx="50" cy="50" r="40" strokeDasharray="4 4" />
				</svg>
				<svg
					className="absolute bottom-[20%] right-[10%] w-24 h-24 text-zinc-400/50 dark:text-zinc-600/30"
					viewBox="0 0 100 100"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
				>
					<rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" />
				</svg>
			</motion.div>

			{/* Bližší, výraznější geometrické tvary (Layer 1) */}
			<motion.div className="absolute inset-0" style={{ x: x1, y: y1 }}>
				<svg
					className="absolute top-[15%] right-[20%] w-16 h-16 text-zinc-500/40 dark:text-zinc-500/30"
					viewBox="0 0 100 100"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<path d="M 10 50 L 90 50 M 50 10 L 50 90" />
				</svg>
				<svg
					className="absolute bottom-[30%] left-[20%] w-20 h-20 text-zinc-500/40 dark:text-zinc-500/30"
					viewBox="0 0 100 100"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
				>
					<circle cx="50" cy="50" r="20" />
					<circle cx="50" cy="50" r="35" strokeDasharray="8 8" opacity="0.5" />
				</svg>
			</motion.div>
		</div>
	);
};
