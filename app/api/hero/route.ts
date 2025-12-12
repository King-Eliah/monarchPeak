import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'hero.json');

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
    const slides = JSON.parse(data);
    return NextResponse.json(slides);
  } catch (error: unknown) {
    console.error('Error reading hero slides:', error);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const slides = JSON.parse(data);
    
    const newSlide = {
      ...body,
      id: Date.now().toString()
    };
    
    slides.push(newSlide);
    fs.writeFileSync(dataFilePath, JSON.stringify(slides, null, 2), 'utf-8');
    
    return NextResponse.json(newSlide);
  } catch (error: unknown) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 });
  }
}
