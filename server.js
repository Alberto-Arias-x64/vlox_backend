import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import helmet from "helmet"
import path from "path"

import sequelize from "./database/setup.js"
import router from "./routes/router.js"

dotenv.config()
const __dirname = path.resolve();

const app = express()
const port = process.env.PORT || 3666

const cors_options = {
    origin: ['http://localhost:3000','https://backend-vlox.vercel.app']
}

app.use(cors(cors_options))
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }))
app.use(morgan("tiny"))

app.use(express.json())

app.use(express.static(path.join(__dirname, './public')))
app.use('/storage', express.static('./storage'))
app.use('/api', router)
app.get('*', (req, res, next) => res.sendFile(path.resolve(__dirname, './public/index.html')))

const sync = async () => {
    await sequelize.sync({ force: false, alter: true, logging: false })
    console.clear()
}

app.listen(port, () => {
    sync().then(() => console.log(`server open on port: ${port}`))
})

export default app