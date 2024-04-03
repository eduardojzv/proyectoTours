import { connectDB } from "@/lib/mongoose";
import { Tours } from "@/models/tours";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {
        await connectDB();
        const tours = await Tours.findById(params.id)
        .populate('tours.transporte', { transporte: 1,img:1, _id: 0 })
        .populate('isla', { isla: 1,img:1, _id: 0 })
        return NextResponse.json({ data:tours });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
    // finally {
    //     await mongoose.connection.close()
    // }
}