import multer from "multer";
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './storage')
    },
    filename: (req, file, callBack) => {
        const extension = file.originalname.split('.').pop()
        callBack(null, `${Date.now()}.${extension}`)
    }
})

export const upload = multer({ storage })