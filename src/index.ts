import * as Koa from "koa";
import * as dotenv from "dotenv";
dotenv.config();
const app = new Koa();

app.listen(process.env.PORT, () => {
  console.log("bff is running", process.env.PORT);
});
