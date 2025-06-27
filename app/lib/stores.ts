import { atom } from "jotai";
import type { Booking, BookingStatus } from "./types";

export const A_bookings = atom<Booking | null>(null)