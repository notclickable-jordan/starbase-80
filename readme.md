# Starbase 80

> DR T'ANA: (to Mariner) "You wanna goof around? Go work on Starbase 80!"<br />
> JET: "Damn, Starbase 80?!"<br />
> via [@EnterpriseExtra](https://twitter.com/EnterpriseExtra/status/1304161631451004928)

# About

A nice looking homepage for Docker containers or any services and links.

No actual integration with Docker. Loads instantly. No dark theme.

If you make a change to the config JSON, restart this container and refresh.

Inspired by [Ben Phelps' Homepage](https://gethomepage.dev/) and [Umbrel](https://umbrel.com/).

<img src="./preview.jpg" alt="" />

# Icons

## Options

-   Set a background by providing an "iconBG" from the [list of Tailwind colors](https://tailwindcss.com/docs/background-color). Do not prefix with "bg-".
-   Turn off the bubble and shadow by setting `"iconBubble": false`.
-   Turn off background color by setting `"iconBG": "transparent"`.
-   Hide the icon entirely by setting `"icon": ""`.

```bash
# Specify an icon in config.json
"icon": "/icons/jellyfin.jpg",
"iconColor": "blue-500", # optional, defaults to a contrasting color
"iconBG": "gray-200", # optional, defaults to a complementary color
"iconBubble": false, # optional, defaults to true
```

## Use your own

Create a volume or bind mount to a subfolder of `/app/public` and specify a relative path.

```bash
# Your folder
compose.yml
- icons
  - jellyfin.jpg
  - ghost.jpg

# Bind mount
./icons:/app/public/icons

# Specify an icon in config.json
"icon": "/icons/jellyfin.jpg"
```

## Dashboard icons

Use [Dashboard icons](https://github.com/walkxcode/dashboard-icons) by specifying a name without any prefix.

```bash
# Specify an icon in config.json
"icon": "jellyfin"
```

## Material design

Use any [Material Design icon](https://icon-sets.iconify.design/mdi/) by prefixing the name with `mdi-`.

Fill the icon by providing an "iconColor" from the [list of Tailwind colors](https://tailwindcss.com/docs/background-color). Do not prefix with "bg-".

```bash
# Specify an icon in config.json
"icon": "mdi-cloud"
```

# Docker compose

```yaml
services:
    homepage:
        image: jordanroher/starbase-80
        ports:
            - 4173:4173
        environment:
            - TITLE=Starbase 80 # defaults to "My Website"
            - LOGO=/starbase80.jpg # defaults to /logo.png
			- HEADER=true # defaults to true, set to false to hide the header (title and logo)
        volumes:
            - ./config.json:/app/src/config.json # required
            - ./public/favicon.ico:/app/public/favicon.ico # optional
            - ./public/logo.png:/app/public/logo.png # optional, or you can reference something in /icons
            - ./public/icons:/app/public/icons # or wherever, JSON icon paths are relative to /app/public
```

# config.json format

## Categories

Can have as many categories as you like.

-   **category**: Title, optional, displays above services
-   **services**: Array of services

## Service

-   **name**: Name, required
-   **uri**: Hyperlink, required
-   **description**: 2-3 words, optional
-   **icon**: relative URI, absolute URI, service name ([Dashboard icon](https://github.com/walkxcode/dashboard-icons)) or `mdi-`service name ([Material Design icon](https://icon-sets.iconify.design/mdi/))

## Template

```json
[
	{
		"category": "Category name",
		"services": [
			{
				"name": "My App",
				"uri": "https://website.com",
				"description": "Fun site",
				"icon": "/icons/myapp.png"
			}
		]
	}
]
```

## Example

```json
[
	{
		"category": "Services",
		"services": [
			{
				"name": "Archivebox",
				"uri": "https://archivebox.mywebsite.com",
				"description": "Backup webpages",
				"icon": "/icons/archivebox.jpg"
			},
			{
				"name": "Authelia",
				"uri": "https://auth.mywebsite.com",
				"description": "Authentication",
				"icon": "/icons/authelia.png"
			},
			{
				"name": "Calibre",
				"uri": "https://calibre.mywebsite.com",
				"description": "eBook library",
				"icon": "/icons/calibre.png"
			}
		]
	},
	{
		"category": "Devices",
		"services": [
			{
				"name": "Router",
				"uri": "http://192.168.1.1/",
				"description": "Netgear Orbi",
				"icon": "/icons/router.png"
			},
			{
				"name": "Home Assistant",
				"uri": "http://homeassistant.local:8123/",
				"description": "Home automation",
				"icon": "/icons/home-assistant.svg"
			},
			{
				"name": "Synology",
				"uri": "http://synology:5000",
				"description": "Network storage",
				"icon": "/icons/synology.png"
			}
		]
	}
]
```
