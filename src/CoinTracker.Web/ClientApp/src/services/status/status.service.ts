import BaseCrudService from "../base.service";

let instance: StatusService;

class StatusService extends BaseCrudService<{status:string, timeStamp: Date, version:string}> {
  constructor() {
    super("health");

    if (!instance) {
      instance = this;
    }
  }
}

const statusService = Object.freeze(new StatusService());

export default statusService;
