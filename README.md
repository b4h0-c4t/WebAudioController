# Web Audio Controller
## About
This is music controller for miraibase audio server.

## Usage
### develop
1. clone this repository.
1. touch "src/env.js" and write env state.
```
  export default {
    API_URL: // your api server //
  }
```
1. npm i && npm start

### production
2. clone this repository.
2. touch "src/env.js" and write env state.
```
  export default {
    API_URL: // your api server //
  }
```
2. change property in package.json
```
  "hope": // add your homepage path //
```
2. npm i && npm build
2. move under build dir to your publish dir
