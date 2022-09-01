import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

const handler = nc()

handler.get(async (req, res,) => {
    // console.log(req.context)
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    try {
        const { db } = await connectToDatabase()
        // console.log(db)
        const data = await db.collection("binanceKey").findOne({
            username: session.user.email
        })
        if (!data) {
            res.status(200)
        } else {
            console.log({ data: data })
            res.status(200).send({
                username: data.username,
                apiKey: data.apiKey
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export default handler