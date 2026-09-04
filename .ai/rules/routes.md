---
paths:
  - routes/admin.php
---

# Routes

## Mirror admin write routes for role prefixes
Non-admin roles (staff/editor/viewer/manager) are redirected from /admin/* to their prefix (/editor/* etc.) by RolePrefixMiddleware. The role-prefix route group in routes/admin.php must mirror the /admin write routes (PUT updates, POST uploads, CRUD) gated by the same permission:* middleware — otherwise these roles see editable pages but get "route could not be found" on upload/save. New users get their role via EloquentUserRepository::syncRoles, and admin_prefix is derived per-user from roles->first()->prefix, so mirroring under the loop covers all current and future users.

## Drive role-prefix routes from DB, not hardcoded list
Role-prefix routes (e.g. /editor/*, /viewer/*) must be registered from the actual roles table prefixes, NOT a hardcoded array. Route registration reads DB::table('roles')->where('prefix','!=','admin')->pluck('prefix') so any current or future role automatically gets view+write routes under its prefix; a future role with an unlisted prefix would otherwise 404 after RolePrefixMiddleware redirects. Roles without a prefix default to the role name (see RolePermissionSeeder).

## Every /admin route must be mirrored in the role-prefix loop
When adding ANY new admin route in the `/admin/*` group, you MUST also add the same route to the dynamic role-prefix loop (the `foreach ($rolePrefixes as $rolePrefix)` block) under the identical permission gate. `RolePrefixMiddleware` 302-redirects GETs from `/admin/*` to `/{role.prefix}/*`, and non-admin roles authenticate solely via their prefix URL — a route only defined under `/admin` becomes a 404 for every role whose prefix != admin. Missing GET "create"/"edit" view routes are the most common omission (writes often work because non-GET methods pass through the middleware).
