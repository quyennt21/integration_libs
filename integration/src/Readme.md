# Questions

## Why not just get the endpoint directly from the decorator’s metadata in each API client, instead of using an EndpointResolver?

- Centralized: All endpoints are managed in one place.
- Dynamic: Endpoints can be updated, replaced, or reconfigured at runtime if needed.
- Discoverable: You can list all APIs, run health checks, or even provide UI/config tools.
- Extensible: Easy to add features (e.g., logging, statistics, custom headers, fallback endpoints).
- Decoupled: Clients only depend on the resolver, not on decorator details or reflection.

### Summary Table

| Feature                     | With EndpointResolver | Without EndpointResolver |
| --------------------------- | --------------------- | ------------------------ |
| Centralized Management      | ✔️                    | ❌ (scattered)           |
| Dynamic Registration        | ✔️                    | ❌                       |
| DRY (Don’t Repeat Yourself) | ✔️                    | ❌                       |
| Easy Refactoring            | ✔️                    | ❌                       |
| Scalable/Modular            | ✔️                    | ❌                       |

## Why EndpointResolver is Needed?

1. Centralized Endpoint Management
   Keeps all base URLs in one place (instead of scattered across code).
   If an endpoint changes (e.g., API migration or version bump), you update it in one place.
2. Supports Dynamic Registration
   Works seamlessly with your decorator and IntegrationScanner: as APIs are discovered, their endpoints are registered.
   Easy for future automation (e.g., load endpoints from config, env, or remote source).
3. Decouples Configuration from Implementation
   API clients don’t have to hardcode or even "know" their base URL—they just ask the resolver.
   Makes your code cleaner, testable, and less error-prone.
4. Supports Multi-Environment/Configurable Deployments
   Swap endpoints per environment without touching client logic.
   Can even support runtime reconfiguration (if needed).
