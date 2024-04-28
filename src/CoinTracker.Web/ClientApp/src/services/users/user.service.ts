import BaseCrudService from "../base.service";
import { User } from "../../models/user/user.model";

let instance: UserService;

class UserService extends BaseCrudService<User> {
  constructor() {
    super("user");

    if (!instance) {
      instance = this;
    }
  }
}

const userService = Object.freeze(new UserService());

export default userService;
