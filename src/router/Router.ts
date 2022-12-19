import * as Koa from "koa";
import * as KoaRouter from "koa-router";

const router = new KoaRouter();
export const symbolRoutePrefix: symbol = Symbol("routePrefix");

export class Route {
  static _DecorateRouter: Map<
    { target: any; method: string; path: string },
    Function
  > = new Map();

  private router: KoaRouter;
  private app: Koa;

  constructor(app) {
    this.app = app;
    this.router = router;
  }

  registerRouters() {
    console.log(Route._DecorateRouter);
    for (let [config, controller] of Route._DecorateRouter) {
      let prefix: string = config.target[symbolRoutePrefix];
      if (prefix && !prefix.startsWith("/")) {
        prefix = "/" + prefix;
      }
      let routePath = (prefix || "") + config.path;
      console.log(routePath, config.method);
      this.router[config.method](routePath, controller);
    }
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}
