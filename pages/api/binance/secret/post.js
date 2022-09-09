import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

const handler = nc()

handler.post(async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()
    const { apikey, apisecret } = req.body
    await db.collection("binanceKey").insertOne({
        username: session.user.email,
        apikey,
        apisecret,
        createdAt: new Date(),
        modified: new Date()
    })
    res.status(201).send('created')
    
})

export default handler