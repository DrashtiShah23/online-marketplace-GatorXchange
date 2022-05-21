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
const database = require('../config/database.js');

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images/uploads/') // Image path
        
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

// router.post('/image', upload.single('file'), async function (req, res) {
router.post('/post', upload.single('image'), function (req, res) {    
    
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
    const imagePath = req.file.path;
    const imageName = req.file.filename;
    //const imageDestination = `${req.file.destination}/${imageName}`;
    const thumbnailName = `thumbnail-${imageName}`;
    const thumbnailDestination = '../client/public/images/thumbnails/' + thumbnailName;
    
    const thumbnail = sharp(imagePath)
        .resize({width: 200, height: 200})
        .toFile(thumbnailDestination);

    thumbnail.name = thumbnailName;
    thumbnail.path = thumbnailDestination;
    
    // Construct the specific image/thumbnail paths to store in the database
    // so that the images will load correctly in the frontend
    let photoPath = 'images/uploads/' + imageName;
    let thumbnailPath = 'images/thumbnails/' + thumbnailName;
    
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    
    const pickupLocation = req.body.pickupLocation;

    const fk_user_id = req.session.user_id;
    
    const category = req.body.category;
    let fk_category_id;

    // Set post category id to corresponding category
    if (category === 'Books') {
        fk_category_id = 1;
    }
    else if (category === 'Electronics') {
        fk_category_id = 2;
    }
    else if (category === 'Clothes') {
        fk_category_id = 3;
    }

    console.log('Title: ' + title);
    console.log('Price: ' + price);
    console.log('Description: ' + description);
    console.log('Category: ' + category);
    console.log('Pick up location: ' + pickupLocation);
    console.log('User ID: ' + fk_user_id);
    console.log('Photo path: ' + photoPath);
    console.log('Thumbnail path: ' + thumbnailPath);
    
    // Prepare the SQL query
    let addPost = 
        `INSERT INTO posts \
        (title, price, description, pickup_location, photo_path, thumbnail, created, fk_user_id, fk_category_id) \
        VALUES (?, ?, ?, ?, ?, ?, now(), ?, ?)`;
    
    // Insert pending post for admin approval
    database.execute(addPost, [title, price, description, pickupLocation, photoPath, thumbnailPath, fk_user_id, fk_category_id])
        .then(([results]) => {
        // Post sent successfully
        if (results && results.affectedRows) {
            console.log('Sent pending post for admin to review!');
            return res.status(200).send('Added pending post for admin to review!');
        }
        }) // 
        .catch((err) => {
            console.log('Error adding post to database: ');
            console.log(err);
            return res.status(404).send('Error adding post to database');
        });

        console.log('Image upload successful!');
        
});


module.exports = router;