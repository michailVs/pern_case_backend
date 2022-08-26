import ApiError from "../error/ApiError.js"
import { models } from "../models/models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const generateJwt = (id, username, balance) => {
    return jwt.sign({id, username, balance}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

export const reg = async (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
        return next(ApiError.badRequest('Некоректный username или пароль!'))
    }
    const candidate = await models.User.findOne({where: {username}})
    if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким username уже существует!'))
    }
    const hashPas = await bcrypt.hash(password, 5)
    const user = await models.User.create({username, password: hashPas})
    const inventory = await models.Inventory.create({userId: user.id})
    const token = generateJwt(user.id, user.username)
    return res.json({token})
}
export const login = async (req, res, next) => {
    const {username, password} = req.body
    const user = await models.User.findOne({where: {username}})
    if (!user) {
        return next(ApiError.internal('Такого пользователя не существует!'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
        return next(ApiError.internal('Неверный пароль!'))
    }
    const token = generateJwt(user.id, user.username, user.balance)
    return res.json({token})
}
export const check = async (req, res) => {
    const token = generateJwt(req.user.id, req.user.username, req.user.balance)
    return res.json({token})
}
