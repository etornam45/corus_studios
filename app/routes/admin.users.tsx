import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "react-router-dom";
import { users_columns } from "~/components/bookings/columns";
import { DataTable } from "~/components/bookings/data-table";
import { checkAdmin } from "~/lib/check-admin.server";
import { prisma } from "~/lib/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	try {
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		const users = await prisma.user.findMany({});
		return json({ users });
	} catch (error) {
		return redirect("/admin/auth");
	}
};

export default function Users() {
	const { users } = useLoaderData<typeof loader>();

	return (
		<div className="container mx-auto p-4 !pr-0">
			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-2xl font-bold">Plans</h1>
					<p>Manage your plans here.</p>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<DataTable searchTag="name" searchPlaceholder="Search by name" data={users} columns={users_columns} />
			</div>
		</div>
	);
}
