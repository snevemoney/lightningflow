import { NextResponse } from 'next/server';
import * as lightning from '../../../../../backend/lightning';

export async function GET() {
  try {
    const info = await lightning.getInfo();
    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    console.error('Error getting lightning node info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get lightning node info' },
      { status: 500 }
    );
  }
} 