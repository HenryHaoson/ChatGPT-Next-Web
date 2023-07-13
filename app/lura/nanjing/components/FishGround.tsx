import React from "react";
import FishGroundSwiper from "./FishGroundSwiper";

export default function FinishGround(props: { data: FishGround }) {
  return (
    <div>
      <div className="font-sans text-4xl italic font-bold">
        {props.data.name}
      </div>
      <FishGroundSwiper data={props.data} />
    </div>
  );
}
