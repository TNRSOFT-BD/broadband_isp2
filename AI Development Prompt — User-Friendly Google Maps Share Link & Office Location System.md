# Task: Replace Raw Google Maps Iframe Input with a User-Friendly Google Maps Location System

You are working on an existing ISP Provider website built with:

- Laravel
- React
- Inertia.js
- Tailwind CSS
- MySQL

The project already has an Office Location and Contact Us management system.

Currently, the admin may be required to paste a raw Google Maps iframe embed code into a form field.

This approach is not user-friendly for normal administrators.

Your task is to replace the existing raw iframe code workflow with a simple and user-friendly Google Maps location system.

The new system must allow a non-technical administrator to add an office location without understanding HTML, iframe code, embed URLs, coordinates, or Google Maps technical details.

---

# 1. Primary Goal

Remove the requirement for administrators to manually enter or paste a complete Google Maps iframe embed code.

Instead, the administrator should be able to:

1. Open a location in Google Maps.
2. Click `Share`.
3. Click `Copy Link`.
4. Paste the copied Google Maps link into the admin panel.

The system should then:

- Validate the link.
- Store the original Google Maps link.
- Resolve the location when technically possible.
- Extract or determine location information.
- Generate a safe embeddable map URL.
- Display a live map preview.
- Save the final usable location data.
- Render the map dynamically on the public Contact Us page.

The administrator should never need to manually write an iframe.

---

# 2. Remove the Existing Raw Iframe Input

Remove or deprecate the existing admin field that expects:

```html
<iframe src="..."></iframe>
```

Do not require administrators to provide:

- iframe HTML
- embed code
- HTML attributes
- width
- height
- Google Maps embed URLs

The frontend application should generate the iframe internally.

The administrator should only provide location information.

---

# 3. New Admin Panel UX

Update the Office Location create/edit form.

The form should contain the following sections.

---

## Basic Office Information

Fields:

- Office Name
- Office Type
- Address
- Phone Number
- Email Address

Reuse the existing Office Location fields where appropriate.

---

# 4. Google Maps Location Section

Create a dedicated section titled:

## Google Maps Location

Add a primary input field:

### Google Maps Share Link

Placeholder:

```text
Paste a Google Maps link here
```

Example:

```text
https://maps.app.goo.gl/xxxxxxxx
```

Add a helper message:

> Open the location in Google Maps → Click Share → Click Copy Link → Paste the link here.

The UI should be simple and easy for non-technical users.

---

# 5. Location Input Modes

The system should support the following methods.

The primary method should be:

## Method 1 — Google Maps Share Link

The administrator pastes a link copied from Google Maps.

Examples may include:

```text
https://maps.app.goo.gl/...
```

or:

```text
https://www.google.com/maps/...
```

or other valid Google Maps location URLs.

The system should detect and validate supported Google Maps URLs.

---

## Method 2 — Manual Coordinates

Provide an optional advanced section.

Fields:

- Latitude
- Longitude

Example:

```text
Latitude: 24.8261114
Longitude: 88.3262867
```

This should not be the primary workflow.

Place it under:

```text
Advanced Location Settings
```

The section may be collapsed by default.

---

## Method 3 — Location Name Fallback

If automatic location extraction is unavailable, allow the administrator to enter:

### Location Name

Example:

```text
Rohanpur Railway Station, Bangladesh
```

The system may use the location name to generate a search-based map embed URL.

This should act as a fallback.

---

# 6. Google Maps Share Link Processing

This is an important requirement.

Google Maps short URLs such as:

```text
https://maps.app.goo.gl/xxxxxxxx
```

must NOT be directly placed into an iframe `src`.

Instead, the system should process the location properly.

The application should follow this general flow:

```text
Admin pastes Google Maps Share Link
            ↓
Validate Google Maps domain
            ↓
Resolve the URL safely
            ↓
Determine final Google Maps destination
            ↓
Extract coordinates or location query if available
            ↓
Store normalized location data
            ↓
Generate an internal embed URL
            ↓
Display map preview
```

Do not expose this technical complexity to the administrator.

---

# 7. Short Link Resolution

The backend should safely handle Google Maps short URLs.

Examples:

```text
maps.app.goo.gl
goo.gl/maps
```

The backend may follow redirects server-side to determine the final destination URL.

Requirements:

- Limit redirect count.
- Validate the final domain.
- Prevent arbitrary URL fetching.
- Protect against SSRF.
- Do not follow redirects to private/internal IP addresses.
- Only allow trusted Google Maps domains.
- Set request timeouts.
- Handle failed resolution gracefully.

Do not blindly fetch arbitrary URLs submitted by administrators.

The allowed domains should include only appropriate Google Maps domains.

Examples may include:

- maps.app.goo.gl
- google.com
- www.google.com
- maps.google.com

Validate the final destination carefully.

---

# 8. Location Data Extraction

After resolving the Google Maps URL, attempt to determine:

- Latitude
- Longitude
- Location name
- Formatted address

If coordinates can be extracted, store them.

Preferred storage:

```text
latitude
longitude
```

Coordinates should be the preferred source for map rendering.

If coordinates are unavailable but a valid location name or query is available, store:

