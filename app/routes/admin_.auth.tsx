import { createCookie } from "@remix-run/node";
import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { Button } from "~/components/button";
import { Input } from "~/components/input";
import { authCookie } from "~/lib/cookies.server";
import { prisma } from "~/lib/prisma.server";

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email: string = formData.get("email") as string;
	const password = formData.get("password") as string;
	console.log(email)

	const admin = await prisma.admin.findFirst({
		where: {
			email: email,
		},
	});


	if (password !== admin?.password) {
		return {};
	}

	return redirect("/admin", {
		headers: {
			"Set-Cookie": await authCookie.serialize({ adminId: admin.id }),
		},
	});
}

export default function AdminAuth() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div>
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Admin Authentication</h1>
					<p className="text-lg text-gray-600">
						Please log in to access the admin dashboard.
					</p>
				</div>
				<form method="POST" className="w-full flex flex-col gap-4 mt-8">
					<Input name="email" placeholder="Email" type="email" />
					<Input name="password" placeholder="Password" type="password" />
					<Button type="submit" className="w-full">Submit</Button>
				</form>
			</div>
		</div>
	);
}
