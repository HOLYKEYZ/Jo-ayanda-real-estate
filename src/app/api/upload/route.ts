import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { uploadToGitHub } from "@/lib/github";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name);
    const fileName = `${uuidv4()}${ext}`;
    
    // Upload image to GitHub
    const githubPath = `public/images/${fileName}`;
    const base64Content = buffer.toString('base64');
    const githubSuccess = await uploadToGitHub(githubPath, base64Content, `auto-commit: upload image ${fileName}`, true);

    // Fallback to local / public/images if running locally or GitHub fails
    if (process.env.NODE_ENV !== 'production' || !githubSuccess) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "images");
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
      } catch (err) {
        console.error("Local file write failed:", err);
      }
    }

    // Return the path that will be used in the browser
    return NextResponse.json({ path: `/images/${fileName}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
