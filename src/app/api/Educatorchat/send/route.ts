import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const jwtToken = request.cookies.get("jwtToken")?.value;
  const userId = request.cookies.get("userId")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (jwtToken) headers["Authorization"] = `Bearer ${jwtToken}`;
  if (userId) headers["x-user-id"] = userId;

  const res = await fetch(
    "https://productionyetzuapi.yetzu.com/api/Educatorchat/send",
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
