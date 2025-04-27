import { NextResponse } from 'next/server';
import { lightningService } from '@/lib/lightning';

export async function GET(
  request: Request,
  { params }: { params: { hash: string } }
) {
  try {
    const paymentHash = params.hash;
    
    if (!paymentHash) {
      return NextResponse.json(
        { error: 'Payment hash is required' },
        { status: 400 }
      );
    }
    
    // Check payment status
    const status = await lightningService.checkPaymentStatus(paymentHash);
    
    return NextResponse.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
} 