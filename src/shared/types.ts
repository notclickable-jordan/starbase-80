export interface IServiceCatalog {
	category: string;
	services: IService[];
}

export interface IService {
	name: string;
	uri: string;

	description?: string;
	icon?: string;
	iconColor?: string;
	iconBG?: string;
	iconBubble?: boolean;
}
