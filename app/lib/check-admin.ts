import { authCookie } from "./cookies.server";
import { prisma } from "./prisma.server";
import { unauthorized } from "./responses";


export async function checkAdmin(request: Request) {
	const { adminId } =
		(await authCookie.parse(request.headers.get("Cookie"))) || {};

	if (!adminId) throw unauthorized();

	try {
		const admin = await prisma.admin.findUnique({
			where: { id: adminId },
			omit: { password: true },
		});

		if (!admin) throw new Error("Admin not found");
		return admin;
	} catch (err) {
		console.error("Auth ERR", err);
		throw unauthorized();
	}
}