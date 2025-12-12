import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'gallery.json');

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), 'utf-8');
  }
}

export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const images = JSON.parse(data);
    return NextResponse.json(images);
  } catch (error: unknown) {
    console.error('Error reading gallery:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const images = JSON.parse(data);
    
    const newImage = {
      ...body,
      id: Date.now().toString()
    };
    
    images.push(newImage);
    fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 2), 'utf-8');
    
    return NextResponse.json(newImage);
  } catch (error: unknown) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 });
  }
}
