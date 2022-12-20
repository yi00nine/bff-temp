import { prefix, router } from "../router";
import { inject } from "../utils/inject";
import { UserService } from "../service/user.service";
@prefix("api")
export class UserController {
  @inject(UserService)
  userSrv: UserService;

  @router({
    path: "/login",
    method: "post",
  })
  async login(ctx) {
    const res = await this.userSrv.login();
    ctx.body = {
      code: 0,
      data: res,
    };
  }
}
