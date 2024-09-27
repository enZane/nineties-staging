import type { ResolverProps } from '@composabase/sdk'

export default async function Resolver({ root }: ResolverProps) {
  const { id, name, artist } = root

  return `Use album: ${id} - ${name}, or artist: ${artist?.id} - ${artist?.name}. To fetch data from external API`
}
