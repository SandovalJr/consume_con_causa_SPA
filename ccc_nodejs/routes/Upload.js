const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { uploadImg } = require("../controllers/upload");
const router = Router();
router.use(expressFileUpload({ useTempFiles: true }));

router.post("/:tipo/:id", uploadImg);

module.exports = router;