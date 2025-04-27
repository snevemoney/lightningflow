import { NextResponse } from 'next/server';
import { lightningService } from '@/lib/lightning';

export async function POST(request: Request) {
  try {
    const { amount, description, expiry } = await request.json();
    
    // Basic validation
    if (!amount || !description) {
      return NextResponse.json(
        { error: 'Amount and description are required' },
        { status: 400 }
      );
    }
    
    // Create Lightning invoice
    const invoice = await lightningService.createInvoice({
      name: description.substring(0, 30), // Use first 30 chars as name
      amount: Number(amount),
      description,
      expiry: expiry || 3600 // Default to 1 hour
    });
    
    return NextResponse.json({
      success: true,
      invoice
    });
  } catch (error) {
    console.error('Error creating Lightning invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create Lightning invoice' },
      { status: 500 }
    );
  }
} 