import { NextRequest, NextResponse } from 'next/server';
import * as lightning from '../../../../../backend/lightning';

export async function POST(request: NextRequest) {
  try {
    const { paymentRequest } = await request.json();
    
    if (!paymentRequest || typeof paymentRequest !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Invalid payment request. Must be a valid Lightning invoice.' },
        { status: 400 }
      );
    }

    const paymentResult = await lightning.payInvoice(paymentRequest);
    
    if (paymentResult.payment_error) {
      return NextResponse.json(
        { success: false, error: paymentResult.payment_error },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: {
        paymentHash: paymentResult.payment_hash,
        route: paymentResult.payment_route,
        amountPaid: paymentResult.payment_route?.total_amt_msat / 1000 || 0
      }
    });
  } catch (error) {
    console.error('Error paying invoice:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to pay invoice' },
      { status: 500 }
    );
  }
} 