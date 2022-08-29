import nc from 'next-connect'
import axios from 'axios'

const handler = nc()

handler.get(async (req, res) => {
    try {
        if (req.query.size) {
            const { data } = await axios.get(`${process.env.BACKEND_API}baro/?size=${req.query.size}`)
            // console.log(data)
            res.status(200).send(data)
        }
        const { data } = await axios.get(`${process.env.BACKEND_API}baro/`)
        // console.log(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default handler