import { type LoaderFunctionArgs, Outlet } from "react-router-dom";
import { Button } from "~/components/button";

export default function Admin() {
	return (
		<>
			<div className="container !py-0 flex divide-x dark:divide-neutral-6">
				<aside className="w-[200px] flex flex-col gap-6 sticky top-0 p-2">
					<ul className="flex flex-col gap-2">
						<Button>
							<a href="/admin">Overview</a>
						</Button>
						<Button>
							<a href="/admin/bookings">Bookings</a>
						</Button>
						<Button>
							<a href="/admin/plans">Plans</a>
						</Button>
						<Button>
							<a href="/admin/categories">Categories</a>
						</Button>
						<Button>
							<a href="/admin/users">Users</a>
						</Button>
					</ul>

					<Button disabled className="!bg-green-6 !border-green-8">
						Hello, Etornam
					</Button>
				</aside>
				<div className="min-h-screen w-full">
					<Outlet />
				</div>
			</div>
			<footer className="flex items-center justify-center p-1 bg-red-5 text-white">
				<p>CORUS STUDIO ADMIN DASHBOARD</p>
			</footer>
		</>
	);
}
