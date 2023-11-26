/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { BsFillChatLeftFill, BsPeopleFill } from "react-icons/bs";
import { CgFeed } from "react-icons/cg";

const DynamicHomeIcon = ({ type }) => {
  const Icon = components[type];
  return <Icon size={"20px"}></Icon>;
};

const components = {
  AiFillHome,
  BsPeopleFill,
  BsFillChatLeftFill,
  AiOutlinePlus,
  CgFeed,
};

export default DynamicHomeIcon;
