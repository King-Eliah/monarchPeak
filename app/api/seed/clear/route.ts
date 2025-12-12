import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Delete all existing data and force re-seed
export async function POST() {
  try {
    // Delete all existing JSON files
    const files = ['properties.json', 'agents.json', 'testimonials.json', 'gallery.json', 'hero.json'];
    files.forEach(file => {
      const filePath = path.join(dataDir, file);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    return NextResponse.json({ message: 'All data cleared. Visit /api/seed to re-populate.' });
  } catch (error: unknown) {
    return NextResponse.json({ error: 'Failed to clear data' }, { status: 500 });
  }
}
