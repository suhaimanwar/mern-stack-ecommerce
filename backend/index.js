import cors from 'cors'
import express from 'express'
import { ConnectMongoDB } from './src/config/db.js';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import { notFoundError } from './src/utils/errorHandler.js';
import { statusCode } from './src/enum/StatusCodes.js';
// import DashboardRouter from './src/routes/dashboard/MainRoutes.js';
import FrontendRouter from './src/routes/frontend/MainRoutes.js';
import { cwd } from 'process';
import { DashboardRouter } from './src/routes/dashboard/DashboardRoutes.js';
import { createAdmin } from './src/utils/createAdmin.js';
import WebhookRouter from './src/routes/frontend/routes/WebhookRouter.js';


const port = 5000;


//Run the express function in app
const app = express()


app.use('/api/webhook', express.raw({type: 'application/json'}), WebhookRouter)

//App should use express in .json format and cors

app.use(express.json())
app.use(cors())

app.use(
	helmet({
		crossOriginEmbedderPolicy: false,
		crossOriginResourcePolicy: { policy: 'cross-origin' },
		contentSecurityPolicy: {
			directives: {
				// eslint-disable-next-line quotes
				defaultSrc: ["'self'"],
				// eslint-disable-next-line quotes
				imgSrc: ["'self'", 'data:', '*.ubnhb.in'],
				// eslint-disable-next-line quotes
				connectSrc: ["'self'", '*.ubnhb.in'],
			},
		},
	}),
);

app.use(mongoSanitize())


app.use('/api', DashboardRouter)
app.use('/frontend/api', FrontendRouter)
app.use('/uploads', express.static(cwd() + '/uploads', { maxAge: 31557600 }));

ConnectMongoDB();
 
//page-not-foud
app.use((req, res, next)=>{
    next(notFoundError())
})

//error handler
app.use((err, req, res, next)=>{
    if (err.status === statusCode.notFound) {
        const errorMessage = err.message || 'Page not found';

        res.status(statusCode.notFound).json({
            success: false,
            message: errorMessage
        })
    } else {
        const errorStatus = err.status || statusCode.serverError;
        const errorMessage = err.message || 'Something Went Wrong';

        res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage
        })

        next()
    }
})

// App should listen to the port. 

app.listen(port, async ()=>{
    console.log(`Server is listening to port ${port}`)
    await createAdmin()
})

//Run it - npm run dev
//It should show the server is running

app.get("/test/api", async()=> {
    console.log("Hello Server : GET Method")
})

app.post("/test/api", async()=> {
    console.log("Hello Server : POST Method")
})  