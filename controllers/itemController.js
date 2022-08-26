import ApiError from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { models } from '../models/models.js'


const __dirname = path.resolve()


export const create = async (req, res, next) => {
    try {
        const {title, price, change} = req.body
        const {img} = req.files
        let fileName = uuidv4() + '.png'
        img.mv(path.resolve(__dirname, 'static', fileName))
        const item = await models.Item.create({title, price, change, img: fileName})

        return res.json(item)
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
}
export const getAll = async (req, res) => {
    let {limit, page} = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    const items = await models.Item.findAndCountAll({limit, offset})
    return res.json(items)
}
export const getOne = async (req, res) => {
    const {id} = req.params
    const item = await models.Item.findOne({where: {id}})
    return res.json(item)
}
export const removeItem = async (req, res, next) => {
    const {id} = req.params
    const itemId = await models.Item.destroy({where: {id}})
    if (!itemId) {
        return next(ApiError.badRequest('Предмета с таким идентификатором не найдено'))
    }
    return res.json({message: `Предмет под идентификатором: ${id}, удалён!`})
}