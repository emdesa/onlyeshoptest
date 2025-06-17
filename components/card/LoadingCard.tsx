import { Skeleton } from "../ui/skeleton";

const LoadingCard = () => {
  return (
    <div>
      <div>
      <SkeletonCardHero/>
      </div>

      <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
    gap-4 mt-4"
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
    </div>

    
  );
};

export const SkeletonCard = () => {
  return (
    <div>
      <Skeleton className="relative h-[300px] rounded-md mb-2" />
      <Skeleton className="relative h-4 w-3/4 rounded-md mb-2" />
      <Skeleton className="relative h-4 w-1/2 rounded-md mb-2" />
      <Skeleton className="relative h-4 w-1/4 rounded-md" />
    </div>
  );
};

export const SkeletonCardHero = () => {
  return (
    <div className="w-full">
      {/* Skeleton main swiper */}
      <div className="w-full">
        {[...Array(1)].map((_, idx) => (
          <div
            key={idx}
            className="group flex flex-col animate-pulse"
          >
            <div className="relative rounded-xl overflow-hidden h-full">
              <div className="w-full h-[400px] bg-gray-300" />
            </div>

            <div className="absolute bottom-0 left-0 z-50">
              <div
                className="col-span-4 mb-4 flex h-full flex-1
                justify-end px-5 md:mb-4 md:justify-end md:px-10"
              >
                {/* <div className="w-[200px] h-[20px] bg-gray-300 rounded" /> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton thumbnail swiper */}
      <div className="h-[100px] mt-4 flex gap-2">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="w-full h-[80px] bg-gray-300 rounded-md opacity-40"
          />
        ))}
      </div>
      <div className="w-full h-[80px] bg-gray-300 rounded" />
    </div>
  );
};


export default LoadingCard;
