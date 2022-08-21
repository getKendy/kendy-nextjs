import nc from 'next-connect'
import axios from 'axios'

const handler = nc()

handler.get(async (req, res) => {
    if (req.query.symbol) {
        try {
            const { data } = await axios.get(`${process.env.BACKEND_API}ticker/${req.query.symbol}`)
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    }
    try {
        const { data } = await axios.get(`${process.env.BACKEND_API}ticker/`)
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

export default handler