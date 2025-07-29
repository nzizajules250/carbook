import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/appwrite/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');
    const userId = searchParams.get('userId');

    const maintenanceRecords = await databaseService.getMaintenanceRecords(
      vehicleId || undefined,
      userId || undefined
    );
    
    return NextResponse.json({
      success: true,
      data: maintenanceRecords.documents
    });
  } catch (error: any) {
    console.error('Error fetching maintenance records:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch maintenance records' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['vehicleId', 'type', 'description', 'cost', 'date', 'mileage', 'serviceProvider', 'userId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate maintenance type
    const validTypes = ['oil_change', 'tire_rotation', 'brake_service', 'engine_repair', 'other'];
    if (!validTypes.includes(body.type)) {
      return NextResponse.json(
        { error: 'Invalid maintenance type' },
        { status: 400 }
      );
    }

    const maintenanceRecord = await databaseService.createMaintenanceRecord(body);
    
    return NextResponse.json({
      success: true,
      data: maintenanceRecord
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating maintenance record:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create maintenance record' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { recordId, ...updateData } = body;

    if (!recordId) {
      return NextResponse.json(
        { error: 'Record ID is required' },
        { status: 400 }
      );
    }

    const maintenanceRecord = await databaseService.updateMaintenanceRecord(recordId, updateData);
    
    return NextResponse.json({
      success: true,
      data: maintenanceRecord
    });
  } catch (error: any) {
    console.error('Error updating maintenance record:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update maintenance record' 
      },
      { status: 500 }
    );
  }
}