import express from "express"

const router = express.Router()

router.get('/', (req, res) => {
    res.json([
        {id: 1, title: 'practice sport'},
        {id: 2, title: 'fight a lion'},
    ])
})

export default router