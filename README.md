## Overview

Traveller-App is a Single Page Application which helps travellers to discover the world and learn more about their dream destinations!  
This Web site is based upon open-source Everbase GraphQL API (https://www.everbase.co/docs) and is built using TypeScript, React (CRA), MobX and Apollo Client.  
The aim here is to build a front-end app based upon hexagonal architecture, with MobX as state manager.

## Prerequisite

NPM (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Install

```
    git clone https://github.com/fredericvilcot/Traveller-App.git
    cd Traveller-App
    npm i
```

## Development launch

Servers listens to port 3000 and offers hot reload (watch mode)

```
    npm start
```

## Tests

Currently we use Jest (CRA built-in) to run Unit tests.

```
    npm test
```

## Production build

To build project just run:

```
    npm run build
```

## Docker

The docker image is based on an official nginx alpine.

### Build

There's no build args so it is very straightforward:

```
docker build -t Traveller-App .
```

### Usage

The nginx run over the http port by default:

```
docker run -ti --rm -p 8080:80 Traveller-App
```
