import { prefix, router } from "../router";
@prefix("api")
export class UserController {
  @router({
    path: "/login",
    method: "post",
  })
  async login() {
    console.log("login");
  }
}
