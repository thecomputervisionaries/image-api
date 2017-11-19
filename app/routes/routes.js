/* @tTODO:
	Enable multi-part form data encoding to be received at RESTful URL endpoints.
*/

// set up routing
// ---------------------------------------------------------------------------
var express    = require('express');
// init  router
var router = express.Router();
// define image model
var Image = require('../models/image');

// middleware for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('routes firing up.');
	next();
});

// test route to make sure server started (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'welcome to image processing api' });	
});

// on routes that end in /images
// ----------------------------------------------------
router.route('/images')

	// create a image (accessed at POST http://localhost:8080/images)
	.post(function(req, res) {
		
		var image = new Image(); // create a new instance of the Image model
		image.name = req.body.name; // set the images name (comes from the request)

		image.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Image created' });
		});

		
	})

	// get all the images (accessed at GET http://localhost:8080/api/images)
	.get(function(req, res) {
		Image.find(function(err, images) {
			if (err)
				res.send(err);

			res.json(images);
		});
	});

// on routes that end in /images/:img_id
// ----------------------------------------------------
router.route('/images/:img_id')

	// get the image with that id
	.get(function(req, res) {
		Image.findById(req.params.img_id, function(err, image) {
			if (err)
				res.send(err);
			res.json(image);
		});
	})

	// update the image with this id
	.put(function(req, res) {
		Image.findById(req.params.img_id, function(err, image) {

			if (err)
				res.send(err);

			image.name = req.body.name;
			image.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Image updated!' });
			});

		});
	})

	// delete the image with this id
	.delete(function(req, res) {
		Image.remove({
			_id: req.params.img_id
		}, function(err, image) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted image' });
		});
	});

module.exports = router
