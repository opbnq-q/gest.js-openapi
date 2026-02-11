import { Server } from "@gest/framework";
import { OpenapiPlugin } from "./openapi.plugin";

Server.create([new OpenapiPlugin()]).then((s) => s.listen());
