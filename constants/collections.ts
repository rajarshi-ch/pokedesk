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

/*Poke Ball: $5 Each
Great Ball: $10 Each
Super Potion: $10 Each
Hyper Potion: $20 Each
Bag: $2 Each
*/
export const priceMap = {
    "pokeball": 5,
    "greatball": 10,
    "superpotion": 10,
    "hyperpotion": 20,
    "bag": 2
}