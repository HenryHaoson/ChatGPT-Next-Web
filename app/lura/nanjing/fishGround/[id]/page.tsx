import { fishGounrds } from "@/app/lura/data/fishGrounds";
import React from "react";
import FinishGround from "../../components/FishGround";
export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const idInt = parseInt(id);
  const fishGround = fishGounrds.find((fishGround) => {
    return fishGround.id === idInt;
  })!!;
  return (
    <div className="h-screen">
      <FinishGround data={fishGround} />
    </div>
  );
}
