import { schema } from "@composabase/sdk";

import helloCustom from "./modules/hello-custom";
import nineties from "./modules/nineties";

schema.type("HelloResponse", {
  fields: {
    message: schema.string(),
    data: schema.scalar("JSON"),
  },
});

schema.query("hello", {
  definition: {
    type: schema.scalar("HelloResponse"),
    args: {
      name: schema.string().optional(),
      isImportant: schema.boolean().optional(),
    },
  },
  resolver: "hello",
});

schema.modules([helloCustom, nineties]);

export default schema;
