import { atom, createStore } from "jotai";

export const appStore = createStore();

export const errorAtom = atom<string | null>(null);
