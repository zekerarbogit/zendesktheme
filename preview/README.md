# Lokale ZekerArbo-preview

```bash
yarn install --immutable
yarn build
yarn preview
```

Open http://localhost:4173/preview/ voor Nederlands en http://localhost:4173/hc/en-nl/ voor Engels. De preview rendert de echte thematemplates met voorbeelddata. Klik op een doelgroep, onderwerp of uitgelicht artikel. Zoeken werkt op de drie voorbeeldartikelen.

De volledige Zendesk-preview (`yarn zcli login -i`, daarna `yarn start`) blijft nodig voor Curlybars-validatie, live zoekresultaten, rechten en formulieren. Zie [de oplevernotities](../docs/enterprise-refresh.md).

De server bindt alleen aan 127.0.0.1 en serveert uitsluitend publieke thema-assets. De oude index.html en preview.js worden niet meer gebruikt door de server.
