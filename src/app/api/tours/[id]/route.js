import { connectDB } from "@/lib/mongoose";
import { Reservas, Tours } from "@/models/tours";
import { NextResponse } from "next/server";

export async function GET(request,{params}) {
    try {
        await connectDB();
        const reservations = await Reservas.find()
        console.log("reservations",reservations);
        const tours = await Tours.findById(params.id)
        .populate('tours.transporte', { transporte: 1,img:1, _id: 0 })
        .populate('isla', { isla: 1,img:1, _id: 0 })
        //.populate('reservacion', { isla: 1,img:1, _id: 0 })
        return NextResponse.json({ data:tours });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
    // finally {
    //     await mongoose.connection.close()
    // }
}