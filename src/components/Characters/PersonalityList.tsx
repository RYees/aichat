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
function PersonalityList(props: {
  id:
  | string
  | number
  | boolean
  | ReactElement<any, string | JSXElementConstructor<any>>
  | Iterable<ReactNode>
  | ReactPortal
  | PromiseLikeOfReactNode
  | null
  | undefined;
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  image: string | undefined;
  description:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  personality:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  hobby:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  story:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  emoji:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  topic:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  voiceid:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;


  async function onCharacterClickHandler() {
    router.push(`/${props.name}`); //?balanceAmount=${balanc}&voiceid=${props.voiceid}
  }


  return (
    <>
    {/* <p className="text-white">{balance}</p> */}
    <div
      onClick={onCharacterClickHandler}
      className="relative flex justify-center"
    >
      <div className=" h-64 w-[180px] overflow-hidden rounded-lg bg-[#d357a117] cursor-pointer  text-[#000000] hover:bg-[#b14a8738]">
        <div>
          <div className="m-2 flex justify-center overflow-hidden">
            <img
              className="mt-3 rounded-[14px] h-40 w-40"
                src={props.image}
            />
          </div>
          <div className="flex justify-center text-[14px] font-bold">
            <p>{props.name}</p>
          </div>
          <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
            <p className="truncate">{props.description}</p>
            {/* <p>{props.personality}, {props.hobby}, {props.story}</p> */}
          </div>
        </div>
        <div className=" absolute bottom-1 mt-14 flex w-full  items-center flex-col px-1 text-[12px]">
           </div>
      </div>
    </div>
    </>
  );
}

export default PersonalityList;
