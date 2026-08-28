---
paths:
  - app/Repositories/Eloquent/EloquentPlanCategoryRepository.php
---

# Eloquent

## Plan category visibility = has active plans
Public /plans category tabs show ONLY categories that have at least one active plan (getActiveOrdered uses whereHas('activePlans')). Category has no is_active flag anymore (column dropped from DB). To hide a category from the public page, deactivate all its plans instead.
