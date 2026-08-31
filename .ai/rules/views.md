---
paths:
  - resources/views/app.blade.php
---

# Views

## Disable browser scroll restoration on reload in <head>
Full-page reloads restore the document scroll to the previous mid-page section (e.g. "Explore Our Digital Services"), causing a flash/jump. This must be prevented in the <head> inline script (history.scrollRestoration='manual' + window.scrollTo(0,0), plus pageshow/load re-asserts) BEFORE the browser applies restoration. Putting it in <body> or app.tsx is too late.
