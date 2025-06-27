import type { Prisma } from "@prisma/client";

export type Admin = Prisma.AdminGetPayload<true>
export type Booking = Prisma.BookingGetPayload<{
  include: {
    user: true;
    plan: true;
  }
}>

export type Plan = Prisma.PlanGetPayload<{
  include: {
    category: {
      select: {
        name: true,
      },
    }
  }
}>

export type Category = Prisma.CategoryGetPayload<true>
export type Images = Prisma.ImagesGetPayload<true>
export type BookingStatus = "Pending" | "Confirmed" | "Done" | "Cancelled" | "Rescheduled";
export const BookingStatusArr: BookingStatus[] = ["Pending", "Confirmed", "Done", "Cancelled", "Rescheduled"];
export type User = Prisma.UserGetPayload<true>