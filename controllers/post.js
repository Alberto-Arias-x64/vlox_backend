import { validationResult } from "express-validator"
import { post } from "../database/setup.js"
import { update } from "./analytics.js"

const get_posts = async (_, res) => {
    const data = await post.findAll()
    res.send(JSON.stringify(data))
}

const get_posts_list = async (_, res) => {
    const data = await post.findAll({ attributes: ['id', 'title', 'likes', 'createdAt'] })
    res.send(JSON.stringify(data))
}

const get_post = async (req, res) => {
    const { id } = req.params
    post.findByPk(id)
        .then(query => {
            if (query) return res.json(query)
            return res.status(400).json({ message: "can't search this post" })
        })
        .catch(() => res.status(400).json({ message: "can't search this post" }))
}

const post_posts = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const body_data = req.body
    update(body_data.title)
    post.create(body_data)
        .then(query => res.json(query))
        .catch(() => res.status(400).json({ message: "can't create a post" }))
}

const update_post = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const body_data = req.body
    post.update({
        title: body_data.title,
        data: body_data.data,
        image: body_data.image
    }, {
        where: {
            id: body_data.id
        }
    })
}

const delete_post = async (req, res) => {
    const id = req.body.id
    post.destroy({ where: { id } })
        .then(() => res.send(JSON.stringify({ destroy: true })))
        .catch(() => res.status(400).json({ destroy: false }))
}

const add_like_in_post = async(req, res) => {
    const id = req.body.id
    const {likes} = await post.findByPk(id)
    post.update({ likes: likes + 1 }, { where: { id } })
    return res.json({ 'message': 'added like' })
}

export { get_posts, post_posts, get_post, get_posts_list, update_post, delete_post, add_like_in_post }