import nc from 'next-connect'
import { connectToDatabase } from '../../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]"
// import axios from 'axios'

const handler = nc()

handler.post(async (req, res) => {
    // console.log(req.body)
    const session = await unstable_getServerSession(req, res, authOptions)
    // console.log(session)
    if (!session) {
        // console.log('nosession')
        res.status(401).send('User not authenticated')
    }
    const { db } = await connectToDatabase()
    const { apikey, apisecret } = req.body
    // console.log(apikey, apisecret)
    const data = db.collection("binanceKey").insertOne({
        username: session.user.email,
        apikey,
        apisecret,
        createdAt: new Date(),
        modified: new Date()
    })
    // try {
    //     const { data } = await axios.post(`${process.env.BACKEND_API}settings`, {
    //         username: session.user.email,
    //         apikey,
    //         apisecret,
    //         createdAt: new Date(),
    //         modified: new Date()
    //     })
    //     console.log(data)
    //     res.status(201).send(data)
    // } catch (error) {
    //     console.log(error)
    //     req.status(500).send(error)
    // }
    res.status(201).send('created')
    // res.status(201).json({
    //     data: await db.collection("binanceKey").findOne({ id: data.insertedId }),
    //     message: 'Key added succesfully'
    // })
})

export default handler