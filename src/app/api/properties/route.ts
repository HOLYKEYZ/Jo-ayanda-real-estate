import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { type Property } from '@/data/properties';

import { getGitHubFileContent, uploadToGitHub } from '@/lib/github';

export const dynamic = 'force-dynamic';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'properties.json');

async function getProperties(): Promise<Property[]> {
  // Try fetching newest content from GitHub first to bypass vercel local file caching
  const githubContent = await getGitHubFileContent('src/data/properties.json');
  if (githubContent) {
    try {
      return JSON.parse(githubContent) as Property[];
    } catch (e) {
      console.error("Failed to parse GitHub properties JSON:", e);
    }
  }

  // Fallback to local fs build cache
  const fileContent = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContent) as Property[];
}

export async function GET() {
  try {
    const properties = await getProperties();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProperty = await request.json();
    const properties = await getProperties();
    
    // Assign a new ID (highest id + 1)
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    const propertyWithId = { ...newProperty, id: newId };
    
    properties.push(propertyWithId);
    
    const jsonString = JSON.stringify(properties, null, 2);
    
    // Update GitHub repo directly
    const githubSuccess = await uploadToGitHub('src/data/properties.json', jsonString, 'auto-commit: add new property from admin dashboard', false);
    
    // Fallback to local fs
    if (process.env.NODE_ENV !== 'production' || !githubSuccess) {
      try {
        await fs.writeFile(dataFilePath, jsonString, 'utf8');
      } catch (err) {
        console.error("Local file write failed:", err);
      }
    }
    
    return NextResponse.json(propertyWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add property' }, { status: 500 });
  }
}
