// app/api/wiki/[event]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { event: string } }
) {
  try {
    const event = params.event;
    if (!event) {
      return NextResponse.json({ error: "Event parameter is required" }, { status: 400 });
    }

    const formattedEvent = event.replace(/_/g, " ");
    
    // Modified to get full content instead of just intro
    const wikiResponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&titles=${encodeURIComponent(formattedEvent)}&format=json&origin=*`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Historical Events Viewer/1.0'
        }
      }
    );

    if (!wikiResponse.ok) {
      throw new Error(`Wikipedia API responded with status: ${wikiResponse.status}`);
    }

    const wikiData = await wikiResponse.json();
    return NextResponse.json(wikiData);
    
  } catch (error) {
    console.error("Wiki API Error:", error);
    return NextResponse.json({ error: "Failed to fetch Wikipedia data" }, { status: 500 });
  }
}
