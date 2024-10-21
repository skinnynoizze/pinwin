import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'


export async function GET(request: Request) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'teamsCharts.json')
    const fileContents = await fs.readFile(filePath, 'utf8')
    const statisticsData = JSON.parse(fileContents)

    return NextResponse.json(statisticsData)
  }
  catch (error) {
    console.error('Error reading statistics data:', error)

    return NextResponse.json({ error: 'Failed to load statistics data' }, { status: 500 })
  }
}
