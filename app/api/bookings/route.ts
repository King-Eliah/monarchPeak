import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'bookings.json');

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

// GET all bookings
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const bookings = JSON.parse(data);
    return NextResponse.json(bookings);
  } catch (error: unknown) {
    console.error('Error reading bookings:', error);
    return NextResponse.json([]);
  }
}

// POST new booking
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const bookings = JSON.parse(data);
    
    const newBooking = {
      ...body,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    bookings.push(newBooking);
    fs.writeFileSync(dataFilePath, JSON.stringify(bookings, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data: newBooking });
  } catch (error: unknown) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit booking' }, { status: 500 });
  }
}
