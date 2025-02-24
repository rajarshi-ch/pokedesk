import { BagItem } from "./types";
import { generateRandomId } from "./utils";

export type RegionValue = "kanto" | "jhoto" | "hoenn";

export const regionItems = [
    { label: "Kanto", value: "kanto" },
    { label: "Jhoto", value: "jhoto" },
    { label: "Hoenn", value: "hoenn" },
];

export const bagItems = [
    { label: "Poke Ball", value: "pokeball" },
    { label: "Great Ball", value: "greatball" },
    { label: "Super Potion", value: "superpotion" },
    { label: "Hyper Potion", value: "hyperpotion" },
]
export type bagItemType = "pokeball" | "greatball" | "superpotion" | "hyperpotion";

/** Regions we support */
export type Region = "kanto" | "jhoto" | "hoenn";

/** Starter Pokémon names for each region */
export type PokemonName =
    | "Bulbasaur"
    | "Charmander"
    | "Squirtle"
    | "Chikorita"
    | "Cyndaquil"
    | "Totodile"
    | "Treecko"
    | "Torchic"
    | "Mudkip";


export const priceMap: { [key: string]: number } = {
    "pokeball": 5,
    "greatball": 10,
    "superpotion": 10,
    "hyperpotion": 20,
    "bag": 2
}

export const defaultBagItems: BagItem[] = [
    new BagItem('pokeball', 6, true, generateRandomId(5)),
    new BagItem('greatball', 10, false, generateRandomId(5)),
    new BagItem('superpotion', 10, false, generateRandomId(5)),
]