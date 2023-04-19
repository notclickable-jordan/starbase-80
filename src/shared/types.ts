export interface IService {
	name: string;
	uri: string;

	description?: string;
	icon?: string;
}

export const FAKE_SERVICES: IService[] = [
	{
		name: "Calibre",
		uri: "https://calibre.starbase80.dev",
	},
	{
		name: "Gitea",
		uri: "https://git.starbase80.dev",
	},
];
