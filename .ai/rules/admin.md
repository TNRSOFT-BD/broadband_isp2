---
paths:
  - 'resources/js/pages/Admin/**'
---

# Admin

## Always use getCsrfToken() + adminUrl() for image uploads
Laravel rotates the CSRF token on session regenerate (login) and Inertia SPA nav doesn't re-render app.blade.php, so the static <meta name="csrf-token"> goes stale → 419 CSRF mismatch on AJAX image uploads. Always send AJAX uploads with 'X-CSRF-TOKEN': getCsrfToken() from @/lib/csrf (reads fresh Inertia csrf_token prop). Also route upload URLs through adminUrl() from @/hooks/use-admin-url instead of hardcoding /admin/ so non-admin role prefixes work.
