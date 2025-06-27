import { useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import {
	type ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
	redirect,
} from "react-router-dom";
import { booking_columns } from "~/components/bookings/columns";
import { DataTable } from "~/components/bookings/data-table";
import { Button } from "~/components/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/dialog";
import { Input } from "~/components/input";
import { checkAdmin } from "~/lib/check-admin";
import { prisma } from "~/lib/prisma.server";

export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		const bookings = await prisma.booking.findMany({
			include: {
				user: true,
				plan: true,
			},
		});
		return json(bookings);
	} catch (error) {
		return redirect("/admin/auth");
	}
}

export async function action({ request }: ActionFunctionArgs) {
	if (request.method === "PUT") {
		console.log("PUT")
		const formData = await request.formData();

		console.log(formData.get("user.name"));
	}
	if (request.method === "PATCH") {
		const body = await request.json();
		const status = body.status;
		const id = body.id;

		await prisma.booking.update({
			where: { id },
			data: { status },
		});
		return json({ message: "Status updated successfully" })
	}
}

function Bookings() {
	const bookings = useLoaderData<typeof loader>();

	return (
		<main>
			<div className="container mx-auto p-4 !pr-0">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h1 className="text-2xl font-bold mb-4">Bookings</h1>
						<p className="mb-4">Manage your bookings here.</p>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="mb-4">Create New Booking</Button>
						</DialogTrigger>
						<DialogContent>
							<form method="post" className="flex flex-col gap-4">
								<h2 className="text-lg font-semibold mb-2">
									Create a New Booking
								</h2>
								<Input
									name="customerName"
									placeholder="Customer Name"
									required
								/>
								<Input
									name="email"
									type="email"
									placeholder="Customer Email"
									required
								/>
								<Input
									name="phone"
									type="tel"
									placeholder="Customer Phone"
									required
								/>
								<Input
									name="startDate"
									type="date"
									placeholder="Start Date"
									required
								/>
								<select
									name="status"
									id="status"
									className="mt-4 w-full p-.5 px-2 rounded-sm bg-neutral-2 dark:bg-neutral-8"
									required
								>
									<option value="" disabled selected>
										Select Status
									</option>
									{/* {BookingStatusArr.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))} */}
								</select>
								<Button type="submit" className="mt-4">
									Create Booking
								</Button>
							</form>
						</DialogContent>
					</Dialog>
				</div>
				<DataTable
					searchTag="id"
					searchPlaceholder="Filter by booking code"
					data={bookings}
					columns={booking_columns}
				/>
			</div>
		</main>
	);
}

export default Bookings;
