# Inneklimaeksperten – Returservice

Enkel returportal for kunder av Inneklimaeksperten, bygget på Next.js. Kunden
slår opp ordrenummeret sitt, velger hvilke varer som skal returneres, fyller
ut kontaktinfo, og får en returetikett generert automatisk via Webshipper.
Returen registreres samtidig i Ongoing WMS slik at lageret ser den komme.

## Oppsett

1. `npm install`
2. Kopier `.env.example` til `.env.local` og fyll ut verdiene (se under)
3. `npm run dev`

## Miljøvariabler

Se `.env.example` for full liste. Viktigst:

- `ONGOING_GOODS_OWNER_ID=124` (Inneklimaeksperten sin vareeier-ID i Ongoing)
- `ONGOING_USERNAME` / `ONGOING_PASSWORD` – den vanlige Ongoing-brukeren
  "API-bruker" (bruker-ID 115). Sjekk at "Inneklimaeksperten" er huket av i
  "Alle vareeiere"-lista på denne brukeren i Ongoing-admin, OG at den egne
  "API-tilgang"-bryteren på selve vareeier-oppføringen for
  "Inneklimaeksperten" er skrudd på (se driftsnotatet under - dette var en
  overraskende fallgruve for Puer Fons, den første vareeieren der dette ble
  oppdaget).
- `WEBSHIPPER_ACCESS_TOKEN` – samme Webshipper-konto (`spring-nova-immitec`)
  som de andre vareeierne, `WEBSHIPPER_CARRIER_ID` og `WEBSHIPPER_SERVICE_CODE`
  er allerede fylt ut i `.env.example` med de delte verdiene (1 / 9300)
- `WAREHOUSE_RETURN_*` – adressen varene skal returneres til (samme lager som
  for øvrige vareeiere, kun c/o-navnet er endret til "Inneklimaeksperten")

## Driftsnotat

Denne løsningen er bygget på samme mal som Nesco/Vitae Vital/Almea/Puer Fons,
tilpasset Inneklimaeksperten med goodsOwnerId **124** og en mørk skoggrønn/
cream-profil basert på inneklimaeksperten.no. Se prosjektet
"Returløsning - Ongoing kunder" i Claude for felles arkitekturbeslutninger og
kjente fallgruver, blant annet:

- Ongoing har en egen, vareeier-spesifikk "API-tilgang"-bryter (utover den
  vanlige "Alle vareeiere"-lista på API-brukeren) som må skrus på for hver ny
  vareeier, ellers svarer Ongoing med 403 Forbidden.
- Ongoing sine artikkelmål (lengde/bredde/høyde) har en ubekreftet enhet -
  `api/return/route.ts` har derfor en innebygd fornuftighetssjekk som faller
  tilbake på standardmålene hvis et beregnet mål/vekt blir urealistisk stort,
  i stedet for å sende feil tall til Webshipper (lagt inn fra start her,
  basert på en feil som ble oppdaget og fikset for Puer Fons (Ny)).

## Deploy

Deploy via Vercel. Husk å sette "Framework Preset" til "Next.js" manuelt
hvis det ikke blir satt automatisk.
