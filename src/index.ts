import * as Koa from "koa";
import * as dotenv from "dotenv";
import "./controller";
import { Route } from "./router/Router";
dotenv.config();
const app = new Koa();
const router = new Route(app);
router.registerRouters();
app.listen(process.env.PORT, () => {
  console.log("bff is running", process.env.PORT);
});
