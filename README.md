# how to

```typescript
import { OpenapiPlugin } from '@gest/openapi';

Server.create([new OpenapiPlugin]).then(s => s.listen());
```

```typescript
import { DocsRoute, OpenapiRoute } from '@gest/openapi';

export const docsRoute = DocsRoute.create(); // routes/docs/index.route.ts
export const openapiRoute = OpenapiRoute.create();// routes/openapi/index.route.ts

// mount both routes so Scalar can load /openapi/
```
