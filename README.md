# Composabase Local Development - 90's Data Library template

Welcome to the 90's Data Library template for the Composabase local playground. This guide will help you get started with the setup and usage of this on your local environment.

## Getting Started

### Prerequisites

Before you begin, make sure you have cloned your project repository.

HTTPS:
```bash
git clone https://github.com/enZane/nineties-staging.git
```

SSH:
```bash
git clone git@github.com:enZane/nineties-staging.git
```

Next, install the project dependencies using one of the following commands:

```bash
yarn
```

or

```bash
npm install
```

To interact with this template, you need to use the [Composabase CLI](https://www.npmjs.com/package/@composabase/cli), which should be installed globally. To install it, run one of the following commands:

```bash
yarn global add @composabase/cli
```

or

```bash
npm install -g @composabase/cli
```

### Logging In

As the first step, you will need to login to the Composabase Dashboard in your terminal. Use the following command:

```bash
composabase login
```

### Fetching Environment Variables

After logging in, next step will fetch the necessary environment variables from the Composabase Dashboard using this command:

```bash
composabase pull:env
```

#### Pull GraphQL schema

Pull GraphQL schema from your Composabase project. This command will create the GraphQL schema file in the @composabase/client directory.

```bash
composabase pull:schema
```

This step ensures that your local GraphQL schema definitions are up-to-date.

### Starting the Local Playground

Finally, you can start the local development environment using the following command:

```bash
yarn start
```

or

```bash
npm run start
```

This command launches the development server and allows you to begin working with your GraphQL queries and resolvers locally.

### Testing the Local Payground

If everything went well, you should be able to access the Composabase GraphQL Playground at [http://localhost:4000](http://localhost:4000).

As part of this template we added some custom resolvers. You can find them in the `src/graphql` folder.

#### The `hello` query

This query returns a simple string and can recieve 2 optional arguments:

- `name` - a string
- `isImportant` - a boolean

You can test it by executing the following query in the GraphQL Playground:

```graphql
query hello {
  hello(name: "John Doe", isImportant: true)
}
```

And will answer with the following response:

```json
{
  "data": {
    "hello": "Hello John Doe!"
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/schema.ts](src/graphql/schema.ts)
- Resolver: [src/graphql/resolvers/queries/hello.ts](src/graphql/resolvers/queries/hello.ts)

#### The `helloCustom` query

This query returns a simple string and can recieve 1 optional arguments:

- `input` - composed by two optional properties
  - `name` - a string
  - `isImportant` - a boolean

You can test it by executing the following query in the GraphQL Playground:

```graphql
query helloCustom {
  helloCustom(input: { name: "Composabase", isImportant: true })
}
```

And will answer with the following response:

```json
{
  "data": {
    "helloCustom": "Hello Composabase!"
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/hello-custom/index.ts](src/graphql/modules/hello-custom/index.ts)
- Resolver: [src/graphql/modules/hello-custom/resolvers/queries/hello.ts](src/graphql/modules/hello-custom/resolvers/queries/hello.ts)

#### The `findAlbumsAndMovies` query

This query returns an array of `AlbumAndMovieUnion` objects. This `union` can contain `Album` and/or `Movie` types.

You can test it by executing the following query in the GraphQL Playground:

```graphql
query findAlbumsAndMovies {
  findAlbumsAndMovies {
    ... on Album {
      id
      name
      artist {
        id
        name
      }
    }
    ... on Movie {
      id
      title
      genre {
        name
      }
    }
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/nineties/index.ts](src/graphql/modules/nineties/index.ts)
- Resolver: [src/graphql/modules/nineties/resolvers/queries/albums-and-movies.ts](src/graphql/modules/nineties/resolvers/queries/albums-and-movies.ts)

### The `customFields` query

This query returs 2 elements from `findManyAlbum` and `findManyMovie` queries containig the result of `calculated` and `imdb` custom resolvers respectively.

```graphql
query customFields {
  music {
    findManyAlbum(take: 2) {
      id
      name
      calculated
    }
  }
  movies {
    findManyMovie(take: 2) {
      id
      title
      imdb
    }
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/nineties/index.ts](src/graphql/modules/nineties/index.ts)
- Resolvers:
  - [src/graphql/modules/nineties/resolvers/types/calculated.ts](src/graphql/modules/nineties/resolvers/types/calculated.ts)
  - [src/graphql/modules/nineties/resolvers/types/imdb.ts](src/graphql/modules/nineties/resolvers/types/imdb.ts)


### The `findOrCreateAlbum` mutation

This mutation recieve 2 required arguments `artistName` and `albumName` and use them to query for an existent album and returns it, if no album available then creates it.

```graphql
mutation findOrCreateAlbum {
  findOrCreateAlbum(artistName: "ARTIST_NAME", albumName: "ALBUM_NAME") {
    name
    year
    artist {
      id
      name
    }
    genre {
      name
    }
  }
}
```

You can find this code example at the followig paths:
- Schema: [src/graphql/modules/nineties/index.ts](src/graphql/modules/nineties/index.ts)
- Resolver: [src/graphql/modules/nineties/resolvers/mutations/find-add-album.ts](src/graphql/modules/nineties/resolvers/mutations/find-add-album.ts)


Remember that this guide assumes you have basic familiarity with command-line tools and development environments. If you encounter any issues, refer to the Composabase documentation or seek assistance from our support team.

Happy coding!
