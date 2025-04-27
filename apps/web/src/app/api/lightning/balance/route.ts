import { NextResponse } from 'next/server';
import * as lightning from '../../../../../backend/lightning';

export async function GET() {
  try {
    const balance = await lightning.getBalance();
    
    return NextResponse.json({
      success: true,
      data: {
        totalBalance: Number(balance.total_balance),
        confirmedBalance: Number(balance.confirmed_balance),
        unconfirmedBalance: Number(balance.unconfirmed_balance)
      }
    });
  } catch (error) {
    console.error('Error getting wallet balance:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get wallet balance' },
      { status: 500 }
    );
  }
} 