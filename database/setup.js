import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const post = sequelize.define('post', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
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
        type: DataTypes.NUMBER,
        defaultValue: 0
    }
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
    },
    lastPost: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalLikes: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
})

export default sequelize

export { post, analytics }