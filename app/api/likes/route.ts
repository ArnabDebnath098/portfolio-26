import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("portfolio_likes")
    .select("count")
    .eq("id", 1)
    .single();

  if (error) return NextResponse.json({ count: 0 }, { status: 200 });
  return NextResponse.json({ count: data.count });
}

export async function POST() {
  const { data, error } = await supabase.rpc("increment_likes");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ count: data });
}

export async function DELETE() {
  const { data, error } = await supabase.rpc("decrement_likes");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ count: data });
}
