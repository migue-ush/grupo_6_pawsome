const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/users"));
    },
    filename: (req, file, cb) => {
        let imageName = Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})

const fileFilter = (req, file, cb) => {
    if((file.mimetype).includes("jpg") || (file.mimetype).includes("jpeg") || (file.mimetype).includes("gif") || (file.mimetype).includes("png")){
        cb(null, true)
    } else {
        cb(null, false)
        req.fileError = "ppp"
    }
}

const uploadFile = multer({fileFilter: fileFilter ,storage: multerDiskStorage})

module.exports = uploadFile;