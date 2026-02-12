# how to

```typescript
import { OpenapiPlugin } from '@gest/openapi';

Server.create([new OpenapiPlugin]).then(s => s.listen());
```

```typescript
import { DocsRoute } from '@gest/openapi';

export const route = DocsRoute.create();
```
