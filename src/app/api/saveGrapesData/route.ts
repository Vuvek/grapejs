import { connectToDatabase } from "@/utils/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const editorData = await req.json();
    console.log("dataBaseData", req.headers.get("content-length"));
    const { db } = await connectToDatabase();
    const filter = { id: editorData.id };
    const updateData = { $set: editorData };
    const result = await db
      .collection("grapesjs_data")
      .updateOne(filter, updateData, { upsert: true });

    return NextResponse.json(
      { message: "Data saved successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to save data", error },
      { status: 500 }
    );
  }
}
