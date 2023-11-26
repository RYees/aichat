/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import Link from "next/link";
import DynamicHomeIcon from "../helper/DyamicHomeIcon.js";

function SidebarList(props) {
  return (
    <li>
      <Link
        href={props.link}
        className="mt-2 flex w-16 flex-col justify-center rounded-lg p-2 hover:text-[#2473ae]     dark:hover:bg-gray-700"
      >
        <div className="flex w-14 justify-center">
          <DynamicHomeIcon type={props.icon} />
        </div>
        <div className=" w-14 text-center text-[12px] font-[400] hover:text-[#2473ae]">
          {props.title}
        </div>
      </Link>
    </li>
  );
}

export default SidebarList;
