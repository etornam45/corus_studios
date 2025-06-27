import {
	json,
	type LoaderFunctionArgs,
	Outlet,
	redirect,
} from "react-router-dom";
import { prisma } from "~/lib/prisma.server";

const generateBookingId = (): string => {
	const timestamp = Date.now().toString(36).substring(2, 7);
	const randomPart = Math.random().toString(36).substring(2, 7);
	return `CORUS-${timestamp}-${randomPart}`.toUpperCase();
};

export async function action({ request }: LoaderFunctionArgs) {
	try {
		const formData = await request.formData();

		const plan_slug = formData.get("plan") as string;
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const phone = formData.get("phone") as string;
		const date = formData.get("date") as string;
		const time = formData.get("time") as string;
		const message = formData.get("message") as string;
		const bookingId = generateBookingId();

		if (!plan_slug || !name || !email || !date || !time) {
			return json(
				{ error: "All required fields must be filled." },
				{ status: 400 },
			);
		}

		const plan = await prisma.plan.findFirst({
			where: { slug: plan_slug },
			select: { id: true },
		});

		if (!plan) {
			return json({ error: "Selected plan does not exist." }, { status: 404 });
		}

    const user = await prisma.user.findFirst({
      where: { email },
    });

    const booking = await prisma.booking.create({
      data: {
        id: bookingId,
        status: "Pending",
        startDate: new Date(`${date}T${time}`),
        message,
        user: user
          ? { connect: { id: user.id } }
          : {
              create: {
                name,
                email,
                phone: phone || null,
              },
            },
        plan: { connect: { id: plan.id } },
      },
    });
		return redirect(
			`/book/${booking.id}?success=true&plan=${plan_slug}&userId=${booking.userId}`,
		);
	} catch (error) {
		console.error("Error in booking action:", error);
		return json({ error: "Failed to create booking." }, { status: 500 });
	}
}

export default function Book() {
	return <Outlet />;
}
