/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useState,
  useEffect
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

function CharList(props:any) {
  const router = useRouter();
  const CHAR_INFO = props.charinfo;
  const { data: session } = useSession();
  const user = session?.user;


  async function onCharacterClickHandler() {
    router.push(`/${props.name}`); 
  }


  return (
    <>
    {CHAR_INFO.map((item:any, index:any) => (
    <div
      onClick={onCharacterClickHandler}
      className="relative"
    >
      <div className="h-64 md:w-[180px] sm:w-[280px] w-[280px] overflow-hidden rounded-lg bg-[#d357a117] cursor-pointer  text-[#000000] hover:bg-[#b14a8738]">
        <div>
          <div className="m-2 flex justify-center overflow-hidden">
            <img
              className="mt-3 rounded-[14px] h-40 w-40"
                src={item.image}
            />
          </div>
          <div className="flex justify-center text-[14px] font-bold">
            <p>{item.name}</p>
          </div>
          <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
            <p className="truncate">{item.description}</p>
            {/* <p>{props.personality}, {props.hobby}, {props.story}</p> */}
          </div>
        </div>
        <div className=" absolute bottom-1 mt-14 flex w-full  items-center flex-col px-1 text-[12px]">
           </div>
      </div>
    </div>
    ))}
    </>
  );
}

export default CharList;
