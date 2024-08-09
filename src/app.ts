import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import { promise } from "zod";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
  res.send('hello')
}

app.get("/", test);



//global error handling
app.use(globalErrorHandler)

//not found route
app.use(notFound)

export default app;
