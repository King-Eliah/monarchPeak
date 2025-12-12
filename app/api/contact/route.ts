import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'contacts.json');

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

// GET all contacts
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    return NextResponse.json(contacts);
  } catch (error: unknown) {
    console.error('Error reading contacts:', error);
    return NextResponse.json([]);
  }
}

// POST new contact
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    
    const newContact = {
      ...body,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'new'
    };
    
    contacts.push(newContact);
    fs.writeFileSync(dataFilePath, JSON.stringify(contacts, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, data: newContact });
  } catch (error: unknown) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit form' }, { status: 500 });
  }
}
