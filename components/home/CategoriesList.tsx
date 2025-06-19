import { categories } from "@/utils/categories";
import Link from "next/link";

const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <div>
      <div className="flex justify-center my-4 font-bold gap-x-4 overflow-x-auto px-2">
        {categories.map((item) => {
          const isActive = item.label === category;
          return (
            <Link
              href={`/?category=${item.label}${searchTerm}`}
              key={item.label}
              className="flex-shrink-0"
            >
              <article
                className={`p-3 flex flex-col justify-center items-center
                  hover:text-primary hover:scale-110 hover:duration-300
                  ${isActive ? "text-green-500" : ""}`}
              >
                {/* กำหนดขนาดไอคอนให้เล็กลงและ responsive */}
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                <p className="text-xs sm:text-sm mt-1">{item.label}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
