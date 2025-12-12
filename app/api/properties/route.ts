import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf-8');
  }
}

// GET all properties
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const properties = JSON.parse(data);
    return NextResponse.json(properties);
  } catch (error: unknown) {
    console.error('Error reading properties:', error);
    return NextResponse.json([]);
  }
}

// POST new property
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const properties = JSON.parse(data);
    
    const newProperty = {
      ...body,
      id: Date.now().toString()
    };
    
    properties.push(newProperty);
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2), 'utf-8');
    
    return NextResponse.json(newProperty);
  } catch (error: unknown) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
