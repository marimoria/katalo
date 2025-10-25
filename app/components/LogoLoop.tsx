import { useCallback, useEffect, useRef, useState } from "react";
import "./LogoLoop.css";

export interface Logo {
	node: React.ReactNode;
	href?: string;
	title?: string;
}

interface LogoLoopProps {
	logos: Logo[];
	speed?: number;
	direction?: "left" | "right";
	logoHeight?: number;
	gap?: number;
	pauseOnHover?: boolean;
	scaleOnHover?: boolean;
	className?: string;
}

const LogoLoop = ({
	logos,
	speed = 120,
	direction = "left",
	logoHeight = 28,
	gap = 32,
	pauseOnHover = true,
	scaleOnHover = false,
	className = ""
}: LogoLoopProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	const [listWidth, setListWidth] = useState(0);
	const [copies, setCopies] = useState(3);
	const [isPaused, setIsPaused] = useState(false);

	const offsetRef = useRef(0);
	const velocityRef = useRef(0);
	const lastTimeRef = useRef<number | null>(null);
	const rafRef = useRef<number | null>(null);

	// Calculate velocity based on direction and speed
	const targetVelocity = direction === "left" ? speed : -speed;

	// Update dimensions on resize or logo changes
	const updateDimensions = useCallback(() => {
		const containerWidth = containerRef.current?.clientWidth || 0;
		const width = listRef.current?.getBoundingClientRect().width || 0;

		if (width > 0) {
			setListWidth(Math.ceil(width));
			// Calculate how many copies we need to fill the viewport + extra
			const needed = Math.ceil(containerWidth / width) + 2;
			setCopies(Math.max(3, needed));
		}
	}, []);

	// Handle window resize
	useEffect(() => {
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, [updateDimensions, logos]);

	// Animation loop
	useEffect(() => {
		const track = trackRef.current;
		if (!track || listWidth === 0) return;

		const animate = (timestamp: number) => {
			if (lastTimeRef.current === null) {
				lastTimeRef.current = timestamp;
			}

			const deltaTime = Math.max(0, timestamp - lastTimeRef.current) / 1000;
			lastTimeRef.current = timestamp;

			// Smooth velocity transition
			const target = pauseOnHover && isPaused ? 0 : targetVelocity;
			const easing = 1 - Math.exp(-deltaTime / 0.25);
			velocityRef.current += (target - velocityRef.current) * easing;

			// Update position
			let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
			nextOffset = ((nextOffset % listWidth) + listWidth) % listWidth;
			offsetRef.current = nextOffset;

			track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

			rafRef.current = requestAnimationFrame(animate);
		};

		rafRef.current = requestAnimationFrame(animate);

		return () => {
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
			lastTimeRef.current = null;
		};
	}, [targetVelocity, listWidth, isPaused, pauseOnHover]);

	const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
	const handleMouseLeave = () => pauseOnHover && setIsPaused(false);

	const rootClass = `logoloop ${scaleOnHover ? "logoloop--scale" : ""} ${className}`.trim();

	return (
		<div
			ref={containerRef}
			className={rootClass}
			style={
				{
					"--logo-height": `${logoHeight}px`,
					"--logo-gap": `${gap}px`
				} as React.CSSProperties
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div ref={trackRef} className="logoloop__track">
				{Array.from({ length: copies }).map((_, copyIndex) => (
					<ul
						key={copyIndex}
						ref={copyIndex === 0 ? listRef : undefined}
						className="logoloop__list"
						aria-hidden={copyIndex > 0}
					>
						{logos.map((logo, logoIndex) => (
							<li key={`${copyIndex}-${logoIndex}`} className="logoloop__item">
								{logo.href ? (
									<a
										href={logo.href}
										className="logoloop__link"
										aria-label={logo.title}
										target="_blank"
										rel="noreferrer noopener"
									>
										<span className="logoloop__icon">{logo.node}</span>
									</a>
								) : (
									<span className="logoloop__icon">{logo.node}</span>
								)}
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
};

export default LogoLoop;
