import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "@/lib/db";
import Instrument from "@/src/models/instrument";

// 🔐 Admin Authentication Check
async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}

// =====================
// GET SINGLE INSTRUMENT
// =====================
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;

  try {
    const instrument = await Instrument.findById(id).lean();

    if (!instrument) {
      return NextResponse.json(
        { error: "Instrument not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(instrument);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch instrument" },
      { status: 500 }
    );
  }
}

// =====================
// UPDATE INSTRUMENT
// =====================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;
  const body = await req.json();

  try {
    const updated = await Instrument.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Instrument not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Failed to update instrument" },
      { status: 500 }
    );
  }
}

// =====================
// DELETE INSTRUMENT
// =====================
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const { id } = await params;

  try {
    const deleted = await Instrument.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Instrument not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete instrument" },
      { status: 500 }
    );
  }
}
