import { BagItem, PokemonOption } from "./types";
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
    new BagItem('pokeball', 6, true, generateRandomId()),
    new BagItem('greatball', 10, false, generateRandomId()),
    new BagItem('superpotion', 10, false, generateRandomId()),
]

export const starterPokemon: Record<Region, PokemonOption[]> = {
    kanto: [
        {
            name: "Bulbasaur",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png",
        },
        {
            name: "Charmander",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png",
        },
        {
            name: "Squirtle",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png",
        },
    ],
    jhoto: [
        {
            name: "Chikorita",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/152.png",
        },
        {
            name: "Cyndaquil",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/155.png",
        },
        {
            name: "Totodile",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/158.png",
        },
    ],
    hoenn: [
        {
            name: "Treecko",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/252.png",
        },
        {
            name: "Torchic",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/255.png",
        },
        {
            name: "Mudkip",
            image: "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/258.png",
        },
    ],
};
