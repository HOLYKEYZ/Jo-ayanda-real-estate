import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { type Property } from '@/data/properties';
import { getGitHubFileContent, uploadToGitHub } from '@/lib/github';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'properties.json');

async function getProperties(): Promise<Property[]> {
  const githubContent = await getGitHubFileContent('src/data/properties.json');
  if (githubContent) {
    try {
      return JSON.parse(githubContent) as Property[];
    } catch (e) {
      console.error("Failed to parse GitHub properties JSON:", e);
    }
  }

  const fileContent = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(fileContent) as Property[];
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    const updatedData = await request.json();
    
    let properties = await getProperties();
    const index = properties.findIndex(p => p.id === propertyId);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    properties[index] = { ...properties[index], ...updatedData, id: propertyId };
    
    const jsonString = JSON.stringify(properties, null, 2);
    
    const githubSuccess = await uploadToGitHub('src/data/properties.json', jsonString, `auto-commit: update property ID ${propertyId}`, false);
    
    if (process.env.NODE_ENV !== 'production' || !githubSuccess) {
      try {
        await fs.writeFile(dataFilePath, jsonString, 'utf8');
      } catch (err) {
        console.error("Local file save failed:", err);
      }
    }
    
    return NextResponse.json(properties[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    
    let properties = await getProperties();
    const initialLength = properties.length;
    
    properties = properties.filter(p => p.id !== propertyId);
    
    if (properties.length === initialLength) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    const jsonString = JSON.stringify(properties, null, 2);
    
    const githubSuccess = await uploadToGitHub('src/data/properties.json', jsonString, `auto-commit: delete property ID ${propertyId}`, false);
    
    if (process.env.NODE_ENV !== 'production' || !githubSuccess) {
        try {
            await fs.writeFile(dataFilePath, jsonString, 'utf8');
        } catch (err) {
            console.error("Local file save failed:", err);
        }
    }
    
    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
