import { ApolloClient, InMemoryCache } from '@apollo/client'

const clientUri = 'https://api.everbase.co/graphql?apikey=b3fa2b28-6356-4a88-87a4-01c885b38373'

export const Client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    uri: clientUri
})
