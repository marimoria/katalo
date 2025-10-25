import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./TextType.css";

interface TextTypeProps {
	text: string[];
	typingSpeed?: number;
	pauseDuration?: number;
	deletingSpeed?: number;
	showCursor?: boolean;
	cursorCharacter?: string;
	cursorBlinkDuration?: number;
	onSentenceComplete?: (sentence: string, index: number) => void;
	className?: string;
}

const TextType = ({
	text,
	typingSpeed = 50,
	pauseDuration = 2000,
	deletingSpeed = 30,
	showCursor = true,
	cursorCharacter = "|",
	cursorBlinkDuration = 0.5,
	onSentenceComplete,
	className = ""
}: TextTypeProps) => {
	const [displayedText, setDisplayedText] = useState("");
	const [charIndex, setCharIndex] = useState(0);
	const [textIndex, setTextIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);

	const cursorRef = useRef<HTMLSpanElement>(null);

	// Cursor blink animation
	useEffect(() => {
		if (!showCursor || !cursorRef.current) return;

		gsap.set(cursorRef.current, { opacity: 1 });
		gsap.to(cursorRef.current, {
			opacity: 0,
			duration: cursorBlinkDuration,
			repeat: -1,
			yoyo: true,
			ease: "power2.inOut"
		});
	}, [showCursor, cursorBlinkDuration]);

	// Typing animation
	useEffect(() => {
		const currentText = text[textIndex];
		let timeout: NodeJS.Timeout;

		if (isDeleting) {
			// Deleting phase
			if (displayedText === "") {
				setIsDeleting(false);

				// Trigger callback when deletion completes
				if (onSentenceComplete) {
					onSentenceComplete(text[textIndex], textIndex);
				}

				// Move to next text
				setTextIndex((prev) => (prev + 1) % text.length);
				setCharIndex(0);
				timeout = setTimeout(() => {}, pauseDuration);
			} else {
				timeout = setTimeout(() => {
					setDisplayedText((prev) => prev.slice(0, -1));
				}, deletingSpeed);
			}
		} else {
			// Typing phase
			if (charIndex < currentText.length) {
				timeout = setTimeout(() => {
					setDisplayedText((prev) => prev + currentText[charIndex]);
					setCharIndex((prev) => prev + 1);
				}, typingSpeed);
			} else {
				// Start deleting after pause
				timeout = setTimeout(() => {
					setIsDeleting(true);
				}, pauseDuration);
			}
		}

		return () => clearTimeout(timeout);
	}, [
		charIndex,
		displayedText,
		isDeleting,
		textIndex,
		text,
		typingSpeed,
		deletingSpeed,
		pauseDuration,
		onSentenceComplete
	]);

	return (
		<span className={`texttype ${className}`}>
			<span className="texttype__text">{displayedText}</span>
			{showCursor && (
				<span ref={cursorRef} className="texttype__cursor">
					{cursorCharacter}
				</span>
			)}
		</span>
	);
};

export default TextType;
