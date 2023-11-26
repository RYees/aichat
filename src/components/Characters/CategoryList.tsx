/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { useState } from "react";

interface CategoryListProps {
  title: string;
}

const CategoryList: React.FC<CategoryListProps> = (
  props: CategoryListProps
) => {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`mx-[2px]   h-8 w-auto max-w-[190px] rounded-md ${
        active ? "bg-[#0d0d0d]" : "bg-[#363838]"
      } px-4 py-5 text-[14px]  font-[500] text-[#e5e0d8d9]  `}
    >
      <p className="flex h-full items-center justify-center hover:text-[#2473ae]">
        {props.title}
      </p>
    </button>
  );
};

export default CategoryList;
