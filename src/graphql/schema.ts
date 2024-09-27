import { schema } from "@composabase/sdk"

import helloCustom from './modules/hello-custom'
import nineties from './modules/nineties'

schema.query('hello', {
  definition: {
    type: schema.string(),
    args: {
      name: schema.string().optional(),
      isImportant: schema.boolean().optional(),
    },
  },
  resolver: 'hello',
})

schema.modules([
  helloCustom,
  nineties,
])

export default schema
