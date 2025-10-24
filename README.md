### How to run:
1. Run `yarn` to install `node_modules` as usual;
2. Run `yarn generate-poke-data` to create a `data.json` file in the directory;
3. Run `yarn dev`.

## Project concept:

### Nextjs was used in order to achieve two things:
1. Generate the first page at build time and serve as a static page, without firing a request from RTK Query, which would instead be initiated with the first page loaded, and thus, having no loading at the first landing. This was NOT achieved due to time limitations.
2. Create a 'search by text' endpoint. Pokeapi.co does not have a 'search by text' endpoint or feature, so I decided to create my own via the `pokemon-list` endpoint. The concept of this endpoint is to simulate a database index and uses it to serve data. This works very well because of the 'cold' nature of the data(new pokemon are added only once a year or so) and the fact that all we have is GET methods, so this data is quite stale, making it safe to index infrequently.

## Challenges:
- This was my first time using SSR logic with RTK Query specifically and couldn't wrap my head around why is it so hard to pass a 'initial state' to the query. I understand the concept of RTK Query aiming to be a single source of truth, but i would have saved a me lot of headache if it just allowed me to access its state like a regular reducer.
- This was my first time using(or trying to use) Jest with Next, and i severely underestimated how much of a pain would be to setup these tools together. I followed Next's and Jest's docs but still got some errors and gave up to focus on other things. 

## Conclusion
Overall a fun project, I'd love to come back to this in the future and implement some ideas that didn't work. There's much room for improvement in design, UX and code quality but that will have to wait. Just wish i had more time/focused on my strength during development to make a better project in the end.