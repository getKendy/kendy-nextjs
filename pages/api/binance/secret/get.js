import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
import axios from 'axios'

const handler = nc()

handler.get(async (req, res,) => {

    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    try {
        const { db } = await connectToDatabase()
        // console.log('trying')
        // const {data} = await axios.get(`${process.env.BACKEND_API}settings/?username=${session.user.email}`)
        const data = await db.collection("binanceKey").findOne({
            username: session.user.email
        })
        if (!data) {
            res.status(200)
        } else {
            // console.log(data)
            // console.log({ data: data })
            res.status(200).send({
                _id: data._id,
                apikey: data.apikey
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export default handler