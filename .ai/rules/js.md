---
paths:
  - 'resources/js/**/*.tsx'
---

# Js

## Never call usePage()/useAdminUrl() inside event handlers
Inertia's usePage() (and anything reading the page context like useAdminUrl()/getCsrfToken()) throws "usePage must be used within the Inertia component" when called inside an async event handler, because React's useContext returns undefined out-of-render. This silently hits the catch{} and the request never fires. Always capture these values during render (e.g. `const csrfToken = getCsrfToken()` at component top) and reference them inside handlers.
