![image](https://upload.wikimedia.org/wikipedia/commons/b/b7/A24_logo.svg)

# A24 Movies!

![web-logo](https://i.imgur.com/yiJLJcA.png)
<br>
<br>
It's an up to date of all movies produced by A24, with nice sorting and ranking!

## Tech

Basically i have a daily CRON job (hosted on [val.town](val.town)) that fetches the page data from a24 films webpage,
(in order to not spam requests to them everytime a user uses this app), and stores it on S3.

I fetch the page from s3, and use `xmldom` to parse the contents and grab the titles, then I use the tmbd api to get all the data for each movies.

I then use OMDB api to grab imdb metadata from the tmdb search results, and cache it for 2 days.

## Stack

- SvelteKit
- TMDB API
- OMDB API
- Upstash Redis
- Val.town (CRON job)
- S3
- Vercel
