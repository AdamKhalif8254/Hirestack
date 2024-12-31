import { NextResponse } from "next/server";

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  province: string;
  date_posted: string;
  description: string;
  job_url: string;
  site: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword") ?? "jobs";
  const province = searchParams.get("province");
  const city = searchParams.get("city");

  try {
    const queryParams = new URLSearchParams({
      keyword: keyword,
      ...(province && { province }),
      ...(city && { city }),
    });

    const response = await fetch(
      `https://yrzq6ukjo8.execute-api.ca-central-1.amazonaws.com/dev?${queryParams}&province=ON`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as JobListing[];
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
