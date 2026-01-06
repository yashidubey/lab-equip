import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Instrument from "@/src/models/instrument";

export async function GET() {
  await connectDB();

  const instruments = await Instrument.find({
    isActive: true,
  })
    .sort({ order: 1, name: 1 })
    .select("name slug")
    .lean();

  return NextResponse.json(instruments);
}
