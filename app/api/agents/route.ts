import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'agents.json');

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

// GET all agents
export async function GET() {
  try {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const agents = JSON.parse(data);
    return NextResponse.json(agents);
  } catch (error: unknown) {
    console.error('Error reading agents:', error);
    return NextResponse.json([]);
  }
}

// POST new agent
export async function POST(request: Request) {
  try {
    ensureDataDir();
    const body = await request.json();
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const agents = JSON.parse(data);
    
    const newAgent = {
      ...body,
      id: Date.now().toString()
    };
    
    agents.push(newAgent);
    fs.writeFileSync(dataFilePath, JSON.stringify(agents, null, 2), 'utf-8');
    
    return NextResponse.json(newAgent);
  } catch (error: unknown) {
    console.error('Error creating agent:', error);
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 500 });
  }
}
