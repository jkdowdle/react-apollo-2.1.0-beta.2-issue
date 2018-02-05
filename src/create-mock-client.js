import { ApolloLink, Observable } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'

function createMockLink(options) {
  return new ApolloLink(
    () =>
      new Observable(observer => {
        if (!options.fail) {
          // console.log('options.resolveWith', options.resolveWith)
          observer.next({
            data: { ...options.resolveWith }
          })
          observer.complete()
        } else {
          observer.error({ ...options.resolveWith })
        }
      })
  )
}

const link = options => createMockLink(options)

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === 'Viewer') {
      return obj.__typename
    }

    return `${obj.__typename}:${obj.id}`
  }
})

export default options =>
  new ApolloClient({
    link: link(options),
    cache
  })
