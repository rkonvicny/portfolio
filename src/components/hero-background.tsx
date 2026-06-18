"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const HeroBackground = () => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
	const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

	// Různé vrstvy parallaxu s odlišnou rychlostí a směrem
	const x1 = useTransform(springX, (value) => value * 1.5);
	const y1 = useTransform(springY, (value) => value * 1.5);

	const x2 = useTransform(springX, (value) => value * -0.8);
	const y2 = useTransform(springY, (value) => value * -0.8);

	const x3 = useTransform(springX, (value) => value * 0.4);
	const y3 = useTransform(springY, (value) => value * 0.4);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const x = (e.clientX / window.innerWidth - 0.5) * 100;
			const y = (e.clientY / window.innerHeight - 0.5) * 100;
			mouseX.set(x);
			mouseY.set(y);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
			{/* Plynulá pomalá animace pro mobily / když se myš nehýbe */}
			<motion.div
				className="absolute inset-0"
				animate={{
					y: [0, -15, 0],
					x: [0, 8, 0],
				}}
				transition={{
					duration: 12,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				{/* Zesvětlená mřížka tvořící hlavní podkres (Layer 3) */}
				<motion.div
					className="absolute inset-0 opacity-40 dark:opacity-30"
					style={{ x: x3, y: y3 }}
				>
					<svg className="w-full h-full">
						<pattern
							id="dotGrid"
							width="40"
							height="40"
							patternUnits="userSpaceOnUse"
						>
							<circle
								cx="2"
								cy="2"
								r="1.5"
								className="fill-zinc-400 dark:fill-zinc-600"
							/>
						</pattern>
						<rect width="100%" height="100%" fill="url(#dotGrid)" />
					</svg>
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
						<rect
							x="25"
							y="25"
							width="50"
							height="50"
							transform="rotate(45 50 50)"
						/>
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
						<circle
							cx="50"
							cy="50"
							r="35"
							strokeDasharray="8 8"
							opacity="0.5"
						/>
					</svg>
				</motion.div>
			</motion.div>
		</div>
	);
};
