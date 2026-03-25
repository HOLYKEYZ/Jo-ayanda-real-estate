import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { type Property } from '@/data/properties';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'properties.json');

async function getProperties(): Promise<Property[]> {
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
    
    await fs.writeFile(dataFilePath, JSON.stringify(properties, null, 2), 'utf8');
    
    return NextResponse.json(propertyWithId, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add property' }, { status: 500 });
  }
}
