import { body } from "express-validator"

const validate = [
    body('title').exists().not().isEmpty().isString(),
    body('data').exists().not().isEmpty().isString(),
    body('image').exists().not().isEmpty().isString(),
]

export default validate