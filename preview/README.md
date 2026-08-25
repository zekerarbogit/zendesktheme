# Lokale ZekerArbo-preview

Bouw eerst de gegenereerde theme-assets en start daarna de eenvoudige lokale preview:

```bash
yarn build
yarn preview
```

Open vervolgens [http://localhost:4173/preview/](http://localhost:4173/preview/). De pagina gebruikt dezelfde `gb-*`-klassen als de Zendesk-homepage, met vaste voorbeelddata voor de categoriekaarten, artikelen, beeldband en Legal-footer.

Gebruik `?locale=en-nl` voor de Engelse variant. De headeracties zijn standaard verborgen, net als de huidige themeconfiguratie; voeg `&headerActions=true` toe om de optionele knoppen te controleren. De echte Zendesk-preview blijft nodig om Curlybars-data en navigatiegedrag te controleren.
