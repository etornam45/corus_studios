import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { json, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { plan_columns } from "~/components/bookings/columns";
import { DataTable } from "~/components/bookings/data-table";
import { Button } from "~/components/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";
import { Input } from "~/components/input";
import { checkAdmin } from "~/lib/check-admin.server";
import { prisma } from "~/lib/prisma.server";
import type { Category, Plan } from "~/lib/types";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		const plans = await prisma.plan.findMany({
			include: {
				category: {
					select: {
						name: true,
					},
				},
			},
		});
		const categories = await prisma.category.findMany({});
		return json({ plans, categories });
	} catch (error) {
		return redirect("/admin/auth");
	}
};

export async function action({ request }: LoaderFunctionArgs) {
  try {
    const formData = await request.formData();
    const user = await checkAdmin(request);
    if (!user) {
      return redirect("/admin/auth");
    }

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = (formData.get("price") as string);
    const categoryId = formData.get("categoryId") as string;
    const features = formData.getAll("features[]") as string[];

    if (!name || !description || Number.isNaN(price) || !categoryId) {
      return redirect("/admin/plans");
    }

    console.log("Creating plan with data:", {
      name,
      description,
      price,
      categoryId, 
      features,
    });

    await prisma.plan.create({
      data: {
        name,
        description,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        price,
        categoryId,
        features,
      },
    });
    return redirect("/admin/plans");
  } catch (error) {
    console.error("Error creating plan:", error);
    return redirect("/admin/plans");
  }
}

export default function Plans() {
	const { plans, categories } = useLoaderData<typeof loader>() as {
		plans: Plan[];
		categories: Category[];
	};

	const [features, setFeatures] = useState<string[]>([]);

	const AddFeature = (feature: string) => {
		if (feature && !features.includes(feature)) {
			setFeatures([...features, feature]);
		}
	};

	const RemoveFeature = (feature: string) => {
		setFeatures(features.filter((f) => f !== feature));
	};

	return (
		<div className="container mx-auto p-4 !pr-0">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-2xl font-bold">Plans</h1>
					<p>Manage your plans here.</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="mb-4">Create New Plan</Button>
					</DialogTrigger>
					<DialogContent>
						<form method="post" className="flex flex-col gap-4">
							<h2 className="text-lg font-semibold mb-2">Create a New Plan</h2>
							<Input name="name" placeholder="Plan Name" required />
							<Input
								name="description"
								placeholder="Plan Description"
								required
							/>
							<Input name="price" type="number" placeholder="Price" required />
							<select
								name="categoryId"
								className="mt-4 w-full p-.5 px-2 rounded-sm bg-neutral-2 dark:bg-neutral-8"
								required
							>
								<option value="" disabled selected>
									Select Category
								</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>

							<div className="mt-4">
								<h3 className="text-sm font-semibold mb-2">Features</h3>
								<div className="flex gap-2">
									<Input
										name="feature"
										placeholder="Add a feature"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												const feature = (e.target as HTMLInputElement).value;
												AddFeature(feature);
												(e.target as HTMLInputElement).value = "";
											}
										}}
									/>
									<Button
										type="button"
										onClick={() => {
											const feature = (
												document.querySelector(
													'input[name="feature"]',
												) as HTMLInputElement
											).value;
											AddFeature(feature);
										}}
									>
										Add
									</Button>
								</div>
                <ul className="mt-2 flex flex-col gap-2">
                  {features.map((feature, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <li key={index} className="flex items-center gap-2 p-1 px-2 bg-neutral-5/20 rounded-lg justify-between">
                      <p>{feature}</p>
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        onClick={() => RemoveFeature(feature)}
                        className="text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <div className="i-lucide-x size-4" />
                      </div>
                      {/* Hidden input for form submission */}
                      <input type="hidden" name="features[]" value={feature} />
                    </li>
                  ))}
                </ul>
							</div>

							<Button type="submit" className="mt-4">
								Create Plan
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<div className="flex flex-col gap-4">
				<DataTable searchTag="name" searchPlaceholder="Filter by plan name" data={plans} columns={plan_columns} />
			</div>
		</div>
	);
}
