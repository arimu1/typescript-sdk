---
'@modelcontextprotocol/server': patch
---

SSE streams served by the SDK now emit keep-alive comment frames (`: keepalive`) so idle connections (e.g. the standalone GET stream, or a stream during a long-running tool call) are not killed by intermediaries or server idle timeouts. `WebStandardStreamableHTTPServerTransport` and `PerRequestHTTPServerTransport` gain a `keepAliveMs` option (default 15000; set 0 to disable), and `createMcpHandler`'s existing `keepAliveMs` now covers modern per-request exchange streams and the legacy stateless fallback in addition to `subscriptions/listen` streams.
