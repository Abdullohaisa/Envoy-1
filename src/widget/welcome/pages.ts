import { ImageSourcePropType } from "react-native";

export interface WelcomePages {
  id: number;
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

export const welcomePages: WelcomePages[] = [
  {
    id: 1,
    title: "Envoy — Yuk tashish oson!",
    desc: "Yukingizni xavfsiz va tez yetkazamiz. Envoy yordamida yuk topshiring yoki haydovchi toping.",
    img: require("../../assets/image/welcome-first.jpg"),
  },
  {
    id: 2,
    title: "Real vaqtda kuzatuv",
    desc: "Yukingiz qayerda ekanini xarita orqali kuzating. Biz sizga ishonchli va ochiq xizmat ko‘rsatamiz.",
    img: require("../../assets/image/welcome-second.jpg"),
  },
  {
    id: 3,
    title: "Pul ishlash imkoniyati",
    desc: "Haydovchi sifatida ro‘yxatdan o‘ting va yuk tashib daromad oling. Oson va ishonchli platforma.",
    img: require("../../assets/image/welcome-third.webp"),
  },
];
