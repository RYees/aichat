// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import CategoryList from "./CategoryList";

const CATEGORY_LIST = [
  { id: 1, title: "Featured" },
  { id: 2, title: "Discover" },
  { id: 3, title: "Helpers" },
  { id: 4, title: "Famous People" },
  { id: 5, title: "Games" },
  { id: 6, title: "Image Generating" },
  { id: 7, title: "VTuber" },
  { id: 8, title: "Game Character" },
  { id: 9, title: "Anime" },
  { id: 10, title: "Movie and TV" },
];
function Category() {
  return (
    <div className=" flex h-full w-full justify-center ">
      <ul
        class="my-2 mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
        role="tablist"
        data-te-nav-ref
      >
        <li className="" role="presentation">
          {CATEGORY_LIST.map((category) => {
            return <CategoryList key={category.id} title={category.title} />;
          })}
        </li>
      </ul>
    </div>
  );
}

export default Category;
