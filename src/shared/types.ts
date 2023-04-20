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

export const FAKE_SERVICES: IService[] = [
	{
		name: "Archivebox",
		uri: "https://archivebox.starbase80.dev",
		description: "Backup webpages",
		icon: {
			href: "/icons/archivebox.jpg",
		},
	},
	{
		name: "Calibre",
		uri: "https://calibre.starbase80.dev",
		description: "eBook library",
	},
	{
		name: "Gitea",
		uri: "https://git.starbase80.dev",
		description: "Code hosting",
		icon: {
			href: "/icons/gitea.png",
		},
	},
];
