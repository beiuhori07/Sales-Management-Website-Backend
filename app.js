require('dotenv').config();
require('express-async-errors');

// const User = require('./models/User')
// const Pizza = require('./models/Pizza')

// manual insert pizzas

// const data = require('./pizza-data.json')
// data.forEach(async (data1) => {
//     console.log(data1)
//     const pizzas = await Pizza.create({...data1})
// })

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express')
const app = express();

// connect to db
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const pizzaRouter = require('./routes/pizza-route')

// error handler
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')


app.set('trust proxy', 1) // need to be set if you are behind a reverse proxy
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 1000
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.get('/', (req, res) => 
    res.send('jobs api')   
)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/pizza', authenticateUser, pizzaRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        // connect to db
        await connectDB(process.env.MONGO_URI)


        app.listen(port, () => 
            console.log(`server is listening on port ${port}...`)
        )

        // manual registration

        // const user = await User.create({
        //     name: 'hori',
        //     email: 'horibeiu@gmail.com',
        //     password: 'parola'
        // })


    } catch (error) {
        console.log(error);
    }
}

start();