# Starbase 80

> DR T'ANA: (to Mariner) "You wanna goof around? Go work on Starbase 80!"<br />
> JET: "Damn, Starbase 80?!"<br />
> via [@EnterpriseExtra](https://twitter.com/EnterpriseExtra/status/1304161631451004928)

# About

<img src="./preview.jpg" alt="" />

A nice looking homepage for Docker containers or any services and links.

No actual integration with Docker. Loads instantly. No dark theme.

If you make a change to the config JSON, restart this container and refresh.

Provide your own icons.

# Docker compose

```yaml
services:
    homepage:
        image: jordanroher/starbase-80
        ports:
            - 4173:4173
        environment:
            - TITLE=My Homepage
        volumes:
            - ./config.json:/app/src/config.json
            - ./public/favicon.ico:/app/public/favicon.ico
            - ./public/logo.png:/app/public/logo.png
            - ./public/icons:/app/public/icons # or wherever, JSON icon paths are relative to /app/public
```

# config.json format

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
