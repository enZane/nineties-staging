import type { ResolverProps } from '@composabase/sdk'
import { extractFragment } from '@composabase/sdk'
import { gql, client } from '@composabase/client'

export default async function Resolver({ operation, args }: ResolverProps) {
  const { take = 2 } = args
  const albumFragment = extractFragment(operation.selectionSet.typed, 'Album')
  const movieFragment = extractFragment(operation.selectionSet.typed, 'Movie')
  
  const query = gql(`
    ${albumFragment}
    ${movieFragment}
    query findAlbumsAndMovies ($take: Int!) {
      music {
        findManyAlbum (take: $take) {
          ...AlbumFragment
        }
      }
      movies {
        findManyMovie (take: $take) {
          ...MovieFragment
        }
      }
    }
  `)

  const { data, error } = await client.query(query, { take });

  if (error) {
    throw error
  }

  if (!data) {
    return []
  }

  const { music: { findManyAlbum }, movies: { findManyMovie } } = data

  return [...findManyAlbum, ...findManyMovie]
}
