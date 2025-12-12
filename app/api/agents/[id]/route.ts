import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'agents.json');

// GET single agent
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const agents = JSON.parse(data);
    
    const agent = agents.find((a: any) => a.id === id);
    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    return NextResponse.json(agent);
  } catch (error: unknown) {
    console.error('Error fetching agent:', error);
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 });
  }
}

// PUT update agent
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const agents = JSON.parse(data);
    
    const index = agents.findIndex((a: any) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }
    
    agents[index] = { ...agents[index], ...body };
    fs.writeFileSync(dataFilePath, JSON.stringify(agents, null, 2), 'utf-8');
    
    return NextResponse.json(agents[index]);
  } catch (error: unknown) {
    console.error('Error updating agent:', error);
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 });
  }
}

// DELETE agent
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const agents = JSON.parse(data);
    
    const filtered = agents.filter((a: any) => a.id !== id);
    fs.writeFileSync(dataFilePath, JSON.stringify(filtered, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting agent:', error);
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 500 });
  }
}
