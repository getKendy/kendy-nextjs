import nc from 'next-connect'
import axios from 'axios'

const handler = nc()

handler.get(async (req, res) => {
    try {
        const { data } = await axios.get('http://10.20.12.229:5555/api/workers')
        console.log(data)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default handler