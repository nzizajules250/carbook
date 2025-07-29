import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/appwrite/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');
    const userId = searchParams.get('userId');

    const expenses = await databaseService.getExpenses(
      vehicleId || undefined,
      userId || undefined
    );
    
    return NextResponse.json({
      success: true,
      data: expenses.documents
    });
  } catch (error: any) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch expenses' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['vehicleId', 'type', 'amount', 'date', 'description', 'category', 'userId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate expense type
    const validTypes = ['fuel', 'maintenance', 'insurance', 'registration', 'parking', 'tolls', 'other'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid expense type' },
        { status: 400 }
      );
    }

    // Validate amount is positive
    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const expense = await databaseService.createExpense(body);
    
    return NextResponse.json({
      success: true,
      data: expense
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create expense' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { expenseId, ...updateData } = body;

    if (!expenseId) {
      return NextResponse.json(
        { error: 'Expense ID is required' },
        { status: 400 }
      );
    }

    const expense = await databaseService.updateExpense(expenseId, updateData);
    
    return NextResponse.json({
      success: true,
      data: expense
    });
  } catch (error: any) {
    console.error('Error updating expense:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update expense' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const expenseId = searchParams.get('expenseId');

    if (!expenseId) {
      return NextResponse.json(
        { error: 'Expense ID is required' },
        { status: 400 }
      );
    }

    await databaseService.deleteExpense(expenseId);
    
    return NextResponse.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting expense:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete expense' 
      },
      { status: 500 }
    );
  }
}