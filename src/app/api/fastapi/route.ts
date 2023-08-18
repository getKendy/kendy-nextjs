import { NextResponse } from "next/server"


// WIP should return token but not sure if its needed...
export function POST(request: Request) {
  const {searchParams} = new URL(request.url)
  return NextResponse.json({ searchParams })
}

    // try {
    //   const token = await getJwtToken()
    //   console.log(token)
    //   res.status(200).send(token)
    // } catch (error) {
    //   res.status(500).send(error)
    // }



