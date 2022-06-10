import {
  IconLookup,
  IconDefinition,
  findIconDefinition,
} from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const userLookup: IconLookup = { prefix: "fas", iconName: "user" };
const angleRightLookup: IconLookup = { prefix: "fas", iconName: "angle-right" };
const googleLookup: IconLookup = { prefix: "fas", iconName: "g" };
const barsLookup: IconLookup = { prefix: "fas", iconName: "bars" };
const closeLookup: IconLookup = { prefix: "fas", iconName: "xmark" };
const circleCheckLookup: IconLookup = {
  prefix: "fas",
  iconName: "circle-check",
};
const searchCheckLookup: IconLookup = {
  prefix: "fas",
  iconName: "magnifying-glass",
};
const viewCheckLookup: IconLookup = { prefix: "fas", iconName: "eye" };
const trashCheckLookup: IconLookup = { prefix: "fas", iconName: "trash" };
const addContactCheckLookup: IconLookup = {
  prefix: "fas",
  iconName: "user-plus",
};
const cameraCheckLookup: IconLookup = { prefix: "fas", iconName: "camera" };
const settingsLookup: IconLookup = { prefix: "fas", iconName: "gear" };
const plusLookup: IconLookup = { prefix: "fas", iconName: "plus" };
const phoneLookup: IconLookup = { prefix: "fas", iconName: "phone" };
const videoLookup: IconLookup = { prefix: "fas", iconName: "video" };
const messageLookup: IconLookup = { prefix: "fas", iconName: "comment-dots" };
const editLookup: IconLookup = { prefix: "fas", iconName: "pen" };
const ellipsisVerticalLookup: IconLookup = {
  prefix: "fas",
  iconName: "ellipsis-vertical",
};
const angleLeftLookup: IconLookup = { prefix: "fas", iconName: "angle-left" };
const sendLookup: IconLookup = { prefix: "fas", iconName: "paper-plane" };

const user: IconDefinition = findIconDefinition(userLookup);
const angleRight: IconDefinition = findIconDefinition(angleRightLookup);
const google: IconDefinition = findIconDefinition(googleLookup);
const bars: IconDefinition = findIconDefinition(barsLookup);
const close: IconDefinition = findIconDefinition(closeLookup);
const circleCheck: IconDefinition = findIconDefinition(circleCheckLookup);
const search: IconDefinition = findIconDefinition(searchCheckLookup);
const view: IconDefinition = findIconDefinition(viewCheckLookup);
const trash: IconDefinition = findIconDefinition(trashCheckLookup);
const addContactIcon: IconDefinition = findIconDefinition(
  addContactCheckLookup
);
const camera: IconDefinition = findIconDefinition(cameraCheckLookup);
const settings: IconDefinition = findIconDefinition(settingsLookup);
const plus: IconDefinition = findIconDefinition(plusLookup);
const phone: IconDefinition = findIconDefinition(phoneLookup);
const video: IconDefinition = findIconDefinition(videoLookup);
const message: IconDefinition = findIconDefinition(messageLookup);
const edit: IconDefinition = findIconDefinition(editLookup);
const ellipsisVertical: IconDefinition = findIconDefinition(
  ellipsisVerticalLookup
);
const angleLeft: IconDefinition = findIconDefinition(angleLeftLookup);
const send: IconDefinition = findIconDefinition(sendLookup);

export {
  user,
  angleRight,
  google,
  bars,
  close,
  circleCheck,
  search,
  view,
  trash,
  addContactIcon,
  camera,
  settings,
  plus,
  phone,
  video,
  message,
  edit,
  ellipsisVertical,
  angleLeft,
  send,
};
