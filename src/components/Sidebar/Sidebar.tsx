// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck\
import SidebarList from "./SidebarLists";

const SIDEBAR_LISTS = [
  { id: 1, link: "#", title: "Home", icon: "AiFillHome" },
  { id: 5, link: "#", title: "Feed", icon: "CgFeed" },
  { id: 2, link: "/start", title: "Create", icon: "AiOutlinePlus" },
  { id: 3, link: "#", title: "Chats", icon: "BsFillChatLeftFill" },
  { id: 4, link: "#", title: "Commmunity", icon: "BsPeopleFill" },
];
function Sidebar() {
  return (
    <>
      <div
        id="default-sidebar"
        className="fixed left-0 top-0 z-40 mt-14 h-screen w-32 -translate-x-full text-[12px] text-[#e5e0d8d9] transition-transform  sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full  overflow-y-auto bg-transparent px-3 py-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {SIDEBAR_LISTS.map((sidebar) => {
              return (
                <SidebarList
                  key={sidebar.id}
                  link={sidebar.link}
                  title={sidebar.title}
                  icon={sidebar.icon}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
