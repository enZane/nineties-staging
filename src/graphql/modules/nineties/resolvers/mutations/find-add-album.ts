import type { ResolverProps } from '@composabase/sdk'
import { extractQueryFields } from '@composabase/sdk'
import { gql, client } from '@composabase/client'

export default async function Resolver({ operation, args }: ResolverProps) {
  const { artistName, albumName } = args
  // Replace with a call to a Remote API to obtain the data
  const genres = ['Rock', 'Alternative Rock', 'Metal', 'Grunge', 'Trip hop']
  const { genre, year, label, members } = {
    genre: genres[Math.floor(Math.random() * genres.length)],
    year: Math.floor(Math.random() * 10) + 1990,
    label: 'Lorem Ipsum Records',
    members: ['Jone Doe', 'Jane Doe', 'Foo Bar', 'Baz Qux'],
  }
  const selectionSetFields = extractQueryFields(operation.selectionSet.typed)

  const query = gql(`
    query findFirstAlbum ($artistName: String!, $albumName: String!) {
      music {
        findFirstAlbum (where: 
          { 
            artist: { name: { equals: $artistName } }, 
            name: { equals: $albumName } 
          }
        ) {
          ${selectionSetFields}
        }
      }
    }
`)

  const { data: query_data, error: query_error } = await client.query(
    query,
    { artistName, albumName },
    {
      requestPolicy: 'network-only'
    }
  );

  if (query_error) {
    throw query_error
  }

  if (!query_data) {
    return []
  }

  const { music: { findFirstAlbum } } = query_data

  if (findFirstAlbum) {
    return findFirstAlbum
  }

  const mutation = gql(`
    mutation createOneAlbum (
        $artistName: String!,
        $albumName: String!,
        $genre: String!,
        $year: Int!,
        $label: String!,
        $members: String!
      ) {
      music {
        createOneAlbum (data: {
          artist: {
            connectOrCreate: {
              where: {
                name: $artistName,
              },
              create: {
                name: $artistName,
              }
            }
          },
          genre: {
            connectOrCreate: {
              where: {
                name: $genre,
              },
              create: {
                name: $genre,
              }
            }
          },
          label: $label,
          name: $albumName,
          year: $year,
          members: $members,
        }) {
          ${selectionSetFields}
        }
      }
    }`)

  const { data: mutation_data, error: mutation_error } = await client.mutation(mutation, {
    artistName,
    albumName,
    genre,
    year,
    label,
    members: members.join(', '),
  });

  if (mutation_error) {
    throw mutation_error
  }

  if (!mutation_data) {
    return []
  }

  const { music: { createOneAlbum } } = mutation_data

  if (createOneAlbum) {
    return createOneAlbum
  }

  return createOneAlbum
}
