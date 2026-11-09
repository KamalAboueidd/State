import { atom } from "jotai";

// 1. Primitive Atom: holds independent atomic state
export const countAtom = atom(0);

// 2. Derived (Read-only) Atom: auto-tracks dependencies via get()
export const doubleCountAtom = atom((get) => get(countAtom) * 2);

// 3. Independent Text Atom
export const textAtom = atom("Jotai Atomic State");

// Backwards compatibility aliases
export const countAutom = countAtom;
export const deobleCountAutom = doubleCountAtom;
