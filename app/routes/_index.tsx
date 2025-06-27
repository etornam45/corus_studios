import type { MetaFunction } from "@remix-run/node";
import { json, redirect, type LoaderFunctionArgs } from "react-router-dom";
import Gallery from "~/components/sections/gallery";
import HeroSection from "~/components/sections/hero-section";
import MapLocation from "~/components/sections/map";
import PricingSection from "~/components/sections/pricing";
import Services from "~/components/sections/services";
import { prisma } from "~/lib/prisma.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Welcome to Greatness" },
		{ name: "description", content: "Just do it!" },
	];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const categories = await prisma.category.findMany({
			include: {
				Plan: true,
			},
			orderBy: {
				createdAt: "desc",
			}
		});
		return json(categories);
	} catch (error) {
		console.error("Error in loader:", error);
		return error instanceof Error;
	}
};

export default function Index() {
	return (
		<div className="min-h-screen">
			<HeroSection />
			<Gallery />
			<Services />
			<PricingSection />
			<MapLocation />
		</div>
	);
}
