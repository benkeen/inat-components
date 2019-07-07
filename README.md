# inat-components

This repo is for tinkering with inaturalist.com data to create some general-purpose React components. Depending on how
things go, I'll eventually publish the components to npm (I've reserved the `@inat-components` org name to group them),
but until then they're only accessible via this repo. 

This is a [lerna monorepo](https://lerna.js.org/) running a storybook instance that imports the various components. If
that sounds scary, don't worry. It's actually super cool & simple once you see what it does and how it works. Basically 
it makes my job a hundred times easier by housing everything in a single place and I can publish everything to npm in
one go. Plus I get a nice easy dev environment with hot-reloading hooked up that consumes the components as if they were 
already housed in npm, warding against daft errors in the way I'm packing them up (rollup, btw).

Because all the components require making requests the inaturalist API for the actual source data, some server-side code is
required to act as a proxy to get around CORS. For the sake of this repo, I boot up a simple express instance and use
that to proxy all requests to iNaturalist. I deliberately kept that particular layer as thin as possible (no data
manipulation) so it should be simple to re-implement in whatever language you need.  

I'll also be adding a PHP version for all components.


### Components

At this point I'm working on the following components (all incomplete). The Storybook UI will show off a few scenarios
and document the various props & features the components offer.

- `<SpeciesSelector />` - a typeahead component to search and select a species or other taxon.
- `<UserSelector />` - a typeahead component to search for users.
- `<ProjectSelector />` - another typeahead component to search for projects.
- `<ActivityChart />` - a visualization component built atop [recharts](http://recharts.org) to visualize a single user/project
observation data.


### Installation 

First, clone this repo then run the following commands.

```
npm install
npm install lerna -g
lerna bootstrap
npm run start
```

### License 

MIT.