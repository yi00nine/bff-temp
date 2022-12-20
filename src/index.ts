import * as Koa from "koa";
import * as dotenv from "dotenv";
import * as bodyParser from "koa-bodyparser";
import * as cors from "koa2-cors";
import { httpLogger } from "./utils/log";
import { catchError } from "./utils/error-catch";
import "./controller";
import { Route } from "./router/Router";
dotenv.config();
const app = new Koa();
app.use(httpLogger());
app.use(catchError());
app.use(bodyParser());
app.use(cors());

const router = new Route(app);
router.registerRouters();

app.listen(process.env.PORT, () => {
  console.log("bff is running", process.env.PORT);
});
