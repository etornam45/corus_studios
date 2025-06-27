import { useState } from "react"; // Import useState
import { Button } from "../button"; // Assuming this path is correct
import type { Prisma } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/_index";

export type CategoryANDPlan = Prisma.CategoryGetPayload<{
	include: {
		Plan: true;
	};
}>;

export default function PricingSection() {
	const data = useLoaderData<typeof loader>() as CategoryANDPlan[];
	const [activeCategory, setActiveCategory] = useState<CategoryANDPlan>(
		data[0],
	);

	const currentPlans = activeCategory.Plan.map((plan) => ({
		...plan,
		isFeatured: false,
	}));

	return (
		<section className="bg-slate-2 dark:bg-slate-9 py-16 sm:py-24">
			{" "}
			{/* Updated dark:bg-slate-900 */}
			<div className="container mx-auto px-4">
				<div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
					<h2 className="text-3xl font-mono sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
						Pricing for Every Need
					</h2>
					<p className="text-lg text-slate-600 dark:text-slate-400">
						Choose the plan that's right for you. No hidden fees.
					</p>
				</div>

				{/* Toggle Group */}
				<div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 sm:mb-12">
					{data.map((category) => (
						<Button
							key={category.id}
							type="button"
							onClick={() => setActiveCategory(category)}
							className={`
                                px-4 py-2 sm:px-6 sm:py-2.5 rounded-md text-sm sm:text-base font-medium transition-colors duration-200
                                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900
                                ${
																	activeCategory === category
																		? "bg-sky-600 text-white focus:ring-sky-500"
																		: "bg-neutral-4 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 focus:ring-slate-400"
																}
                            `}
						>
							{category.name}
						</Button>
					))}
				</div>

				{currentPlans.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
						{currentPlans.map((plan) => (
							<div
								key={plan.name} // Assuming plan names are unique within a category
								className={`
                                    relative rounded-sm p-6 sm:p-8 flex flex-col
                                    ${
																			plan.isFeatured
																				? "bg-sky-500 dark:bg-sky-600 text-white transform lg:scale-105 ring-4 ring-sky-300 dark:ring-sky-700"
																				: "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200" // Updated dark:bg-slate-800
																		}
                                `}
							>
								{plan.isFeatured && (
									<div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 transform z-10">
										<span className="bg-pink-6 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
											Most Popular
										</span>
									</div>
								)}
								<div className="flex-grow flex flex-col">
									{" "}
									{/* Ensure button stays at bottom */}
									<h3
										className={`text-2xl font-bold mb-2 ${plan.isFeatured ? "text-white" : "text-slate-900 dark:text-white"}`}
									>
										{plan.name}
									</h3>
									<p
										className={`text-4xl font-extrabold mb-1 ${plan.isFeatured ? "text-white" : "text-sky-600 dark:text-sky-400"}`}
									>
										{Number(plan.price) > 0 ? (
											<>
												{`GHC ${plan.price}`}{" "}
												<span className="text-sm">/session</span>
											</>
										) : (
											"Custom"
										)}
									</p>
									<p
										className={`mb-6 text-sm ${plan.isFeatured ? "text-sky-100" : "text-slate-500 dark:text-slate-400"}`}
									>
										{plan.description}
									</p>
									<ul className="space-y-3 mb-8 text-sm flex-grow">
										{plan.features.map((feature, index) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<li key={index} className="flex items-start">
												<div
													className={`i-lucide-check w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${plan.isFeatured ? "text-sky-100" : "text-sky-500"}`}
												/>
												<span>{feature}</span>
											</li>
										))}
									</ul>
									<div className="mt-auto">
										{" "}
										{/* Wrapper to push button to bottom */}
										<a href={`/book?plan=${plan.slug}`} className="block">
											<Button
												className={`
														w-full text-center font-semibold py-3 px-6 rounded-md transition-colors duration-200
														${
															plan.isFeatured
																? "bg-sky-6 text-sky-600 hover:bg-sky-50 dark:bg-slate-900 dark:text-sky-300 dark:hover:bg-slate-700"
																: "bg-sky-5 text-white hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700"
														}
														focus:outline-none focus:ring-2 ${plan.isFeatured ? "focus:ring-white dark:focus:ring-sky-300" : "focus:ring-sky-400"} focus:ring-offset-2 dark:focus:ring-offset-slate-900
												`}
											>
												Book {plan.name}
											</Button>
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-slate-500 dark:text-slate-400">
						No pricing plans available for this category yet.
					</p>
				)}
			</div>
		</section>
	);
}
