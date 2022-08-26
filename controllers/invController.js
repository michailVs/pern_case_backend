import ApiError from '../error/ApiError.js'
import {models} from '../models/models.js'

export const getInv = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId} = req.body
        const userInv = await models.Inventory.findOne({where: {id}})
        if (!userInv) {
            return next(ApiError.badRequest('Пользовательский инвентарь не найден'))
        }
        return res.status(200).json(userInv)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}

export const addItem = async (req, res, next) => {
    try {
        const {id} = req.params
        const {userId, itemId} = req.body
        const itemIs = await models.Item.findOne({where: {id: itemId}})
        const item = await models.Inventory.findOne({where: {id}})
        const inv = await models.Inventory.destroy({where: {id}})
        if (!inv) {
            return next(ApiError.badRequest('пользователь не найден'))
        }
        const i = item.items
        const userInv = await models.Inventory.create({id, userId, items: i ? [...i, {...itemIs.dataValues, id: i.length + 1}] : [itemIs]})
        if (!userInv) {
            const intas = await models.Inventory.create({id, userId})
            return res.status(404).json('Возникла ошибка в itemId')
        }
        return res.status(200).json(userInv)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}

export const delItem = async (req, res, next) => {
    try {
        const {id} = req.params
        const {itemId, userId} = req.body
        const inv = await models.Inventory.findOne({where: {id}})
        if (!inv) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        const item = inv.items.filter(i => i.id !== itemId)
        if (!item) {
            return next(ApiError.badRequest('Инвентарь пуст'))
        }
        const delInv = await models.Inventory.destroy({where: {id}})
        if (!delInv) {
            return next(ApiError.badRequest('Инвентарь пуст'))
        }
        const userInv = await models.Inventory.create({id, items: item, userId})
        return res.status(200).json(userInv)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}