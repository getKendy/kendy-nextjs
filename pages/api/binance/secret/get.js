import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongodb'
import { unstable_getServerSession } from "next-auth/next"

const handler = nc()

handler.get(async (req, res) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()
    const { data } = db.collection["binanceKey"].findOne({
        username: session.user.email,
    }).toArray()
    if (!data) {
        res.status(500).send('no api key found')
    }
    // res.status(201).send({
    //     username: data.username,
    //     apiKey: data.apiKey
    // })
    res.send('ok')
    // res.status(201).send({
    //     data
    // })

})

export default handler