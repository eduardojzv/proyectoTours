
import mongoose, { connectDB } from "@/lib/mongoose";
import { Tours } from "@/models/tours";

const { NextResponse } = require("next/server");

export async function GET(request) {
    try {
        await connectDB();
        const tours = await Tours.find()
        .populate('tours.transporte', { transporte: 1,img:1, _id: 0 })
        .populate('isla', { isla: 1,img:1, _id: 0 })
        console.log("tt",tours);
        return NextResponse.json({ data:tours });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
    // finally {
    //     await mongoose.connection.close()
    // }
}
//
export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json()
        const newTour = await Tours.create(data)

        return NextResponse.json({ newTour });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
    // finally {
    //     await mongoose.connection.close()
    // }
}