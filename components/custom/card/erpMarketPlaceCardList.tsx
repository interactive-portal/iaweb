import RenderAtom from "@/components/common/atom/renderAtom";
import WidgetWrapperContext from "@/components/widget/WidgetWrapper";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./productItem";
import _ from "lodash";
import { useRouter } from "next/router";
import fetchJson, { jsonParse } from "@/utils/helper";
import MarketPlaceItem from "./marketPlaceItem";
import { Pagination } from "antd";

export default function ErpMarketPlaceCardList() {
  const { config, readyDatasrc, widgetnemgooReady } =
    useContext(WidgetWrapperContext);
  const { locale } = useRouter();
  const staticItem = readyDatasrc[0];
  const externalData = staticItem?.externalData;
  const dvalue = widgetnemgooReady?.default || "16861245454069";
  const { metadataId, options } = widgetnemgooReady;
  const router = useRouter();

  const [filterId, setFilter] = useState(router.query?.id);
  const [data, setData] = useState([]);

  const optionsType: any = {
    type: "product",
  };
  useEffect(() => {
    const criteria = {
      category: router.query?.id,
    };

    const fetchData = async () => {
      if (metadataId) {
        const data = await fetchJson(
          `/api/get-data?metaid=${metadataId}&criteria=${JSON.stringify(
            criteria
          )}&pagingwithoutaggregate=1&lang=${locale}`
        );
        setData(data.result);
      } else {
        // console.log("fetchData fetchData", data);
      }
      // console.log("fetchData fetchData", data);
    };
    fetchData();
  }, [router.query]);

  const [current, setCurrent] = useState(3);

  const onChange = async (e: React.SetStateAction<number>) => {
    setCurrent(e);
  };

  return (
    <div
      className={`relative w-full pb-[30px] ${options?.className || " h-auto"}`}
    >
      <div className="flex justify-between   py-1  items-center mb-4">
        <span className="text-xl">Бүгд ({data?.length})</span>
        <div className="flex w-1/2 flex-col">
          <ul className="flex gap-4 justify-end  items-center">
            <li>
              <i className="fa fa-grid-2 text-black/50"></i>
            </li>
            <li>
              <i className="fa fa-bars text-black/50"></i>
            </li>
            <li>
              <i className="fa fa-grid text-black/50"></i>
            </li>
            <li className="pr-1">
              <select
                name="dd"
                id="dd"
                className="py-1 px-4 flex rounded-lg w-32 "
              >
                <option value="1">Онцгой</option>
                <option value="1">Эрэлттэй</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {data?.map((item: any, index: number) => {
            return (
              <MarketPlaceItem key={index} data={item} options={optionsType} />
            );
          })}
        </div>
        <div className="flex flex-row justify-between mt-5 items-center">
          <span className="text-sm text-[#3C3C3C]">
            100 бүтээгдэхүүнээс 21-40 р хэсгийг харуулж байна.
          </span>
          <Pagination
            current={current}
            onChange={(e) => {
              onChange(e);
            }}
            total={500}
          />
        </div>
      </div>
    </div>
  );
}
