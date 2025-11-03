import { atom } from "jotai";

export type TComment = string | null;

export const getOrderComment = atom<TComment>(null);
