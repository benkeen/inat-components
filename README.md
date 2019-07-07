# inat-components

Tinkering with inaturalist.com data to create some general-purpose React components. Depending on how things go, I'll 
eventually publish the components to npm (I've reserved the `@inat-components` org name to group them), but until then
they're only accessible via this repo. 

This is a lerna monorepo running a storybook instance that imports the various components.

Because all the components require the inaturalist API, a server-side component is needed to act as a proxy to get around
CORS issues. This repo runs a simple express instance that offers a few endpoints and I'll add a PHP version. I'll 
 

### Components

- `<SpeciesSelector />` - a typeahead component to search and select a species or other taxon.
- `<UserSelector />` - a typeahead component to search for users.
- `<ProjectSelector />` - another typeahead component to search for projects.
- `<ActivityChart />` - a visualization component built atop (recharts)[http://recharts.org] to visualize a single user/project
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