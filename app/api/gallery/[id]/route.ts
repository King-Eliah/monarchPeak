import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'gallery.json');

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const images = JSON.parse(data);
    
    const index = images.findIndex((img: any) => img.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }
    
    images[index] = { ...images[index], ...body };
    fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 2), 'utf-8');
    
    return NextResponse.json(images[index]);
  } catch (error: unknown) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json({ error: 'Failed to update image' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const images = JSON.parse(data);
    
    const filtered = images.filter((img: any) => img.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
