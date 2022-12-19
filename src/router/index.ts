import * as Koa from "koa";
import { symbolRoutePrefix, Route } from "./Router";

export function prefix(pre: string) {
  return (target: any) => {
    target.prototype[symbolRoutePrefix] = pre;
  };
}

export function router(config: { path: string; method: string }) {
  return (target: any, name: any) => {
    const { path, method } = config;
    const base = target[name];
    Route._DecorateRouter.set({ path, method, target }, base.bind(target));
  };
}
