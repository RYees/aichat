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
function CharacterList(props: {
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
  creator:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | PromiseLikeOfReactNode
    | null
    | undefined;
  count:
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
  // const user = session?.user?.email;
  const user = session?.user;


  const fetch = async(id:any) => {
    // const users = await prisma.user.findMany();
    if(user){
      const iduser = user.id;
      const userId = iduser.toString();
      const users = await axios.get(`/api/user?userId=${userId}&characterId=${id}`);
      if(users.data !== null){      
      localStorage.setItem('credit', users.data.balance);
      return users.data.balance;
    } else {
      // alert("make sure you are logged in!")
      console.log("make sure you are logged in")
    }  
    
    }    
  }
  async function onCharacterClickHandler() {
    const balanc = await fetch(props.id);
    router.push(`/${props.name}`); //?balanceAmount=${balanc}&voiceid=${props.voiceid}
  }

  return (
    <>
    <div
      onClick={onCharacterClickHandler}
      className="relative flex justify-center"
    >
      <div className=" h-64 w-[180px] overflow-hidden rounded-lg bg-[#2b2c2d]  text-[#e5e0d8d9] hover:bg-[#393b3b]">
        <div>
          <div className="m-2 flex justify-center overflow-hidden">
            <img
              className="mt-3 rounded-[14px] "
              width="108px"
              height="108px"
              src={props.image}
            />
          </div>
          <div className="flex justify-center text-[14px] font-bold">
            <p>{props.name}</p>
          </div>
          <div className="mt-[4px] px-2 text-center text-[12px] font-[400]">
            <p>{props.description}</p>
          </div>
        </div>
        <div className=" absolute bottom-1 mt-14 flex w-full  items-end justify-between px-1 text-[12px]">
          <p className="italic text-[#e5e0d880]">@{props.creator}</p>
          <p>{props.count}m</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default CharacterList;
