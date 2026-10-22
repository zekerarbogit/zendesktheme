# ZekerArbo Service: thema 5.0.0

## Basis en GitHub

Dit ontwerp staat op `codex/zekerarbo-enterprise`, gebaseerd op jullie commit `af12d05` en samengevoegd met Copenhagen **4.53.6**, commit `9adb1ed20f68049913bb4a224b5238e9917ba37a` (22 oktober 2026). De upstream-geschiedenis blijft onderdeel van de merge, zodat toekomstige updates vergelijkbaar blijven.

De GitHub-plugin is hier `DISABLED_BY_ADMIN`. Git/SSH naar `git@github.com:zekerarbogit/zendesktheme.git` is succesvol gecontroleerd. Hiervoor is geen plugin nodig. De bestaande werkmap en de lokale README-wijziging zijn behouden; ontwikkeling staat in een aparte beheerde werkmap.

Zendesk zelf ondersteunt ook importeren vanuit een GitHub-repository en specifieke branch. Zie https://support.zendesk.com/hc/en-us/articles/4408832476698. Publiceren blijft een aparte stap in Knowledge admin.

## Ontwerp en bediening

- Limegroen startvlak met zoekveld, voorbeeldvragen en een herkenbare ZekerArbo-foto.
- Doelgroepkaarten met volledige beschrijvingen en directe links naar onderwerpen.
- Uitgelichte artikelen vóór de ondersteunende merkcontent; deze lijst verschijnt alleen als artikelen in Zendesk uitgelicht zijn.
- Een zoekveld op binnenpagina’s, broodkruimels en een duidelijke terugweg naar alle onderwerpen.
- Beige zijbalk met geselecteerd artikel; mobiel uitklapbaar, met correcte knopstatus en Escape-bediening.
- Automatische inhoudsopgave bij minimaal twee h2/h3/h4-koppen; bestaande ankers blijven behouden. Koppen in details-blokken worden niet in de inhoudsopgave opgenomen.
- Nederlandse en Engelse teksten. Instelbare inhoud uit de bestaande configuratie blijft leidend.

De visuele richting volgt de brandguide van september 2024: lime #E9FC6F, beige #FAF7EC, diepgroen #27483D, luchtblauw #C8E0F4 en afgeronde vlakken. Brondocument: `/Users/elmerslot/Library/CloudStorage/OneDrive-Colbe/Documenten/ZekerArbo en Colbe Praktisch/ZekerArbo_Brandguide_Sept2024.pdf`, pagina’s 16 en 19–29.

Matter en Doyle worden niet meegeleverd. Er zijn optionele URL-instellingen voor gelicentieerde WOFF2-bestanden; zonder die bestanden blijft Plus Jakarta Sans de fallback. Controleer de webfontlicentie voordat je eigen bestanden toevoegt.

## Preview

`yarn install --immutable`, `yarn build`, `yarn preview`.

De lokale server op http://localhost:4173/preview/ rendert de echte header-, home-, categorie-, sectie-, artikel- en footertemplates, met drie bestaande voorbeeldartikelen. De CSS wordt voor lokaal gebruik uit dezelfde SCSS-bronnen met ingevulde instellingen opgebouwd. Zoeken filtert uitsluitend die drie voorbeelden. Er worden geen ticketacties uitgevoerd. Reageren en stemmen worden niet gesimuleerd.

De Zendesk-preview blijft nodig voor echte zoekresultaten, instant search, rechten, accountfuncties, React-formulieren, vertalingen van platformhelpers en geldigheid van alle Curlybars-helpers. De lokale Handlebars-renderer is geen Zendesk-validator.

## Voor import en publicatie

1. Importeer de ZIP als **nieuw, niet gepubliceerd thema** of importeer de ontwikkelbranch vanuit GitHub nadat die is gepusht.
2. Neem de huidige logo’s, eigen afbeeldingen en instellingen over uit het actieve thema. Bestaande instellingen kunnen standaardwaarden uit manifest.json overschrijven: zet daarom kleuren en de homekop bewust op de nieuwe waarden als je het voorbeeld wilt overnemen.
3. Controleer Nederlands en Engels, doelgroep-, sectie- en artikelpagina’s, echte zoekresultaten, mobiel menu, toetsenbord, aanmelden en formulieren met de toegangsrechten die jullie daadwerkelijk gebruiken.
4. Publiceer pas na inhoudelijke en visuele beoordeling. De live kennisbank is tijdens deze ontwikkeling niet aangepast.

## Apart inhoudelijk probleem

Op https://service.zekerarbo.nl/hc/nl/articles/36585639430162-Wachtwoord-opnieuw-instellen staan zichtbare GitBook-embedmarkeringen (`{% embed ... %}`) en tekstuele `<details>`-tags. Dit is in de live browser vastgesteld. Herstel deze in de artikelinhoud, met een echte demo-insluiting of link en geldige opmaak. Het thema gaat geen willekeurige tekst omzetten in uitvoerbare HTML. Controleer ook andere gemigreerde artikelen op deze patronen. Hiervoor zijn nog geen Zendesk-artikelen gewijzigd.

## Validatie

- Productiebuild geslaagd; gegenereerde bestanden uitsluitend via de build gemaakt.
- 78 testsuites, 677 tests geslaagd, inclusief drie nieuwe inhoudsopgavetests.
- ESLint: geen fouten, 37 waarschuwingen in de bestaande/upstream React-code.
- Browsercontrole: zoeken, artikel openen, inhoudsopgaveankers, mobiele menuknop en Nederlandse/Engelse routes.
