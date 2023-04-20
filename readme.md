# Starbase 80

A nice looking homepage for Docker containers or any other services and links.

No actual integration with Docker. Loads instantly.

If you make a change to the config JSON, restart this container and refresh.

Provide your own icons.

# Docker compose

```yaml
services:
    homepage:
        image: jordanroher/starbase-80
        ports:
            - 4173:4173
        volumes:
            - ./config.json:/app/src/config.json
            - ./icons:/app/public/icons # or wherever, JSON icon paths are relative to /app/public
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
