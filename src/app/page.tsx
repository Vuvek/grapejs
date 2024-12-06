"use client";
import GrapeJsEditor from "@/grapeJsEditor";
import axios from "axios";
import { useEffect, useState } from "react";
export interface serversideDataProps {
  id: number;
  name: string;
}
const Home = () => {
  const [serverData, setServerData] = useState<[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios({
        method: "GET",
        url: "https://lanofrontapi.lanoequip.com/StoreDeals/getstoredealsbystoreid/5.json",
      });
      setServerData(data?.data?.data);
    };
    fetchData();
  }, []);

  return <GrapeJsEditor serverSideData={serverData} />;
};
export default Home;
