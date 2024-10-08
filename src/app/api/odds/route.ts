import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const gameId = searchParams.get('gameId')

  if (!gameId) {
    return NextResponse.json({ error: 'Game ID is required' }, { status: 400 })
  }

  const filePath = path.join(process.cwd(), 'src', 'data', `${gameId}.json`)

  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    const oddsData = JSON.parse(fileContents)

    return NextResponse.json(oddsData)

  }
  catch (error) {
    console.error('Error reading odds data:', error)

    return NextResponse.json({ error: 'Failed to load odds data' }, { status: 500 })
  }
}
