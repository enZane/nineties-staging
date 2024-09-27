import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root }: ResolverProps) {

  return `Use movie-id: ${root.id} to query IMDB API`
}
