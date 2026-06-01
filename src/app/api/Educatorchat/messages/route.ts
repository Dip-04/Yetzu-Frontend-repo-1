import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const studentId = request.nextUrl.searchParams.get("studentId");
  const jwtToken = request.cookies.get("jwtToken")?.value;
  const userId = request.cookies.get("userId")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (jwtToken) headers["Authorization"] = `Bearer ${jwtToken}`;
  if (userId) headers["x-user-id"] = userId;

  const params = studentId ? `?studentId=${encodeURIComponent(studentId)}` : "";
  const res = await fetch(
    `https://productionyetzuapi.yetzu.com/api/Educatorchat/messages${params}`,
    { headers }
  );
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
