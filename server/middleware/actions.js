import fs from "fs";
import userService from "../services/userService";
import userRepo from "../repo/userRepo";

const addActionToFile = (action) => {
  const data = fs.readFileSync("./data/actions.json");
  const actionObj = JSON.parse(data);
  actionObj.actions.push(action);
  fs.writeFileSync("./data/actions.json", actionObj);
};

const createAction = async (id) => {
  const user = await userService.getUser(id);
  const userAction = {
    id,
    maxActions: user.maxActions,
    date: new Date(Date.now()).toISOString(),
    allowedActions: user.maxActions - user.numOfActions,
  };
  return userAction;
};

const updateUserAction = (id) => {
  return userRepo.incrementUserActionByOne(id);
};

export default { addActionToFile, createAction, updateUserAction };
