---
'@modelcontextprotocol/server': minor
---

SSE streams served by the SDK now emit keep-alive comment frames (`: keepalive`) so idle connections are not killed by client body-idle timeouts or intermediaries. `WebStandardStreamableHTTPServerTransport` and `PerRequestHTTPServerTransport` gain a `keepAliveMs` option (default 15000; set 0 to disable), and `createMcpHandler`'s existing `keepAliveMs` now covers modern per-request exchange streams and the legacy stateless fallback in addition to `subscriptions/listen` streams. Streaming responses disable proxy transformations and nginx-style buffering, and deferred work cannot register streams after transport close.
