export enum Rarity {
    Common = 'Commun',
    Uncommon = 'Non-Commun',
    Rare = 'Rare',
    Epic = 'Epique',
    Legendary = 'Légendaire'
}

export interface Product {
    id: number;
    name: string;
    createdDate: Date;
    isFavorite: boolean;
    rarity: Rarity;
    price: number;
    img: string;
}
