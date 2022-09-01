import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"

const handler = nc()

handler.get(async (req, res,) => {
    console.log(req.context)
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    console.log(session)
    const { db } = await connectToDatabase()
    // console.log(db)
    const data  = await db.collection("binanceKey").findOne({
        username: session.user.email
    })
    console.log({data:data})
    if (!data) {
        res.status(500).send({message:'noApiFound'})
    }
    res.status(201).send({
        username: data.username,
        apiKey: data.apiKey
    })
    // res.send('ok')
    res.status(201).send({
        data
    })

})

export default handler