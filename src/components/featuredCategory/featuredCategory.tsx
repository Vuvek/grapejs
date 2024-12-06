import Link from "next/link";
import React from "react";

interface FeaturedCategoryProps {
  serverSideData: any[];
}
const FeaturedCategory = ({ serverSideData }: FeaturedCategoryProps) => {
  return (
    <div className="flex flex-wrap m-9 ">
      {serverSideData?.slice(0, 4).map((data) => {
        return (
          <div
            className="px-4 mb-2 flex  shadow-lg w-1/2 md:w-4/12 lg:w-3/12 lg:px-[15px] lg:mb-[30px] "
            key={data?.id}
          >
            <div className="flex flex-col border border-gray-500 overflow-hidden">
              <div>
                <img
                  className="object-contain"
                  style={{
                    minHeight: "300px",
                  }}
                  src={`https://storagemedia.lanoequip.com/${data?.image}`}
                />
              </div>
              <Link href={`https://www.anniesannuals.com/${data.seName}.html`}>
                {data?.name}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedCategory;
