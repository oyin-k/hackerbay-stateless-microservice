const jsonPatch = require('fast-json-patch');
const { body, validationResult } = require('express-validator/check');

exports.patch_given_object = [
    body('objectToPatch')
        // .isJSON().withMessage('Should be valid JSON')
        .isLength({min: 1}).withMessage('Should have at least one object'),

    body('patch')
        // .isJSON().withMessage('Patch should be valid JSON')
        .isLength({min: 1}).withMessage('Should have at least one object'),

    // carry out patch request after validation process
    (req, res, next) => {
        const error = validationResult(req);
        
        // check for available errors
        if (!error.isEmpty()) {
            res.status(400).json({errors: errors.array()});
        } else {

            const objectToPatch = JSON.parse(req.body.objectToPatch);
            const patch = JSON.parse(req.body.patch);

            //carry out object patch operation
            const patchedObject = jsonPatch.applyPatch(objectToPatch, patch).newDocument;
            res.status(200).json({patchedObject});
            // next();
        }
        
    }
]