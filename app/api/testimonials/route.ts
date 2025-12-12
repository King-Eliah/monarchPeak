import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'testimonials.json');

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

// GET all testimonials
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const testimonials = JSON.parse(data);
    return NextResponse.json(testimonials);
  } catch (error: unknown) {
    console.error('Error reading testimonials:', error);
    return NextResponse.json([]);
  }
}

// POST new testimonial
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const testimonials = JSON.parse(data);
    
    const newTestimonial = {
      ...body,
      id: Date.now().toString()
    };
    
    testimonials.push(newTestimonial);
    fs.writeFileSync(dataFilePath, JSON.stringify(testimonials, null, 2), 'utf-8');
    
    return NextResponse.json(newTestimonial);
  } catch (error: unknown) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
