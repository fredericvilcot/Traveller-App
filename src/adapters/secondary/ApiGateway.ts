import type { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const clientUri = 'https://api.everbase.co/graphql?apikey=b3fa2b28-6356-4a88-87a4-01c885b38373'

export default class ApiGateway {
    protected client(): ApolloClient<NormalizedCacheObject> {
        return new ApolloClient({
            connectToDevTools: true,
            cache: new InMemoryCache(),
            uri: clientUri
        })
    }
}
