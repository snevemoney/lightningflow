import { NextRequest, NextResponse } from 'next/server';
import * as lightning from '../../../../../../backend/lightning';

export async function POST(request: NextRequest) {
  try {
    const { amount, memo } = await request.json();
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount. Must be a positive number.' },
        { status: 400 }
      );
    }

    const invoice = await lightning.createInvoice(Number(amount), memo || '');
    
    return NextResponse.json({
      success: true,
      data: {
        paymentRequest: invoice.payment_request,
        rHash: invoice.r_hash.toString('hex'),
        amount: Number(amount),
        memo: memo || ''
      }
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
} 