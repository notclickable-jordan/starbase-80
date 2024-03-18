# Starbase 80

> DR T'ANA: (to Mariner) "You wanna goof around, go work on Starbase 80!"<br />
> JET: "Damn, Starbase 80?!"

# About

A nice looking homepage for Docker containers or any services and links.

No actual integration with Docker. Loads instantly. Dark mode follows your OS.

If you make a change to the config JSON, restart this container and refresh.

Inspired by [Ben Phelps' Homepage](https://gethomepage.dev/) and [Umbrel](https://umbrel.com/). Dedicated to [Star Trek: Lower Decks](https://www.paramountplus.com/shows/star-trek-lower-decks/).

# Docker and source code

-   [Docker image](https://hub.docker.com/r/jordanroher/starbase-80)
-   [Source code on GitHub](https://github.com/notclickable-jordan/starbase-80)

# Live demo

-   [Starbase 80](https://www.starbase80.dev/)

# Preview

<img src="./preview.jpg" alt="Light mode" />

<br />

<img src="./preview-dark.jpg" alt="Dark mode" />

# Change history

## 1.5.1

-   Changed links to be on the entire service object
-   Added underline option

## 1.5.0

-   Fixed dark mode manual override

## 1.4.2

-   Added `apple-touch-icon-precomposed` link

## 1.4.0

-   Rewrote the entire application to not use React. Now it's just a Node application that emits static HTML.
-   Removed lots of packages

## 1.3.0

-   Removed all JavaScript as part of the build step. The image will be slightly larger and take longer to start up and shut down, but the page will be even lighter.

## 1.2.0

-   Moved `config.json` bind mount destination to `/app/src/config/config.json` for improved Portainer and volume support. The previous bind mount location will continue to work, but we recommend updating your bind mounts.

# Docker

## Sample Docker compose

```yaml
services:
    starbase80:
        image: jordanroher/starbase-80
        ports:
            - 80:4173
        environment:
            - TITLE=Starbase 80
            - LOGO=/starbase80.jpg
        volumes:
            - ./config.json:/app/src/config/config.json
            - ./public/favicon.ico:/app/public/favicon.ico
            - ./public/logo.png:/app/public/logo.png
            - ./public/icons:/app/public/icons
```

## Environment variables

| Variable    | Default                | Notes                                                                                           |
| ----------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| TITLE       | My Website             | Set to TITLE= to hide the title                                                                 |
| LOGO        | /logo.png              | Set to LOGO= to hide the logo                                                                   |
| HEADER      | true                   | Set to false to hide the title and logo                                                         |
| HEADERLINE  | true                   | Set to false to turn off the header border line                                                 |
| CATEGORIES  | normal                 | Set to "small" for smaller, uppercase category labels                                           |
| BGCOLOR     | theme(colors.slate.50) | Background color for light mode. Set to any hex color or Tailwind color using the theme syntax. |
| BGCOLORDARK | theme(colors.gray.950) | Background color for dark mode. Set to any hex color or Tailwind color using the theme syntax.  |
| NEWWINDOW   | true                   | Set to false to not have links open in a new window                                             |
| THEME       | auto                   | Set to "auto", or "dark" to force a display mode (e.g. dark mode)                               |
| HOVER       | none                   | Set to "underline" for an underline effect on titles when hovering/focusing on that service     |

## Volumes (bind mounts)

| Path                        | Required | Notes                                                                         |
| --------------------------- | -------- | ----------------------------------------------------------------------------- |
| /app/src/config/config.json | true     | Configuration with list of sites and links                                    |
| /app/public/favicon.ico     | false    | Website favicon                                                               |
| /app/public/logo.png        | false    | Logo in the header                                                            |
| /app/public/icons           | false    | Or wherever you want to put them, JSON icon paths are relative to /app/public |

# Configuration

## Sample config.json

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
		"bubble": true,
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
				"icon": "home-assistant",
				"iconBubble": false
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

## Category variables

| Name     | Default | Required | Notes                               |
| -------- | ------- | -------- | ----------------------------------- |
| category |         | false    | Displays above the list of services |
| bubble   | false   | false    | Shows a bubble around category      |
| services |         | true     | Array of services                   |

## Service variables

| Name        | Default | Required | Notes                                                                                                                                                                                           |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        |         | true     | Title of service                                                                                                                                                                                |
| uri         |         | true     | Hyperlink to resource                                                                                                                                                                           |
| description |         | false    | 2-3 words which appear below the title                                                                                                                                                          |
| icon        |         | false    | Relative URI, absolute URI, service name ([Dashboard icon](https://github.com/walkxcode/dashboard-icons)) or `mdi-`service name ([Material Design icon](https://icon-sets.iconify.design/mdi/)) |
| iconBG      |         | false    | Background color for icons. Hex code or [Tailwind color](https://tailwindcss.com/docs/background-color) (do not prefix with `bg-`).                                                             |
| iconColor   |         | false    | Only used as the fill color for Material Design icons. Hex code or [Tailwind color](https://tailwindcss.com/docs/background-color) (do not prefix with `bg-`).                                  |
| iconBubble  | true    | false    | If `false` the bubble and shadow are removed from the icon                                                                                                                                      |
| iconAspect  | square  | false    | Set to `"width"` or `"height"` to constrain the icon to the width or height of the icon, respectively                                                                                           |
| newWindow   |         | false    | Set to `true` or `false` to override the environment variable `NEWWINDOW` for this service                                                                                                      |

# Icons

## Volume / bind mount

Create a volume or bind mount to a subfolder of `/app/public` and specify a relative path.

```bash
# Your folder
compose.yml
- icons
  - jellyfin.jpg
  - ghost.jpg
  - etc

# Bind mount
./icons:/app/public/icons

# Icon in config.json
"icon": "/icons/jellyfin.jpg"
```

## Dashboard icons

Use [Dashboard icons](https://github.com/walkxcode/dashboard-icons) by specifying a name without any prefix.

```bash
# Icon in config.json
"icon": "jellyfin"
```

## Material design

Use any [Material Design icon](https://icon-sets.iconify.design/mdi/) by prefixing the name with `mdi-`.

Fill the icon by providing an "iconColor."

Use "black" or "white" for those colors.

```bash
# Icon in config.json
"icon": "mdi-cloud",
"iconColor": "black"
```
