"use client";
import React, { useEffect } from "react";
import { Swiper } from "@/components/antd/Swiper";
import Image from "next/image";
import "antd-mobile/es/global";

export default function FinishGroundSwiper(props: { data: FishGround }) {
  const [swiperItems, setSwiperItems] = React.useState<React.ReactElement[]>(
    [],
  );
  useEffect(() => {
    const swiperItems = props.data.introPics.map((image) => {
      return (
        <Swiper.Item key={image}>
          <div className="rounded-[10px] border-white border-[5px]">
            <Image
              alt="钓场介绍图"
              src={image}
              width={0}
              height={0}
              sizes="100%"
              className="rounded-[10px] m-x-[10px]"
              style={{ width: "100%", height: "200px" }}
            ></Image>
          </div>
        </Swiper.Item>
      );
    });
    setSwiperItems(swiperItems);
  }, [props.data.introPics]);
  return (
    <div>
      {swiperItems.length > 0 && (
        <Swiper
          style={{
            "--border-radius": "8px",
          }}
          className="w-full"
          defaultIndex={1}
        >
          {swiperItems}
        </Swiper>
      )}
    </div>
  );
}
