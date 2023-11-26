/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
//@ts-nocheck
import Category from "./Catergory";
import CharacterList from "./CharacterList";
import PersonalityList from "./PersonalityList"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import { useRouter } from "next/router";
import "swiper/css";
import "swiper/css/navigation";
import { Key, useEffect } from "react";

function Characters(props) {
  const router = useRouter();
  const CHAR_INFO = props.charinfo;
  // console.log("sfd", CHAR_INFO[0].name)
 
  useEffect(() =>{
    if(CHAR_INFO.length === 1) {
      setTimeout(() => {
        router.push(`/${CHAR_INFO[0].name}`);
      }, 20000); // 
    }
  });
  
  return (
    <div className="ml-4 h-full w-full pb-7 pt-2 mt-8">
      {/* <Category /> */}

      <div className="ml-24">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={10}
          slidesPerView={7}
          navigation
        >
          {/* {CHARACTER_LIST.map(
            (character: {
              id: Key | null | undefined;
              title: any;
              name: any;
              description: any;
              image: any;
              creator: any;
              count: any;
              voiceid:any;
            }) => {
              return (
                <SwiperSlide key={character.id}>
                  <CharacterList
                    id={character.id}
                    title={character.title}
                    name={character.name}
                    description={character.description}
                    image={character.image}
                    creator={character.creator}
                    count={character.count}
                    voiceid={character.voiceid}
                  />
                </SwiperSlide>
              );
            }
          )} */}

          {CHAR_INFO?.map(
            (charinfo: {
              id: Key | null | undefined;
              personality: any;
              name: any;
              description: any;
              hobby: any;
              story: any;
              emoji: any;
              topic: any;
              image: any;a
              voiceid:any;
              count:any;
            }) => {
              return (
                <SwiperSlide key={charinfo.id}>
                  <PersonalityList
                    id={charinfo.id}
                    personality={charinfo.personality}
                    name={charinfo.name}
                    description={charinfo.description}
                    hobby={charinfo.hobby}
                    story={charinfo.story}
                    emoji={charinfo.emoji}
                    topic={charinfo.topic}
                    image={charinfo.image}                    
                    voiceid={charinfo.voiceid}
                    count={CHAR_INFO.length}
                  />
                </SwiperSlide>
              );
            }
          )}

        </Swiper>
      </div>
    </div>
  );
}
export default Characters;


// export async function getServerSideProps(context) {
//   const prisma = new PrismaClient();
//   //const data = await prisma.character.findMany();
//   const charinfo = await prisma.character?.findMany();
  
//   return {
//     props: {
//       //character: JSON.parse(JSON.stringify(data)),
//       charinfo:  JSON.parse(JSON.stringify(charinfo))
//     },
//   };
// }