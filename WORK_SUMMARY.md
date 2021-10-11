## Overview

This SPA is built mainly using :

-   TypeScript
-   React (Create React App)
-   MobX
-   Apollo Client / GraphQL
-   SasS
-   Material-UI

During development, the emphasis was particularly placed on the quality of the code and this by implementing a hexagonal architecture (ports / adapters).
The main aim of this architecture is to fully dissociate the core of the application (domain / logic ) from the UI (framework).
This brings many benefits in terms of (mainly):

-   Readibility
-   Separation of concerns
-   Testability
-   Scalability

The consequences are therefore (mainly):

-   UI becomes a detail of implementation
-   App does not depend on the framework
-   App does not depend on the API architecture (REST, SOAP, GraphQL, ...)
-   UI components are as dumb as they can !

## Development stages

Below are the main stages of the development of the application:

1. Initialize project using Create React App which provides a boilerplate using natively TypeScript, React, Babel, Jest, Webpack, ...
2. Clean unused files and init hexagonal architecture (adapters / domain)
3. Add ESlint custom configuration (https://www.npmjs.com/package/@ubleam/eslint-config) combined to Prettier one to ensure hight linting and formatting quality
4. Add GraphQL and Apollo client packages to start developing secondary adapters
5. Add and implement graphql fragment code generator to provide auto-generated TypeScript Unions and interfaces to securize input / payload types
6. Develop right adapter gateways (country + city) that implements dedicated ports interfaces and maps data
7. Add graphql queries in separated files (using graphql fragments)
8. Implement domain model that must be not the same as API model to avoid strong coupling with API
9. Implement domain store (MobX) that holds observable data returned and mapped by the gateway using dependency injection to avoid coupling and ensure high testability
10. Create and export store instance via React Context using dependency injection for the gateways
11. Create a custom React hook to consume context
12. Write tests by adding InMemoryGateways and inject them into new store instance. We try to test behaviours and no isolated methods.
13. Implement UI in primary (left) adapter :
    1. Create a single view (home)
    2. Add main style thanks to SasS
    3. Add components (carousel, search card, leaflet map and informations card) and style them in dedicated .scss files
14. Add gitlab CI and 3 stages : build / test / docker-build
15. Add docker configuration to build image docker
16. Take the time to read the code and test the CI

## Improvements

This project is only at its beginning and there are a lot of ways to improve it due to the lack of time to implement everything at once.
Here are the main axes of improvement :

-   Add explicit use cases in domain part to make the only means of communication between primary adapter (UI) and domain.
-   Modify tests to strictly follow use cases (BDD)
-   Add view models (or better known as redux selectors) to derive / compute states from the store
-   Improve UI / UX and user features ! ==> UI / UX takes a long time to meet user needs, it would be better to make mockups based on real user needs and then implement them easily thanks to hexagonal architecture!

## Limitations

-   Very poor API's (few data exposed, no explicit schema, weak scalars, etc...)
