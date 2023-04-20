export interface IServiceCatalog {
	category: string;
	services: IService[];
}

export interface IService {
	name: string;
	uri: string;

	description?: string;
	icon?: IIcon;
}

export interface IIcon {
	href: string;
	title?: string;
	alt?: string;
}
