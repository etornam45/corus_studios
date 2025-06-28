import type { ActionFunctionArgs } from "react-router-dom";
import { writeFile } from "node:fs/promises";
import { checkAdmin } from "~/lib/check-admin.server";

export async function action({ request }: ActionFunctionArgs) {

  const admin = await checkAdmin(request);
  if (!admin) {
    return new Response("Unauthorized", { status: 401 });
  }

	if (request.method === "POST") {
		const formData = await request.formData();
		const file = formData.get("file") as File;
    if (!file) {
      return new Response("No file uploaded", { status: 400 });
    }

    const fileName = file.name;
    const filePath = `public/uploads/${fileName}`;
    await writeFile(filePath, new Uint8Array(await file.arrayBuffer()));

    return new Response(
      JSON.stringify({ message: "File uploaded successfully", filePath, url: `/uploads/${fileName}` }),
      { status: 200 }
    );
	}
}
