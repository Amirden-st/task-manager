import express from "express"
import rootRouter from "./routes/index.js"
import appMiddlewares from './middleware/app.js'
import "./db.js"

const PORT = 8000

const app = express();

// tell express to expect json in queries
app.use(express.json())

app.use(appMiddlewares)


app.use(rootRouter)

app.listen(PORT, err => {
    if (err) {
        return console.log(err)
    }

    console.log('Server is running on port: ', PORT)
})