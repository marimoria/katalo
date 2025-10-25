import type { Route } from "./+types/landing";
import Home from "~/welcome/Home";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Katalo - Jelajahi Kampus" },
		{ name: "description", content: "Katalo siap jadi teman eksplorasimu!" }
	];
}

export default function Landing() {
	return <Home />;
}
