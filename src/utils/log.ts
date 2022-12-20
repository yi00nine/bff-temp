import * as colors from "colors-console";
import * as Koa from "koa";
import * as moment from "moment";

export class Logger {
  static http(...message: Array<string>) {
    console.log(
      colors("blue", "http"),
      `${moment().format("YYYY-MM-DD HH:mm:ss")}\t`,
      message.join("  ")
    );
  }

  static info(...message: Array<string>) {
    console.log(
      colors("green", "info"),
      `${moment().format("YYYY-MM-DD HH:mm:ss")}\t`,
      message.join("  ")
    );
  }

  static error(...message: Array<string>) {
    console.log(
      colors("red", "error"),
      `${moment().format("YYYY-MM-DD HH:mm:ss")}\t`,
      message.join("  ")
    );
  }
}

export function logger() {
  return (target: any, name: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = (...args) => {
      Logger.info(">>>", colors("blue", name));
      let ret;
      try {
        ret = method.apply(target, args);
        ret
          .then((res) => Logger.info("<<<", colors("green", name)))
          .catch((err) => Logger.error("<<<", colors("red", name)));
      } catch (error) {
        Logger.error("<<<", colors("red", name), error.toString());
      }
      return ret;
    };
  };
}

export function httpLogger() {
  return async function (ctx, next) {
    Logger.http(colors("yellow", ctx.method, ctx.originalUrl));
    try {
      await next();
    } catch (error) {
      Logger.error(colors("yellow", ctx.method, ctx.originalUrl));
    }
    Logger.http(
      colors("yellow", ctx.method, ctx.originalUrl),
      colors("yellow", ctx.status)
    );
  };
}
