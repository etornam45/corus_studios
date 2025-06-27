import type { ColumnDef } from "@tanstack/react-table";
import {
	BookingStatusArr,
	type Booking,
	type BookingStatus,
	type Category,
	type Plan,
	type User,
} from "~/lib/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import EditBooking from "../admin/edit-booking";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const booking_columns: ColumnDef<Booking>[] = [
	{
		accessorKey: "id",
		header: "Booking ID",
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			const [status, setStatus] = useState(row.getValue("status") as BookingStatus);
			const navigate = useNavigate()
      return (
				<select
					className={clsx(
						"inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold",
						{
							"bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300":
								status === "Confirmed",
							"bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300":
								status === "Pending",
							"bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300":
								status === "Cancelled",
							"bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300":
								status === "Done",
							"bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300":
								status === "Rescheduled",
						},
					)}
					defaultValue={status}
					onChange={async (e) => {
						try {
							const res = await fetch("/admin/bookings", {
								method: "PATCH",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									id: row.original.id,
									status: e.target.value,
								}),
							});
							const data = await res.json();
							console.log(data);
							setStatus(e.target.value as BookingStatus);
						} catch (error) {
							setStatus(e.target.value as BookingStatus);
							console.error(error);
						}
					}}
				>
					{BookingStatusArr.map((bs) => (
						<option key={bs} value={bs}>
							{bs}
						</option>
					))}
				</select>
			);
		},
	},
	{
		accessorKey: "user.name",
		header: "Customer Name",
	},
	{
		accessorKey: "plan",
		header: "Booking Plan",
		cell: ({ row }) => {
			return `${row.original.plan.name} - GHC ${row.original.plan.price}`;
		},
	},
	{
		accessorKey: "user.phone",
		header: "Customer Phone",
		cell: ({ row }) => {
			const phone = useState(() => row.original.user.phone || "")[0];
			return (
				<a href={`tel:${phone}`} className="text-blue-600 hover:underline">
					{phone}
				</a>
			);
		},
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
		cell: ({ row }) => {
			const date = new Date(row.getValue("startDate"));
			return date.toLocaleDateString();
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="i-lucide-ellipsis cursor-pointer size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-eye size-4" /> View
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Dialog>
								<DialogTrigger asChild>
									<div className="flex items-center gap-2 cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8 p-2.5 py-1 rounded-sm">
										<div className="i-lucide-text-cursor-input size-4" /> Edit
									</div>
								</DialogTrigger>
								<DialogContent>
									<EditBooking booking={row.original} />
								</DialogContent>
							</Dialog>
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8 text-red-500">
							<div className="i-lucide-trash-2 size-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export const plan_columns: ColumnDef<Plan>[] = [
	{
		accessorKey: "name",
		header: "Plan Name",
	},
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => {
			const price = row.getValue("price") as number;
			return `GHC ${price}`;
		},
	},
	{
		accessorKey: "category.name",
		header: "Category",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="i-lucide-ellipsis cursor-pointer size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-eye size-4" /> View
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-text-cursor-input size-4" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8 text-red-500">
							<div className="i-lucide-trash-2 size-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export const category_columns: ColumnDef<Category>[] = [
	{
		accessorKey: "name",
		header: "Category Name",
	},
	{
		accessorKey: "description",
		header: "Category Description",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="i-lucide-ellipsis cursor-pointer size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-eye size-4" /> View
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-text-cursor-input size-4" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8 text-red-500">
							<div className="i-lucide-trash-2 size-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export const users_columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Customer Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "phone",
		header: "Phone",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="i-lucide-ellipsis cursor-pointer size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-eye size-4" /> View
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8">
							<div className="i-lucide-text-cursor-input size-4" /> Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="cursor-pointer hover:bg-neutral-2 dark:hover:bg-neutral-8 text-red-500">
							<div className="i-lucide-trash-2 size-4" /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
