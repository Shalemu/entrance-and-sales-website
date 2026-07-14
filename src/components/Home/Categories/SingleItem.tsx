import { Category } from "@/types/category";
import Image from "next/image";

const SingleItem = ({ item }: { item: Category }) => {

  return (
    <a href="#" className="group flex flex-col items-center">

      <div className="w-[130px] h-[130px] rounded-full bg-[#F2F3F8] overflow-hidden relative mb-4 shadow-sm">

        <Image
          src={item.img}
          alt={item.title || "Service image"}
          fill
          className="object-cover"
          sizes="130px"
        />

      </div>


      <h3 className="font-medium text-center text-dark group-hover:text-blue transition-colors">
        {item.title}
      </h3>

    </a>
  );
};

export default SingleItem;