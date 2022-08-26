import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
})
const Balance = sequelize.define('balance', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    balance: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Inventory = sequelize.define('inventory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    items: {type: DataTypes.ARRAY(DataTypes.JSON)}
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    change: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})


User.hasOne(Inventory)
Inventory.belongsTo(User)

User.hasOne(Balance)
Balance.belongsTo(User)


export const models = {
    User,
    Inventory,
    Item,
    Balance
}