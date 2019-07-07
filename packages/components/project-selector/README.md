# Project Selector

This is a simple building-block component that uses [react-select](https://react-select.com/home) to interact with the
iNaturalist API and provide a typeahead/autosuggest field for searching iNaturalist projects. See the following page for 
an example of how it can be used and the content of the data returned from the API.

Like all the components in the @inat-components, to work around CORS restrictions you will need to pass the URL of 
your the proxy endpoint that will actually interact with the iNat API. 

### Usage

```javascript
import ProjectSelector from '@inat-components/project-selector'; 
```

### Props



### Changelog

- `0.0.1` - July 7. Initial version.