```text
location_query
```

Do not fail unnecessarily if a valid Google Maps link cannot expose coordinates.

Provide a graceful fallback.

---

# 9. Database Structure

Update the existing Office Location system instead of unnecessarily creating duplicate tables.

Recommended fields:

```text
office_locations

id
name
slug
type
address
phone
email

google_maps_url
location_query
latitude
longitude

sort_order
is_active

created_at
updated_at
```

Optional:

```text
map_resolution_status
map_resolution_error
```

if useful for debugging.

Do NOT store raw iframe HTML as the primary location source.

Do NOT require:

```text
map_embed_html
```

The application should generate the embed URL dynamically.

---

# 10. Google Maps URL Storage

Store the original link pasted by the administrator.

Example:

```text
google_maps_url
```

This allows users to click:

```text
Open in Google Maps
```

The public website should use the original Google Maps URL for external navigation.

However, the map iframe should use a generated embed URL.

Do not use the original short URL directly as the iframe source.

---

# 11. Generated Embed URL

When latitude and longitude are available, generate the map URL internally.

Example logic:

```text
https://www.google.com/maps?q={latitude},{longitude}&output=embed
```

Conceptually:

```text
latitude = 24.8261114
longitude = 88.3262867
```

Generated iframe source:

```text
https://www.google.com/maps?q=24.8261114,88.3262867&output=embed
```

If coordinates are not available but a location query exists:

```text
https://www.google.com/maps?q={encoded_location_query}&output=embed
```

Example:

```text
https://www.google.com/maps?q=Rohanpur%20Railway%20Station%2C%20Bangladesh&output=embed
```

Always URL encode the query.

---

# 12. Live Map Preview

After the administrator provides valid location information, show a live preview.

Example:

```text
Google Maps Location

[ Google Maps Share Link input                     ]

✓ Location detected successfully

Location:
Rohanpur Railway Station

Latitude:
24.xxxxx

Longitude:
88.xxxxx


Map Preview
┌──────────────────────────────────────┐
│                                      │
│             GOOGLE MAP               │
│                                      │
└──────────────────────────────────────┘
```

The preview should update when the location data changes.

---

# 13. Manual Refresh / Resolve Button

Add a button:

```text
[ Detect Location ]
```

or:

```text
[ Resolve Location ]
```

When clicked:

1. Validate the Google Maps link.
2. Resolve the short link.
3. Extract available location information.
4. Update preview data.
5. Show success or error feedback.

Do not automatically make expensive backend requests on every keystroke.

Use a manual action or debounced validation.

---

# 14. Loading State

While resolving the location, display:

```text
Detecting location...
```

Disable repeated requests while processing.

Use a loading indicator.

Do not allow multiple simultaneous resolution requests for the same action.

---

# 15. Success State

When location detection succeeds:

Display:

```text
✓ Location successfully detected
```

Show available information:

- Location Name
- Address
- Latitude
- Longitude

Do not overwrite manually entered office information without confirmation.

If the detected address differs from the existing Address field, provide an optional action:

```text
[ Use Detected Address ]
```

The administrator should control whether detected information replaces existing information.

---

# 16. Error Handling

If the Google Maps link cannot be resolved:

Do not destroy the administrator's entered data.

Show a helpful message.

Example:

```text
We could not automatically detect the location from this link.
You can enter the location name or coordinates manually.
```

Then provide:

- Location Name input
- Latitude input
- Longitude input

The administrator should still be able to save the office location if sufficient location information is provided.

---

# 17. Public Website Map Rendering

The public Contact Us page should render the map dynamically.

Use the following priority:

## Priority 1

Latitude + Longitude

Generate:

```text
https://www.google.com/maps?q={latitude},{longitude}&output=embed
```

---

## Priority 2

Location Query

Generate:

```text
https://www.google.com/maps?q={encoded_location_query}&output=embed
```

---

## Priority 3

No embeddable location

Do not render a broken iframe.

Instead:

- Hide the embedded map.
- Show office address.
- Show an `Open in Google Maps` button if a Google Maps URL exists.

---

# 18. Public Map Component

Create a reusable component.

Suggested:

```text
Components/
    Maps/
        OfficeLocationMap.jsx
```

The component should receive:

```text
latitude
longitude
locationQuery
googleMapsUrl
officeName
```

Responsibilities:

- Determine the best map source.
- Generate the iframe URL.
- Render the map.
- Provide fallback behavior.
- Render an external Google Maps link.

Do not duplicate map generation logic across multiple pages.

---

# 19. React Example Logic

Conceptually, the map component should follow this logic:

```text
IF latitude AND longitude exist
    generate coordinate-based embed URL

ELSE IF locationQuery exists
    generate query-based embed URL

ELSE
    do not render iframe
```

Keep the actual implementation modular and reusable.

Do not expose raw iframe code to administrators.

---

# 20. Security Requirements

The Google Maps link resolver must be secure.

Requirements:

- Only accept valid Google Maps URLs.
- Use a domain allowlist.
- Validate redirects.
- Prevent SSRF.
- Reject localhost.
- Reject private IP ranges.
- Set strict HTTP request timeouts.
- Limit redirect depth.
- Sanitize all stored URLs.
- Validate latitude range.
- Validate longitude range.

