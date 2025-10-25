import { gsap } from "~/lib/vendor";

const mouse = { x: 0, y: 0 };
let rotateDeg = 0;

function transformParallax(parallaxEl: HTMLElement) {
	let speedX = parseFloat(parallaxEl.dataset.speedx || "0");
	let speedY = parseFloat(parallaxEl.dataset.speedy || "0");

	gsap.to(parallaxEl, {
		x: -mouse.x * speedX,
		y: mouse.y * speedY,
		rotationY: rotateDeg
	});
}

export function useParallax(parallaxEl: HTMLElement) {
	transformParallax(parallaxEl);

	if (window.matchMedia("(pointer: coarse)").matches) {
		window.addEventListener("touchmove", (e) => {
			mouse.x = e.touches[0].clientX - window.innerWidth / 2;
			mouse.y = e.touches[0].clientY - window.innerWidth / 2;
			rotateDeg = (mouse.x / (window.innerWidth / 2)) * 20;

			transformParallax(parallaxEl);
		});
	}

	window.addEventListener("mousemove", (e) => {
		mouse.x = e.clientX - window.innerWidth / 2;
		mouse.y = e.clientY - window.innerWidth / 2;
		rotateDeg = (mouse.x / (window.innerWidth / 2)) * 10;

		transformParallax(parallaxEl);
	});
}
