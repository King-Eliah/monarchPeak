import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'hero.json');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const slides = JSON.parse(data);
    
    const index = slides.findIndex((s: any) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }
    
    slides[index] = { ...slides[index], ...body };
    fs.writeFileSync(dataFilePath, JSON.stringify(slides, null, 2), 'utf-8');
    
    return NextResponse.json(slides[index]);
  } catch (error: unknown) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ error: 'Failed to update slide' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const slides = JSON.parse(data);
    
    const filtered = slides.filter((s: any) => s.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 });
  }
}
