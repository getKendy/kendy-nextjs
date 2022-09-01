import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"

const handler = nc()

handler.post(async (req, res) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()
    const { apiKey, apiSecret } = req.body
    const response = db.collection("binanceKey").insertOne({
        username: session.user.email,
        apiKey,
        apiSecret,
        createdAt: new Date(),
        modified: new Date()
    })
    res.status(201).json({
        data: await db.collection("binanceKey").findOne({ id: response.insertedId }),
        message: 'Key added succesfully'
    })
})

export default handler