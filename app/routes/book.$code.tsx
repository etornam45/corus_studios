// `/book/${booking.id}?success=true&plan=${plan_slug}&userId=${booking.userId}`

import { useLoaderData } from "@remix-run/react";
import { json, Link, type LoaderFunctionArgs } from "react-router-dom";
import { Button } from "~/components/button";
import { prisma } from "~/lib/prisma.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
	try {
		const url = new URL(request.url);
		const success = url.searchParams.get("success");
		const plan_slug = url.searchParams.get("plan");

		if (!params.code) {
			return { success: false, plan: null };
		}

		const booking = await prisma.booking.findFirst({
			where: {
				id: params.code,
			},
		});

		if (!booking) {
			return { success: false, plan: null };
		}

		if (!success || !plan_slug) {
			return { success: false, plan: null };
		}

		const plan = await prisma.plan.findFirst({
			where: { slug: plan_slug },
			select: {
				name: true,
				price: true,
				slug: true,
			},
		});

		return json({ success, plan, booking });
	} catch (error) {
		console.error("Error in booking loader:", error);
		return { success: false, plan: null };
	}
};

export default function BookInfo() {
	const { success, plan, booking } = useLoaderData<typeof loader>();

	return (
		<div className="min-h-[calc(70vh)] flex items-center justify-center">
			<div className="w-lg">
				{success ? (
					<div className="">
						<h1 className="text-3xl font-black font-mono mb-4 text-green-5">
							<div className="i-solar-confetti-minimalistic-bold-duotone" /> Booking Successful!
						</h1>
						<p className="text-lg mb-2">
							Thank you for booking. Your booking ID is:{" "}
							<div className="p-2 w-full rounded-sm bg-blue-3 text-black mt-6 flex justify-between items-center">
								{booking.id} 
								<Button type="button"
									onClick={() => {
										navigator.clipboard.writeText(booking.id);
										alert("Booking ID copied to clipboard!");
									}}
								>
										<div  className="i-lucide-copy size-4"/> copy
								</Button>
							</div>
						</p>
						{plan && (
							<p className="text-md">
								You have booked a <strong>{plan.name}</strong> for{" "}
								<strong>GHC {plan.price}</strong>.
							</p>
						)}

						<p className="my-6 text-rose-6">
								Please copy and send your booking code to our WhatsApp to confirm your booking
						</p>


						<p className="mt-4">
							<Link
								to={`https://wa.me/message/+233551193325?text=Hello,%20I'm%20interested%20in%20your%20product`}
								className="text-blue-600 underline"
							>
								Message Corus Studios on WhatsApp.
							</Link>
						</p>
					</div>
				) : (
					<div className="text-center">
						<h1 className="text-3xl font-bold mb-2">Booking Failed</h1>
						<p className="text-lg">
							Please try again later.
							<br />
							If you have any questions, please contact our support team.
						</p>
						<p className="">
							<Link to="/book">
								<Button className="mt-4">Return to Bookings</Button>
							</Link>
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
