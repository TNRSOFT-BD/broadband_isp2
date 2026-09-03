---
paths:
  - app/Http/Middleware/RolePrefixMiddleware.php
---

# Middleware

## Do not redirect /admin/* write methods
RolePrefixMiddleware must NOT redirect /admin/* for write methods (POST/PUT/PATCH/DELETE). The frontend forms submit to hardcoded route('admin.*') URLs regardless of the current prefix, so redirecting writes turned the PUT/POST into a GET and silently lost the save (419). Writes are permission-gated on /admin/* so passing them through is safe. Only redirect GET/HEAD to keep page URLs consistent.
