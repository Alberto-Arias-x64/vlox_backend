import express from "express"
import validate from "../middleware/validate_post.js"
import * as post from "../controllers/post.js"
import * as analytics from "../controllers/analytics.js"
import { upload } from "../middleware/multer.js"

const router = express.Router()

router.get('/post', post.get_posts)
router.get('/post_list', post.get_posts_list)
router.get('/post/:id', post.get_post)
router.post('/post', validate, post.post_posts)
router.put('/post', validate, post.update_post)
router.delete('/post', post.delete_post)

router.get('/analytics', analytics.get_analytics)
router.post('/analytics/add', analytics.add_like)

router.post('/admin', (req, res) => {
    const { user, password } = req.body
    if (user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) return res.json({ token: true })
    return res.status(401).json({ token: false })
})

router.post('/image', upload.single('storage'), (req, res) => res.json({ file: req.file.filename }))

//router.get('/', (req, res) => req.params)

export default router