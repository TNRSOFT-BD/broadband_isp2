---
paths:
  - app/Services/OfficeLocationService.php
---

# Services

## Normalize Google Maps embed input
OfficeLocation map_embed_url accepts a raw Google Maps embed URL OR a full iframe snippet. OfficeLocationService::normalizeMapEmbed() extracts the iframe src (or validates URL) before saving, so the DB always stores a clean URL for the public iframe render. Frontend extractEmbedSrc() mirrors this for the admin live preview.
