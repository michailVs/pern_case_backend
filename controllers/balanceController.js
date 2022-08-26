import ApiError from '../error/ApiError.js'
import {models} from '../models/models.js'

export const createBalance = async (req, res, next) => {
    try {
        const {balance, userId} = req.body
        const balanc = await models.Balance.create({userId, balance})
        
        return res.json(balanc)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}
export const getBalance = async (req, res, next) => {
    try {
        const {id} = req.params
        const balance = await models.Balance.findOne({where: {id}})
        return res.json(balance)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}
export const addBalance = async (req, res, next) => {
    try {
        const {id} = req.params
        const {balance, userId} = req.body
        const balanc = await models.Balance.destroy({where: {id}})
        if (!balanc) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        const add = await models.Balance.create({id, userId, balance})
        return res.status(200).json(add)
    } catch (e) {
        return next(ApiError.badRequest(e.message))
    }
}