Valid coordinate ranges:

```text
Latitude:
-90 to 90

Longitude:
-180 to 180
```

Do not create a generic URL resolver that can fetch arbitrary websites.

---

# 21. Backend Architecture

Follow the existing Laravel project architecture.

Use:

- Form Request validation
- Service Layer
- Repository Pattern if already used
- HTTP client abstraction
- Proper exception handling
- Transactions where necessary

Suggested architecture:

```text
OfficeLocationController
        ↓
OfficeLocationService
        ↓
GoogleMapsLocationResolverService
        ↓
Repository / Model
```

The Google Maps URL resolution logic must be isolated in a reusable service.

Do not place redirect resolution or URL parsing directly inside the controller.

---

# 22. Suggested Backend Services

Create reusable services if appropriate:

```text
Services/
    GoogleMaps/
        GoogleMapsUrlValidator.php
        GoogleMapsLocationResolver.php
        GoogleMapsEmbedUrlGenerator.php
```

Responsibilities:

### GoogleMapsUrlValidator

- Validate allowed domains.
- Validate URL format.

### GoogleMapsLocationResolver

- Resolve short URLs.
- Follow safe redirects.
- Determine final Google Maps URL.
- Extract available location data.

### GoogleMapsEmbedUrlGenerator

- Generate coordinate-based embed URL.
- Generate query-based embed URL.

Keep each responsibility separated.

---

# 23. Admin Form Validation

Validate:

- Office name is required.
- Address is optional or required according to the existing system.
- Google Maps URL must be a valid allowed Google Maps URL if provided.
- Latitude must be valid if provided.
- Longitude must be valid if provided.
- Location query must not exceed a reasonable length.

At least one usable location source should exist if the office requires a map.

Examples:

- Google Maps URL
- Coordinates
- Location Query

Do not require all of them.

---

# 24. Migration Strategy

If the existing database currently stores:

```text
map_embed_url
```

or:

```text
map_iframe
```

do not immediately destroy existing production data.

Create a safe migration strategy.

Possible approach:

1. Keep existing field temporarily.
2. Add new fields:
   - google_maps_url
   - location_query
   - latitude
   - longitude
3. Update admin panel to use the new fields.
4. Continue supporting existing embed data as a temporary fallback.
5. Remove legacy fields only after existing data has been migrated.

Do not break existing office locations.

---

# 25. Existing Data Compatibility

Existing office locations that already contain iframe/embed information must continue working.

Create a migration or fallback strategy.

For existing records:

```text
Existing iframe/embed
        ↓
Attempt to extract coordinates or query
        ↓
Populate new location fields when possible
```

If automatic migration is not possible:

- Keep legacy map rendering temporarily.
- Allow the administrator to update the location using the new system.

Do not cause existing maps to disappear after deployment.

---

# 26. User Experience Requirements

The entire workflow must be understandable by a non-technical administrator.

The administrator should only need to understand:

```text
Google Maps
→ Share
→ Copy Link
→ Paste Here
```

Do not expose:

- HTML
- iframe code
- embed URL
- URL encoding
- coordinate parsing
- redirect resolution

All technical processing must happen internally.

---

# 27. Design Requirements

The updated location section must follow the existing admin panel design.

Use:

- Existing input components
- Existing buttons
- Existing cards
- Existing alerts
- Existing loading indicators
- Existing form validation styles

Do not create a visually unrelated interface.

The section should feel native to the current admin panel.

---

# 28. Final Deliverables

Implement the complete updated Google Maps location system including:

1. Remove raw iframe code as the primary admin input.
2. Add Google Maps Share Link input.
3. Add clear helper instructions.
4. Support Google Maps short links.
5. Support full Google Maps URLs.
6. Safely resolve short URLs.
7. Extract coordinates when possible.
8. Extract location information when possible.
9. Store normalized location data.
10. Store the original Google Maps URL.
11. Support manual coordinates.
12. Support location name fallback.
13. Generate iframe embed URLs internally.
14. Add live map preview.
15. Add Resolve Location action.
16. Add loading state.
17. Add success state.
18. Add helpful error state.
19. Add reusable React map component.
20. Add reusable Laravel location resolver service.
21. Add secure URL validation.
22. Add SSRF protection.
23. Add fallback behavior.
24. Maintain existing office location compatibility.
25. Safely migrate legacy iframe data.
26. Update the public Contact Us page.
27. Ensure responsive map rendering.
28. Ensure accessibility.
29. Ensure production-ready error handling.
30. Do not break existing functionality.

---

# Final Requirement

The final experience must be simple enough that a normal administrator can add a map location by doing only this:

```text
Open Google Maps
        ↓
Find the location
        ↓
Share
        ↓
Copy Link
        ↓
Paste into Admin Panel
        ↓
Click Detect Location
        ↓
Preview Map
        ↓
Save
```

The administrator must never need to copy or understand an iframe embed code.

The system should be:

**Simple + User-Friendly + Secure + Dynamic + Reusable + Scalable + Compatible with Existing Data + Production Ready.**