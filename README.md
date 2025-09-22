# Critic's Choice🍿

Critic's Choice allows you to find the very best of Netflix without the clutter. With filters and ways to sort that you won't find on Netflix, Critic's Choice is the best choice for those who want to watch only the best that Netflix has to offer.

Through the use of three different API's and a system to avoid rate-limiting involving a PostgreSQL database in the backend, Critic's Choice is able to provide access to lots of information on Netflix's US catalog of over 3000 movies. Also, the populate script allows for a full refresh of all the API's to stay up to date.

## Technology Stack:

Frontend: HTML, CSS, JS, React.js, TailwindCSS

Backend: Node.js, Express, PostgreSQL

## Instructions to run locally: 

Please note that to run locally you need multiple API keys, some of which may be rate limited.

1. Fill in the .env-template file with real keys into a .env file.

2. Run npm run populate while in the server folder to populate the database.
  
3. Run npm run dev in the server folder.

4. Run npm run dev in a separate terminal in the client folder.

## Future Plans:

- Enrich filter menu.
- Expand to more streaming services.
- Allow for user reviews and Critic's choice rankings.
- Filter by language.
- Beautify frontend!

## Credits:

Credit to: OMDB, TMDB, WatchMode APIs