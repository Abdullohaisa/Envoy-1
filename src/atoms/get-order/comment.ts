import { TComment } from "@/types/order";
import { atom } from "jotai";

export const getOrderComment = atom<TComment>(null);
