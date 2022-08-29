import nc from 'next-connect'
import axios from 'axios'

const handler = nc()

handler.get(async (req, res) => {
    try {
        if (req.query){
            const { data } = await axios.get(`${process.env.BACKEND_API}alert/?size=${req.query.size}&page=${req.query.page}`)
            // console.log(data)
            res.status(200).send(data)
        }
        const { data } = await axios.get(`${process.env.BACKEND_API}alert/`)
        // console.log(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default handler