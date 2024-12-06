import { connectToDatabase } from "@/utils/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const id = req.nextUrl.searchParams.get("id");
    const data = await db.collection("grapesjs_data").findOne({ id });

    if (data) {
      return NextResponse.json(
        { message: "Data retrieved successfully", data },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load Data", error },
      { status: 500 }
    );
  }
}
