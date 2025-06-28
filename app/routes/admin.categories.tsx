import { useLoaderData } from "@remix-run/react";
import { json, type LoaderFunctionArgs, redirect } from "react-router-dom";
import { category_columns } from "~/components/bookings/columns";
import { DataTable } from "~/components/bookings/data-table";
import { Button } from "~/components/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";
import { Input } from "~/components/input";
import { checkAdmin } from "~/lib/check-admin.server";
import { prisma } from "~/lib/prisma.server";

export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		const categories = await prisma.category.findMany({});
		return json(categories);
	} catch (error) {
		return redirect("/admin/auth");
	}
}

export async function action({ request }: LoaderFunctionArgs) {
	try {
		const formData = await request.formData();
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		const name = formData.get("name") as string;
		const description = formData.get("description") as string;

		if (!name || !description) {
			return redirect("/admin/categories");
		}
		await prisma.category.create({
			data: {
				name,
				description,
				slug: name.toLowerCase().replace(/\s+/g, "-"),
			},
		});
		return redirect("/admin/categories");
	} catch (error) {
		console.error("Error creating category:", error);
		return redirect("/admin/categories");
	}
}

export default function Categories() {
	const categories = useLoaderData<typeof loader>();
	return (
		<main className="p-4 !pr-0">
			<div className="flex justify-between">
				<div>
					<h1 className="text-2xl font-bold">Categories</h1>
					<p className="">Manage your categories here.</p>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button className="self-start">New Category</Button>
					</DialogTrigger>
					<DialogContent>
						<form method="post" className="flex flex-col gap-4">
							<h2 className="text-lg font-semibold mb-2">
								Create a New Category
							</h2>
							<Input name="name" placeholder="Category Name" required />
							<Input
								name="description"
								placeholder="Category Description"
								required
							/>
							<Button type="submit" className="mt-4">
								Create Category
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<DataTable searchTag="name" searchPlaceholder="Filter by category name" data={categories} columns={category_columns} />
		</main>
	);
}
