import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'properties.json');

// PUT update property
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const properties = JSON.parse(data);
    
    const index = properties.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    properties[index] = { ...properties[index], ...body };
    fs.writeFileSync(dataFilePath, JSON.stringify(properties, null, 2), 'utf-8');
    
    return NextResponse.json(properties[index]);
  } catch (error: unknown) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// DELETE property
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const properties = JSON.parse(data);
    
    const filtered = properties.filter((p: any) => p.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
