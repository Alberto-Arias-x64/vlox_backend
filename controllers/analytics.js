import { analytics } from '../database/setup.js'
import { add_like_in_post } from '../controllers/post.js'

const get_analytics = async (_, res) => {
    const data = await analytics.findAll()
    if (data.length !== 0) return res.json(data[0].dataValues)
    const prefab = await analytics.create({
        lastPost: 'Aun no has creado Post',
        totalLikes: 0
    })
    console.log(prefab)
    return res.json(prefab)
}

const update = async (post_name) => {
    const last = await analytics.findAll()
    const id = last[0].dataValues.id
    await analytics.update({ lastPost: post_name }, { where: { id } })
}

const add_like = async (req, res) => {
    const last = await analytics.findAll()
    const id = last[0].dataValues.id
    const likes = parseInt(last[0].dataValues.totalLikes) + 1
    await analytics.update({ totalLikes: likes }, { where: { id } })
    add_like_in_post(req, res)
}

export { get_analytics, update, add_like }