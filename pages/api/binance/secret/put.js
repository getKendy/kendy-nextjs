import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
// import { ObjectId } from 'mongodb'
import { authOptions } from '../../auth/[...nextauth]'

const handler = nc()

handler.put(async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()

    const { apikey, apisecret } = req.body
    await db.collection("binanceKey").updateOne(
        { username: session.user.email, },
        {
            $set: {
                apikey,
                apisecret,
                modified: new Date()
            }
        }
    )
    console.log('ok')
    res.status(201).send('changed')
})

export default handler