/*******************************************************************
 * Purpose: Test uploader for images. Can be migrated to creating
 * a post page
 * Input: Image to upload
 * Output: Stores the image into the public/images/uploads folder 
 * and a thumbnail version into public/images/thumbnails folder
 * Error Messages: None
 * Authors: Javier Marquez and Thomas Nguyen
 *******************************************************************/
const express = require('express');
const router = express.Router();
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const crypto = require('crypto');

// Multer setup
const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, '../client/public/images/uploads/')
    },
    filename: (req, file, cb) => {
        //Get the file extension
        let fileExtension = file.mimetype.split('/')[1];
        
        //Create a random file name of 16 hex values
        let randomFileName = crypto.randomBytes(16).toString('hex');
        
        //Combine the random file name and extension into 1 file name
        const fileName = `${randomFileName}.${fileExtension}`;
        
        // Upload the file to the destination specified
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.use(cors());

router.post('/image', upload.single('file'), async function (req, res) {
    
    const imagePath = req.file.path;
    const imageName = req.file.filename;
    //const imageDestination = `${req.file.destination}/${imageName}`;
    const thumbnailName = `thumbnail-${imageName}`;
    const thumbnailDestination = '../client/public/images/thumbnails/' + thumbnailName;

    try {
        // Use this code block for the individual post page to resize image if necessary
        // Resize the original image to a 800 x 800 pixel image
        // const resizedImage = await sharp(imagePath)
        //     .resize({width: 800, height: 800})
        //     .toFile(imageDestination);
        // resizedImage.name = imageName;
        // resizedImage.path = imageDestination;
        
        // console.log('The resized image is:');
        // console.log(resizedImage);

        // Create a thumbnail of the original image that is 200 x 200 pixels
        const thumbnail = await sharp(imagePath)
            .resize({width: 200, height: 200})
            .toFile(thumbnailDestination);

        thumbnail.name = thumbnailName;
        thumbnail.path = thumbnailDestination;
        
        console.log('The thumbnail is:');
        console.log(thumbnail);
        console.log('Image upload successful!');
        res.send('Image upload successful!');
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