import { NextResponse } from "next/server"
import axios from "axios"
import {load} from "cheerio"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    // First try to search Wikipedia API for relevant articles
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
    const searchResponse = await axios.get(searchUrl)

    if (searchResponse.data.query.search.length === 0) {
      return NextResponse.json({ error: "No articles found" }, { status: 404 })
    }

    // Get the first search result's page ID
    const pageId = searchResponse.data.query.search[0].pageid

    // Fetch the full article content using the page ID
    const articleUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&format=json&piprop=original&pageids=${pageId}&origin=*`
    const articleResponse = await axios.get(articleUrl)

    const page = articleResponse.data.query.pages[pageId]

    return NextResponse.json({
      title: page.title,
      extract: page.extract ? load(page.extract).text() : "",
      thumbnail: page.original?.source || null,
    })
  } catch (error) {
    console.error("Error fetching from Wikipedia:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

