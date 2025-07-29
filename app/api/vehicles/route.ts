import { NextRequest, NextResponse } from 'next/server';
import { databaseService } from '@/lib/appwrite/database';
import { authService } from '@/lib/appwrite/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const vehicles = await databaseService.getVehicles(userId);
    
    return NextResponse.json({
      success: true,
      data: vehicles.documents
    });
  } catch (error: any) {
    console.error('Error fetching vehicles:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to fetch vehicles' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['make', 'model', 'year', 'licensePlate', 'vin', 'userId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const vehicle = await databaseService.createVehicle(body);
    
    return NextResponse.json({
      success: true,
      data: vehicle
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to create vehicle' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleId, ...updateData } = body;

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    const vehicle = await databaseService.updateVehicle(vehicleId, updateData);
    
    return NextResponse.json({
      success: true,
      data: vehicle
    });
  } catch (error: any) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to update vehicle' 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const vehicleId = searchParams.get('vehicleId');

    if (!vehicleId) {
      return NextResponse.json(
        { error: 'Vehicle ID is required' },
        { status: 400 }
      );
    }

    await databaseService.deleteVehicle(vehicleId);
    
    return NextResponse.json({
      success: true,
      message: 'Vehicle deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting vehicle:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to delete vehicle' 
      },
      { status: 500 }
    );
  }
}