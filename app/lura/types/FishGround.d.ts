type FishGround = {
  id: number;
  name: string;
  desc: string;
  locationStr: string;
  // 位置,坐标
  location: {
    lat: number;
    lng: number;
  };
  introPics: string[];
  introVideos: string[];
  phone: string;
};
