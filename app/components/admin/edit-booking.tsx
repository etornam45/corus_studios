import { BookingStatusArr, type Booking } from "~/lib/types";
import { Input } from "../input";
import { Button } from "../button";
import { Form } from "@remix-run/react";

export default function EditBooking({ booking }: { booking: Booking }) {
	return (
		<Form method="PUT" className="flex flex-col gap-6">
      <h1 className="font-bold">Edit Booking Details</h1>
			<div>
				<h3 className="font-bold">Booking Info</h3>
				<Input
					name="booking.id"
					placeholder="Booking ID"
					defaultValue={booking.id}
					required
				/>
				<Input
					name="booking.date"
          type="date"
					defaultValue={booking.startDate.toString()}
					placeholder="Shoot Date"
					required
				/>
				<select name="booking.status" id="status" className="p.5 px-1 w-full">
					{BookingStatusArr.map((bs) => (
						<option key={bs} id="status" value={bs}>
							{bs}
						</option>
					))}
				</select>
			</div>

			<div>
				<h3 className="font-bold">Customer Info</h3>
				<Input name="user.phone" defaultValue={booking.user.phone!} required />
				<Input
					name="booking.date"
					defaultValue={booking.user.name!}
					placeholder="Customer Name"
					required
				/>
				<Input
					name="user.email"
					defaultValue={booking.user.email!}
					placeholder="Customer Email"
					required
				/>
			</div>

			<Button className="w-full" type="submit">
				Submit
			</Button>
		</Form>
	);
}
