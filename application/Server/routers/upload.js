const express = require('express')
const router = express.Router()
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, 'routers/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.use(cors())

router.post('/image', upload.single('file'), async function (req, res) {
    res.json({})
})
router.get('/upload', async function (req, res) {
    console.log(req.body)
    res.send(req.body)
})
module.exports = router