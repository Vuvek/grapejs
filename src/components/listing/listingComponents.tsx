import { serversideDataProps } from "@/app/page";

interface NewListingProps {
  data: serversideDataProps[];
}

const Listing = ({ data }: NewListingProps) => {
  return (
    <div>
      <h1>Main Listing Data </h1>
      {data?.map((list) => {
        return (
          <div key={list.id}>
            <h3>{list.name}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Listing;
