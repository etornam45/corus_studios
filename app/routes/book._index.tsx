import type { Prisma } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type React from "react";
import { useState, useEffect } from "react";
import {
	json,
	type LoaderFunctionArgs,
	redirect,
	useSearchParams,
} from "react-router-dom";
import { Input } from "~/components/input";
import { prisma } from "~/lib/prisma.server";

type Plan = Prisma.PlanGetPayload<{
	select: {
		slug: true;
		name: true;
		price: true;
	};
}>;

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const plans = await prisma.plan.findMany({
			select: {
				slug: true,
				name: true,
				price: true,
			},
		});
		return json({ plans });
	} catch (error) {
		console.error("Error in booking loader:", error);
		return { error: "Failed to load booking data." };
	}
};





export default function BookingPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { plans } = useLoaderData<typeof loader>() as { plans: Plan[] };

	return (
		<main className="min-h-[60svh] bg-neutral-50 dark:bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
			<form
				method="POST"
				className="bg-neutral-2 dark:bg-neutral-800 rounded-sm p-6 sm:p-8 space-y-6"
			>
				<div>
					<label
						htmlFor="plan"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Select Plan
					</label>
					<select
						id="plan"
						name="plan"
						required
						className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
					>
						<option value="" disabled selected>
							Select a plan
						</option>
						{plans.map((plan) => (
							<option
								key={plan.slug}
								value={plan.slug}
								disabled={plan.slug === "default"}
								selected={searchParams.get("plan") === plan.slug}
							>
								{plan.name} - GHC {plan.price}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Full Name
					</label>
					<Input
						type="text"
						name="name"
						id="name"
						required
						className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Email Address
					</label>
					<Input
						type="email"
						name="email"
						id="email"
						required
						className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				<div>
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Phone Number (Optional)
					</label>
					<Input
						type="tel"
						name="phone"
						id="phone"
						className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="date"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
						>
							Preferred Date
						</label>
						<Input
							type="date"
							name="date"
							id="date"
							required
							className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
							min={new Date().toISOString().split("T")[0]}
						/>
					</div>
					<div>
						<label
							htmlFor="time"
							className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
						>
							Preferred Time
						</label>
						<Input
							type="time"
							name="time"
							id="time"
							required
							className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
						/>
					</div>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
					>
						Additional Message (Optional)
					</label>
					<textarea
						id="message"
						name="message"
						rows={4}
						className="mt-1 block w-full sm:text-sm border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-md py-2 px-3 focus:ring-sky-500 focus:border-sky-500"
					/>
				</div>

				<div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-offset-neutral-800 focus:ring-sky-500 disabled:opacity-50 transition-opacity"
					>
						Send Booking Request
					</button>
				</div>
			</form>
		</main>
	);
}
