import nc from 'next-connect'
import { Spot } from '@binance/connector'
import { connectToDatabase } from '../../../lib/mongoData'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

// NyP8mPSUsloFX6zDD9fWy18pjhvQehkcNM6skNpj3ZyQ7mvDCzVgLCiw9nIWZhB7
// atnYST1ssQIIUTf3jWtUuK1kUhfdw3pH6XhMWwW9RRp92FdNQwbk9ywulF3lvq9Q
const handler = nc()

handler.get(async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).send('User not authenticated')
    }
    try {
        const { db } = await connectToDatabase()
        const data = await db.collection("binanceKey").findOne({
            username: session.user.email
        })
        if (!data) {
            res.status(200)
        } else {
            const { apikey, apisecret } = data
            const client = new Spot(apikey, apisecret)
            client.userAsset()
                .then(response => res.status(200).send(response.data))
                .catch(error => res.status(500).send(error))
        }
    } catch (error) {
        res.status(500).send(error)
    }

})

export default handler