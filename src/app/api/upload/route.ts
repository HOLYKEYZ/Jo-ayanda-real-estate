import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = path.extname(file.name);
    const fileName = `${uuidv4()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images");
    const filePath = path.join(uploadDir, fileName);

    // Save to public/images
    await writeFile(filePath, buffer);

    // Return the path that will be used in the browser
    return NextResponse.json({ path: `/images/${fileName}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
