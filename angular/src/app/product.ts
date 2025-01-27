export enum Rarity {
    Common = 'common',
    Uncommon = 'uncommon',
    Rare = 'rare',
    Epic = 'epic',
    Legendary = 'legendary'
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
