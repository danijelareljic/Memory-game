# Memory-game
Završni projekat za obuku Front-End web programiranje.

## Opis
Jednostavna igra koja testira korisnikovo pamćenje. Cilj je da se pronađu svi parovi sličica u što kraće vreme i sa što manje poteza. Korisnik bira nivo težine od kojeg zavisi koliko parova je potrebno pronaći.

## Struktura
Projekat se sastoji od jedne html stranice. U okviru nje se nalaze 4 diva koja se prikazuju u zavisnosti od situacije. Jedan predstavlja početni prozor, jedan za logiku igrice i dva modalna prozora.

Pokretanjem stranice prikazuje se prvi div. On sadrži dva dugmeta i jedan meni. Na dugme **PRAVILA** otvara se prvi modalni prozor sa osnovnim upustvima. U meniju se bira nivo težine. Po otvaranju selektovano je *Srednje*. Klikom na dugme **START** prvi div nestaje i poziva se funkcija `startGame`.

Na ekranu se pojavljuju kartice. Njihov broj zavisi od izabrane težine. U zavisnosti od selektovane vrednosti promenljiva `tezina` postaje element klase Mode sa parametrom 5, 10 ili 20.

`class Mode` čini jedan parametar **cards** koji predstavlja broj parova i dve metode `createArray` (vrši nasumičan izbor iz niza sličica) i `addClass` (određuje veličinu kartica).

Za mešanje kartica sam koristila modernu verziju Fisher-Yates algoritma. Kreće od poslednjeg elementa niza. Menja njegovu poziciju sa nasumično izabranim elementom ispred njega. Više informacija [ovde](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).

Klikom na karticu prikazuje se sličica. Za otvaranje kartica i prikazivanje sličica koristila sam jQuery efekte. Kada se otvore dve kartice vrši se poređenje sličica. Ukoliko su iste ostaju otvorene, a ako ne kartice se zatvaraju.

Iznad kartica se nalaze podaci o broju napravljenih poteza i vremenu koje je proteklo. Tu su i tri ikonice koje omogućavaju pokretanje igre iz početka, vraćanje na početni prozor i pauziranje igre.

Kada se pronađu sve karte otvara se drugi modalni prozor u kojem se čestita korisniku i prikazuju se podaci o ukupnom broju poteza i utrošenom vremenu. Njegovim zatvaranjem prikazuje se početni prozor.

## Korišćene tehnologije

- Html
- CSS
- JavaScript
- jQuery

#### Dodatno:

- [Google Fonts](https://fonts.google.com/)
- [Holy-Ravioli font](https://www.fontsquirrel.com/fonts/Holy-Ravioli)
- [icons8](https://icons8.com/icons)




