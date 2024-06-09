const multer = require('multer')

module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix  = Date.now()
      const filename = `${uniqueSuffix}-${file.originalname}`
      cb(null, filename)
    }
  })

  return storage
}