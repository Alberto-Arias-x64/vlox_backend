import fs from "fs"
import dotenv from "dotenv"
import path from "path"
import { Sequelize, DataTypes } from 'sequelize';
import * as dialect_module from 'mysql2'
dotenv.config()

const __dirname = path.resolve();

/* const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}) */

const sequelize = new Sequelize({
    dialect: 'mysql',
    dialectModule: dialect_module, // <========= IMPORTING DIALECT 
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialectOptions:{
        ssl  : {
            ca : fs.readFileSync(path.join(__dirname, '/database/cacert.pem'))
        },
    },
})

const post = sequelize.define('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    likes:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: false
})

const analytics = sequelize.define('analytics', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false
    },
    lastPost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalLikes: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
})

export default sequelize

export { post, analytics }