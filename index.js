import 'dotenv/config'
import express from 'express'
import path from 'path'
import { sequelize } from './db.js'
import { models } from './models/models.js'
// import { logger, requestTime } from './middleware/middlewares.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import router from './routes/index.js'
import errorHandler from './middleware/ErrorHandlingMiddleware.js'


const __dirname = path.resolve()
const PORT = process.env.PORT || 5000
const app = express()

// app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'ejs'))

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)


app.use(errorHandler)

// app.use(serverRoutes)
// app.use(express.json()) // понимание нодай json формата
// app.use(express.urlencoded({extended: false})) // получение тела запроса
// app.use(requestTime)
// app.use(logger)

// app.get('/', (req, res) => {
//     res.render('index', {title: 'Main'})
// })

// app.listen(PORT, () => {
//     console.log(`Server has been started on port: ${PORT}`)
// })
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// })

// app.get('/download', (req, res) => {
//     res.download(path.resolve(__dirname, 'static', 'index.html'))
// })