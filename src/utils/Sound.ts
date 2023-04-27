import { Howl } from "howler";

export const sound = (
  src: string,
  loop?: boolean,
  volume?: number
) =>
  new Howl({
    src: src,
    volume: volume || 0.5,
    autoplay: true,
    loop,
  });
