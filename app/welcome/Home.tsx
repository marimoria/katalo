import { useEffect, useRef, useState } from "react";
import TextType from "~/components/TextType";
import LogoLoop from "~/components/LogoLoop";
import { Compass, Heart, Filter } from "~/components/SVGIcons";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

import cloudSvg from "~/images/cloud.svg";
import grassFieldSvg from "~/images/grass_field.svg";
import heroImage1Svg from "~/images/hero_image_1.svg";
import heroImage2Svg from "~/images/hero_image_2.svg";
import heroImage3Svg from "~/images/hero_image_3.svg";
import mascotYaySvg from "~/images/mascot_yay.svg";
import { useParallax } from "~/components/useParallax";

const techLogos = [
	{ node: <SiReact />, title: "React", href: "https://react.dev" },
	{ node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
	{ node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
	{ node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" }
];

const heroImages = [heroImage1Svg, heroImage2Svg, heroImage3Svg];

export default function Landing() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleTextChange = (_sentence: string, index: number) => {
		// Update to next index that will be typed
		const nextIndex = (index + 1) % 3;
		setCurrentImageIndex(nextIndex);
	};

	useEffect(() => {
		const parallaxElements = document.querySelectorAll<HTMLElement>(".parallax");

		if (parallaxElements.length > 0) {
			parallaxElements.forEach((parEl) => useParallax(parEl));
		}
	});

	return (
		<main className="relative h-screen bg-linear-to-b from-light_sky to-med_sky font-helvetica overflow-hidden">
			{/* Clouds */}
			<img
				src={cloudSvg}
				alt=""
				data-speedx="0.003"
				data-speedy="0.007"
				className="parallax absolute top-6 left-6 w-24 sm:w-50 lg:top-8 lg:left-16 opacity-90 pointer-events-none z-0"
			/>
			<img
				src={cloudSvg}
				alt=""
				data-speedx="0.004"
				data-speedy="0.008"
				className="parallax absolute top-4 right-0 w-28 sm:w-60 lg:top-12 lg:right-0 opacity-90 pointer-events-none z-0"
			/>

			{/* Layout */}
			<div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center">
				{/* Text section */}
				<section className="flex flex-col justify-center items-center lg:items-start px-5 pt-4 pb-2 lg:pl-20 flex-[0.45] overflow-x-hidden">
					<div className="max-w-2xl w-full text-center lg:text-left overflow-hidden">
						<h1 className="text-2xl sm:text-3xl lg:text-6xl font-bold leading-tight mb-1 sm:mb-3">
							<span className="text-ipb_blue">Katalo</span>,
							<span className="text-cherry_red">
								{" "}
								<TextType
									text={["Boba", "Dimsum", "Laundry"]}
									typingSpeed={200}
									pauseDuration={3000}
									showCursor={true}
									cursorCharacter="|"
									onSentenceComplete={handleTextChange}
								/>
							</span>
							<span className="text-black">di kampus dimana?</span>
						</h1>

						<p className="font-medium text-xs sm:text-base lg:text-lg mb-3 sm:mb-5 leading-relaxed">
							<span className="font-bold text-ipb_blue">Katalo</span> siap jadi teman eksplorasimu! Lihat rekomendasi
							UMKM sekitar kampus, temukan spot baru, dan dukung usaha lokal bareng teman-temanmu.
							<span className="hidden lg:block">
								{" "}
								Jelajahi direktori lengkap kami, baca ulasan jujur dari mahasiswa lain, dan dapatkan promo eksklusif.
								Dari tempat kopi buat nugas sampai jasa print terdekat, semua ada di Katalo.
							</span>
						</p>

						{/* Logo showcase */}
						<LogoLoop
							logos={techLogos}
							speed={50}
							direction="left"
							logoHeight={40}
							gap={40}
							pauseOnHover
							scaleOnHover
							className="rounded-2xl w-full h-15 sm:h-25 mb-3 sm:mb-4 flex justify-center"
						/>

						{/* Buttons */}
						<div className="flex flex-row justify-center lg:justify-start gap-2 sm:gap-3">
							<button
								className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 
                   border-2 border-cherry_red rounded-full font-bold 
                   transition-colors text-xs sm:text-sm ${
											currentImageIndex === 0
												? "bg-cherry_red text-white"
												: "bg-white text-cherry_red hover:bg-cherry_red hover:text-white"
										}`}
							>
								<Compass />
								Explore
							</button>

							<button
								className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 
                   border-2 border-vivid_orange rounded-full font-bold 
                   transition-colors text-xs sm:text-sm ${
											currentImageIndex === 1
												? "bg-vivid_orange text-white"
												: "bg-white text-vivid_orange hover:bg-vivid_orange hover:text-white"
										}`}
							>
								<Heart />
								Support
							</button>

							<button
								className={`flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-2.5 
                   border-2 border-gray_green rounded-full font-bold 
                   transition-colors text-xs sm:text-sm ${
											currentImageIndex === 2
												? "bg-gray_green text-white"
												: "bg-white text-gray_green hover:bg-gray_green hover:text-white"
										}`}
							>
								<Filter />
								Filter
							</button>
						</div>
					</div>
				</section>

				{/* Hero image */}
				<section className="relative flex items-center justify-center px-4 pb-13 lg:pb-20 lg:pr-20 flex-[0.55]">
					<div className="relative w-full max-w-sm sm:max-w-md lg:max-w-3xl">
						{heroImages.map((image, index) => (
							<img
								key={index}
								src={image}
								alt="Campus map"
								data-speedx="0.005"
								data-speedy="0.01"
								className={`parallax w-full h-auto object-contain scale-[1.05] sm:scale-100 transition-opacity duration-500 ${
									index === currentImageIndex ? "opacity-100" : "opacity-0 absolute inset-0"
								}`}
							/>
						))}
					</div>
				</section>
			</div>

			{/* Mascot */}
			<div className="absolute bottom-0 right-0 w-3/5 sm:w-1/2 lg:w-1/3 max-w-125 translate-x-1/5 lg:translate-x-1/4 pointer-events-none z-30">
				<img
					src={mascotYaySvg}
					alt="Katalo mascot"
					data-speedx="0.01"
					data-speedy="0.03"
					className="parallax w-full h-auto"
				/>
			</div>
			{/* Grass */}
			<div className="absolute bottom-0 -left-4 -right-4 pointer-events-none z-0">
				<img
					src={grassFieldSvg}
					alt=""
					className="w-[calc(100%+2rem)] block min-w-full scale-y-125 sm:scale-y-110 lg:scale-y-100 origin-bottom"
				/>
			</div>
		</main>
	);
}
