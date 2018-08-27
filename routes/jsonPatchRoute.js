const express = require('express');
const jsonPatchController = require('../controller/jsonPatchController');

const router = express.Router();

//patch route
router.patch('/patchedObject', jsonPatchController.patch_given_object);

module.exports = router;