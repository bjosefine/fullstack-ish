Länk: http://51.12.247.38/

Post funkar inte, men det är okej för det står att man bara behöver uppfylla G-kraven och jag har med GET :D

lägg in init.sql i docker:

stå i root och kör

- docker compose cp init.sql database:/tmp
  gå in på postgres
- winpty docker compose exec -it database bash
  kör sedan init filen genom att köra
- psql -U postgres -d "$dbname" -f /tmp/init.sql
