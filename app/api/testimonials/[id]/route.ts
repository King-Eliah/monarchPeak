import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'testimonials.json');

// PUT update testimonial
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const testimonials = JSON.parse(data);
    
    const index = testimonials.findIndex((t: any) => t.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    testimonials[index] = { ...testimonials[index], ...body };
    fs.writeFileSync(dataFilePath, JSON.stringify(testimonials, null, 2), 'utf-8');
    
    return NextResponse.json(testimonials[index]);
  } catch (error: unknown) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE testimonial
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const testimonials = JSON.parse(data);
    
    const filtered = testimonials.filter((t: any) => t.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}
