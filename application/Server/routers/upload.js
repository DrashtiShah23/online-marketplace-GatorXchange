const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

// Multer setup
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, '../client/public/images')
    },
    filename: (req, file, cb) => {
        // Get the file extension
        let fileExtension = file.mimetype.split('/')[1];
        // Create a random file name of 16 hex values
        let randomFileName = crypto.randomBytes(16).toString('hex');
        // Combine the random file name and extension into 1 file name
        cb(null, `${randomFileName}.${fileExtension}`);
    },
});

const upload = multer({ storage: storage });

router.use(cors());

router.post('/image', upload.single('file'), async function (req, res) {
    
    const imagePath = req.file.path;
    const imageName = req.file.originalname;
    const imageDestination = '../client/public/images/' + imageName;
    const thumbnailName = `thumbnail-${imageName}`;
    const thumbnailDestination = '../client/public/thumbnails/' + thumbnailName;

    try {
        // Resize the original image to a 500 x 500 pixel image
        const resizedImage = await sharp(imagePath)
            .resize({width: 500, height: 500})
            .toFile(imageDestination);
        resizedImage.name = imageName;
        resizedImage.path = imageDestination;
        console.log('The resized image is:');
        console.log(resizedImage);

        // Create a thumbnail of the original image that is 200 x 200 pixels
        const thumbnail = await sharp(imagePath)
            .resize({width: 200, height: 200})
            .toFile(thumbnailDestination);
        console.log(thumbnail);
        thumbnail.name = thumbnailName;
        thumbnail.path = thumbnailDestination;
        
        console.log('The thumbnail is:');
        console.log(thumbnail);
        res.send('The image is ' + resizedImage + ' and the thumbnail is' + thumbnail);
    }
    catch (err) {
        console.log('Uploading image failed');
        console.log(err);
    }
})
router.get('/upload', async function (req, res) {
    console.log(req.query);
    res.send(req.query);
});



module.exports = router;