export interface Pokemon {
	id: string;
	name: string;
	supertype: string;
	subtypes: string[];
	hp: string;
	types: string[];
	evolvesTo: string[];
	attacks: Attack[];
	weaknesses: Weakness[];
	resistances: Resistance[];
	retreatCost: string[];
	set: PokemonSet;
	number: string;
	artist: string;
	rarity: string;
	flavorText: string;
	nationalPokedexNumbers: number[];
	legalities: {
		unlimited: string;
		expanded: string;
	};
	images: {
		small: string;
		large: string;
	};
	tcgplayer: TcgPlayer;
	cardmarket: CardMarket;
}

export interface Attack {
	name: string;
	cost: string[];
	convertedEnergyCost: number;
	damage: string;
	text: string;
}

export interface Weakness {
	type: string;
	value: string;
}

export interface Resistance {
	type: string;
	value: string;
}

export interface PokemonSet {
	id: string;
	name: string;
	series: string;
	printedTotal: number;
	total: number;
	legalities: {
		unlimited: string;
		expanded: string;
	};
	ptcgoCode: string;
	releaseDate: string;
	updatedAt: string;
	images: {
		symbol: string;
		logo: string;
	};
}

export interface TcgPlayer {
	url: string;
	updatedAt: string;
	prices: {
		normal: Price;
		reverseHolofoil: Price;
	};
}

export interface Price {
	low: number;
	mid: number;
	high: number;
	market: number;
	directLow: number;
}

export interface CardMarket {
	url: string;
	updatedAt: string;
	prices: {
		averageSellPrice: number;
		lowPrice: number;
		trendPrice: number;
		germanProLow: number;
		suggestedPrice: number;
		reverseHoloSell: number;
		reverseHoloLow: number;
		reverseHoloTrend: number;
		lowPriceExPlus: number;
		avg1: number;
		avg7: number;
		avg30: number;
		reverseHoloAvg1: number;
		reverseHoloAvg7: number;
		reverseHoloAvg30: number;
	};
}
