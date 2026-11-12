# Oppsett av returservice for Inneklimaeksperten

Dette er en komplett, kjørbar kopi av returløsningen (samme kodebase som
Nesco/Vitae Vital/Almea/Puer Fons), satt opp med goodsOwnerId **124**
("Inneklimaeksperten") og en egen mørk skoggrønn/cream-profil basert på
inneklimaeksperten.no.

## 1. Opprett GitHub-repo

1. Opprett et nytt, tomt repo på GitHub, f.eks. `inneklimaeksperten-returservice`.
2. Last opp alt innholdet i denne zip-filen til repoet (dra inn *innholdet*
   i mappen, ikke selve `returservice-inneklimaeksperten`-mappen - ellers
   havner alt i en undermappe, se merknad i prosjektnotatet om det).

## 2. Opprett Vercel-prosjekt

1. Nytt prosjekt i Vercel, koblet til det nye GitHub-repoet.
2. Sett **Framework Preset til "Next.js" manuelt** (den settes ofte feil til
   "Other" automatisk).
3. Legg inn miljøvariablene under "Environment Variables" (se punkt 3).

## 3. Miljøvariabler i Vercel

De fleste verdiene er allerede fylt ut i `.env.example` siden de er delt med
de andre vareeierne. Dette må du fylle inn selv (de er hemmelige, så de
ligger ikke i koden):

- `ONGOING_USERNAME` = `API-bruker`
- `ONGOING_PASSWORD` = (samme passord som de andre vareeierne bruker på
  bruker 115 i Ongoing)
- `WEBSHIPPER_ACCESS_TOKEN` = (samme token som de andre vareeierne bruker)

Alt annet (warehouse, goodsOwnerId=124, carrier-ID, servicekode, lageradresse
med "c/o Inneklimaeksperten") er allerede riktig fylt ut i `.env.example` -
kopier verdiene derfra rett inn i Vercel.

## 4. Sjekk tilgang i Ongoing (TO ting å sjekke, ikke bare én)

1. Gå til bruker-ID 115 ("API-bruker") i Ongoing-admin, og sjekk at
   **"Inneklimaeksperten" er huket av** i "Alle vareeiere"-lista på den
   brukeren.
2. **Viktig lærdom fra Puer Fons-oppsettet:** det finnes i tillegg en egen
   "API-tilgang"-bryter PÅ SELVE vareeier-oppføringen for
   "Inneklimaeksperten" i Ongoing-admin (ikke på brukeren, ikke i "API for
   vareeiere"-lista). Denne må også skrus på - den er avslått som default for
   en helt ny vareeier og gir en vedvarende `403 Forbidden` helt til den
   skrus på. Sjekk denne FØRST hvis du får 403 ved testing, det sparer en
   del feilsøking.

## 5. Deploy og test

1. Deploy (skjer automatisk når du pusher til GitHub).
2. Test FULL flyt med et reelt eller testordrenummer for goodsOwnerId 124 -
   ordreoppslag, varevalg, kontaktinfo, og at en etikett faktisk blir
   generert - før lenken deles med kunder. Test gjerne med en artikkel som
   har mål (lengde/bredde/høyde) satt i Ongoing, siden en tidligere vareeier
   (Puer Fons Ny) traff en feil der nettopp dette var årsaken - denne koden
   har allerede fått fiksen for det (se README).

Si ifra når det er oppe, så tester jeg flyten for deg på samme måte som for
de andre vareeierne.
