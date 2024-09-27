import { createModule } from "@composabase/sdk"

const nineties = () => {
  const module = createModule('nineties')

  module.union('AlbumAndMovieUnion', ['Album', 'Movie'])

  module.query('findAlbumsAndMovies', {
    definition: {
      type: module.list(module.union('AlbumAndMovieUnion')).optional(),
      args: {
        take: module.int().optional(),
      }
    },
    resolver: 'albums-and-movies',
  })

  module.mutation('findOrCreateAlbum', {
    definition: {
      type: module.scalar('Album'),
      args: {
        artistName: module.string(),
        albumName: module.string(),
      },
    },
    resolver: 'find-add-album',
  })

  module.type('Album', {
    calculated: {
      definition: {
        selectionSet: `{
            id
            name
            artist {
              id
              name
            }
          }`,
        type: module.string(),
      },
      resolver: 'calculated',
    },
  })

  module.type('Movie', {
    imdb: {
      definition: {
        selectionSet: `{
          id
          title
          genre {
            name
          }
        }`,
        type: module.string(),
      },
      resolver: 'imdb',
    },
  })

  return module
}

export default nineties()
