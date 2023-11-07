# DT162G - Moment 3.3
## Amanda Björk
### Om repot
I projektet används Node.js och Express för att hantera data från en databas i MongoDB. Kurserna skrivs ut i en tabell i index.html via HTTP-metoden `GET`. Genom att klicka på soptunnan för varje kurs tas denna bort från JSON-filen via HTTP-metoden `DELETE`. Vid klick på ikonen för uppdatera fylls formuläret i och kursen kan uppdateras med HTTP-metoden `PUT` vid klick på knappen. För att lägga till en kurs fylls formuläret i och vid klick på knappen läggs kursen till med HTTP-metoden `POST`. Id skapas då automatiskt för kursen. CORS tillåts för att källor.

### Användning
- Klona repot med `https://github.com/abbelot/moment3.3.git`. 
- Initiera projektet med kommandot `npm init` för att återinstallera node_modules. 
- Ange kommando `npm run dev` för att starta servern på port 3000 (script är deklarerat i package.json).
- Starta Live Server för index.html för att visa HTML-sidan och konsumera webbtjänsten.
 
### Endpoints
- Hämta alla kurser: `/courses`
- Hämta en kurs: `/courses/${id}`
- Lägga till en kurs: `/courses`
- Uppdatera en kurs: `/courses/${id}`
- Radera en kurs: `/courses/${id}`