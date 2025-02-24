import { bagItems, priceMap } from "./collections";

// The BagItem class:
export class BagItem {
    public item: string;      // "pokeball" | "greatball" | "superpotion" | "hyperpotion"
    public quantity: number;  // 1..10
    public hasBag: boolean;

    constructor(item: string, quantity: number, hasBag: boolean) {
        this.item = item;
        this.quantity = quantity;
        this.hasBag = hasBag;
    }

    // 1. displayLabel: For example "1 Poke Ball" or "3 Super Potions"
    get displayLabel(): string {
        // find the user-friendly label from bagItems
        const label = bagItems.find((b) => b.value === this.item)?.label ?? this.item;

        // naive pluralization by just appending "s" if quantity > 1
        const suffix = this.quantity > 1 ? "s" : "";
        return `${this.quantity} ${label}${suffix}`;
    }

    // 2. cost: calculates total cost based on priceMap and bag cost
    get cost(): number {
        const baseCost = priceMap[this.item] ?? 0;
        const bagCost = this.hasBag ? priceMap.bag : 0;

        return baseCost * this.quantity + bagCost;
    }
}