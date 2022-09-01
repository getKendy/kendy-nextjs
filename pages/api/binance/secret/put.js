import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { ObjectId } from 'mongodb'

const handler = nc()

handler.put(async (req, res) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()
    const { apiKey, apiSecret, id } = req.body
    await db.collection("binanceKey").updateOne(
        { username: session.user.email, },
        {
            $set: {
                apiKey,
                apiSecret,
                modified: new Date()
            }
        }
    )
    res.status(200).json({
        data: await db.collection("binanceKey").findOne({ username: session.user.email, }),
        message: 'Key changed succesfully'
    })
})

export default handler