import { useLoaderData, useMatch, useMatches } from "@remix-run/react";
import type { Admin } from "~/lib/types";
import { useEffect } from "react";
import { json, redirect, type LoaderFunctionArgs } from "react-router-dom";
import { checkAdmin } from "~/lib/check-admin.server";

export async function loader({ request }: LoaderFunctionArgs) {
	try {
		const user = await checkAdmin(request);
		if (!user) {
			return redirect("/admin/auth");
		}

		return json(user);
	} catch (error) {
		return redirect("/admin/auth");
	}
}

export default function AdminIndex() {
	const data = useLoaderData<typeof loader>() as Admin;
	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className="text-center min-h-screen flex flex-col items-center justify-center p-4">
			<h1 className="text-2xl font-bold mb-4">
				{data.name}. Welcome to the Corus Studio
			</h1>
			<p className="text-lg text-neutral">
				Please select an option from the menu. 
			</p>
		</div>
	);
}
