# Task: Build a Fully Dynamic Legal Pages Management System with Tiptap Rich Text Editor

You are working on an existing ISP Provider website built with:

- Laravel
- React
- Inertia.js
- Tailwind CSS
- MySQL

The project already has an established:

- Frontend design system
- Admin panel
- Authentication system
- CMS/content management architecture
- Service Layer
- Repository Pattern where applicable
- Reusable React components
- Existing settings and SEO infrastructure

Your task is to design and implement a **fully dynamic Legal Pages Management System** for the ISP website.

The system must support the following public pages:

1. Terms & Conditions
2. Privacy Policy
3. Refund Policy

All pages must be dynamically manageable from the admin panel.

The main content editor must use **Tiptap Rich Text Editor**.

Do not hardcode the legal page content inside React components or backend files.

---

# 1. Primary Goal

Create a scalable legal page system where administrators can:

- Create and manage legal pages
- Edit page titles
- Edit page descriptions/content
- Publish or unpublish pages
- Update SEO information
- Control page URLs/slugs
- Track last updated dates
- Preview content
- Manage rich text content using Tiptap

The system should be flexible enough to support additional legal or informational pages in the future.

Examples of future pages:

- Acceptable Use Policy
- Cookie Policy
- Cancellation Policy
- Service Level Agreement
- Fair Usage Policy

Therefore, do not design the database in a way that only supports exactly three pages.

Create a reusable and scalable page management architecture.

---

# 2. Public Pages

Initially, the system must provide the following public routes:

```text
/terms-and-conditions

/privacy-policy

/refund-policy
```

The URL/slugs should preferably be dynamically generated from the page configuration.

However, the initial default slugs should be:

```text
terms-and-conditions
privacy-policy
refund-policy
```

The public page should dynamically load the correct legal page based on its slug.

Example architecture:

```text
/legal/{slug}
```

or dedicated named routes that internally use the same reusable legal page system.

Choose the approach that best matches the existing application routing architecture.

Important:

Do not duplicate frontend components for each legal page.

Create one reusable legal page component that can render different legal page content dynamically.

---

# 3. Design Requirements

The design must remain fully consistent with the existing ISP website.

Before implementation:

1. Inspect the existing frontend.
2. Identify the existing:
   - Color palette
   - Typography
   - Container widths
   - Spacing system
   - Section patterns
   - Header
   - Footer
   - Button styles
   - Border radius
   - Shadows
   - Card styles
   - Background effects
3. Reuse existing design tokens and reusable components.

Do not redesign the website.

The Legal Pages should feel like:

> A premium and polished informational section that naturally belongs to the existing ISP website.

The pages should be:

- Professional
- Clean
- Highly readable
- Trustworthy
- Modern
- Responsive
- Accessible

Since these are legal and policy pages, readability must take priority over excessive visual effects.

The existing website may have a futuristic design language, but the legal pages should use that design language in a subtle and elegant way.

Use subtle:

- Background gradients
- Ambient lighting
- Soft borders
- Existing visual patterns
- Smooth transitions

Avoid:

- Excessive glow
- Distracting animations
- Overly complex layouts
- Hard-to-read typography
- Excessive glass effects

---

# 4. Public Legal Page Layout

Create a reusable Legal Page layout.

Suggested structure:

## Breadcrumb

Example:

```text
Home / Privacy Policy
```

The breadcrumb should be generated dynamically.

---

## Page Hero / Header

Display:

- Page title
- Short description if configured
- Last updated date if enabled

Example:

```text
Privacy Policy

Learn how we collect, use, and protect your information.

Last Updated: August 31, 2026
```

All information should be dynamic.

---

## Main Content Area

Render the Tiptap rich text content.

The content area must have excellent typography and spacing.

Support properly styled:

- Headings
- Paragraphs
- Ordered lists
- Unordered lists
- Links
- Blockquotes
- Horizontal rules
- Tables if enabled

The frontend content renderer must correctly render all supported Tiptap content.

---

## Optional Table of Contents

If the legal content contains headings, optionally generate a dynamic Table of Contents.

Example:

```text
On This Page

1. Introduction
2. Information We Collect
3. How We Use Information
4. Data Protection
5. Third-Party Services
6. Contact Information
```

The Table of Contents should:

- Detect headings from the content
- Generate anchor links
- Allow smooth scrolling
- Highlight the active section if practical
- Be responsive

On mobile:

- Display it in a collapsible format if necessary.

The feature should be configurable.

---

## Last Updated Information

Allow the admin to control whether the page displays:

- Last updated date
- Published date

Suggested display:

```text
Last updated: August 31, 2026
```

This should update automatically when content is updated, unless the existing architecture supports a manual date.

---

## Bottom Contact / Help CTA

Optionally show a small dynamic CTA at the bottom.

Example:

```text
Have questions about this policy?

Contact our support team for more information.
```

Button:

```text
Contact Us
```

This section must be configurable from the admin panel.

---

# 5. Tiptap Rich Text Editor

Use **Tiptap** as the primary rich text editor in the admin panel.

The editor should be production-ready and integrated properly with the existing React + Inertia application.

Do not use a basic textarea for the legal page content.

The editor must provide a clean and user-friendly toolbar.

---

# 6. Required Tiptap Features

Enable the following essential features.

## Text Formatting

- Bold
- Italic
- Underline
- Strikethrough if appropriate

---

## Headings

Support:

- Heading 1
- Heading 2
- Heading 3
- Heading 4 if necessary

The heading hierarchy should be semantically correct.

---

## Lists

Support:

- Bullet lists
- Numbered lists
- Nested lists
- List item indentation where appropriate

---

## Paragraph Formatting

Support:

- Normal paragraph
- Text alignment if necessary
  - Left
  - Center
  - Right
  - Justify

Only include alignment controls if they match the existing editor and content requirements.

---

## Links

Allow administrators to:

- Add links
- Edit links
- Remove links

Support:

- Internal links
- External links

For external links, support appropriate:

- `target="_blank"`
- `rel="noopener noreferrer"`

where applicable.

---

## Blockquotes

Allow blockquotes for important legal notes or statements.

---

## Horizontal Rule

Allow inserting horizontal dividers between major content sections.

---

## Undo / Redo

Provide:

- Undo
- Redo

These controls should be clearly accessible.

---

# 7. Recommended Tiptap Features

Include the following useful features where appropriate.

## Text Color

Allow administrators to change text color.

However:

- Keep the available colors limited.
- Prefer colors from the existing website design system.
- Avoid arbitrary color selection that may reduce readability.

---

## Highlight

Support text highlighting if appropriate.

---

## Clear Formatting

Provide a button to remove inline formatting from selected text.

---

## Code

Optional:

- Inline code formatting

Do not prioritize code blocks unless they are genuinely useful.

---

## Tables

Consider supporting tables.

Legal and policy pages may occasionally need tables for:

- Fee information
- Refund timelines
- Policy comparisons

If tables are enabled, support:

- Insert table
- Add row
- Add column
- Delete row
- Delete column
- Merge cells only if truly necessary

Keep the table UI simple.

---

# 8. Image Support

Legal pages generally do not require many images.

Therefore, image support should be optional.

If the existing project already has a media management system, allow optional image insertion using that system.

Do not create a completely separate image management architecture.

If image support is implemented:

- Use existing upload/storage architecture
- Validate file types
- Validate file size
- Use alt text
- Support responsive rendering

Do not make images a primary part of legal page editing.

---

# 9. Tiptap Toolbar Design

Create a clean and reusable editor toolbar.

Suggested groups:

### Text

- Paragraph
- Heading selector

### Formatting

- Bold
- Italic
- Underline
- Strikethrough

### Lists

- Bullet List
- Ordered List

### Insert

- Link
- Blockquote
- Horizontal Rule
- Table if enabled

### History

- Undo
- Redo

Optional:

- Text color
- Highlight
- Alignment

The toolbar should:

- Clearly show active formatting
- Be keyboard accessible
- Be responsive
- Wrap or collapse gracefully on mobile
- Reuse the existing admin design system

Avoid creating an oversized or cluttered toolbar.

---

# 10. Tiptap Content Storage

Store the Tiptap editor content in a structured format.

Preferred approach:

Store the content as:

```text
JSON
```

using Tiptap's structured document format.

Example concept:

```json
{
  "type": "doc",
  "content": []
}
```

Do not rely only on raw HTML as the primary editable source if structured JSON storage is practical.

The frontend should safely render the content.

If HTML rendering is required:

- Generate it safely
- Sanitize user-generated content where appropriate
- Prevent XSS vulnerabilities

Never directly render untrusted raw HTML without appropriate protection.

Consider storing:

- `content_json`

Optionally:

- `content_html`

if the existing architecture benefits from pre-rendered HTML.

The source of truth should remain consistent.

---

# 11. Content Rendering

Create a reusable frontend component responsible for rendering legal page content.

Example:

```text
Components/
    Content/
        RichTextRenderer.jsx
```

The component should:

- Render supported Tiptap nodes
- Apply the website typography styles
- Support headings
- Support lists
- Support links
- Support blockquotes
- Support tables if enabled
- Maintain readable line length
- Work responsively

Do not place complex rendering logic directly inside the page component.

---

# 12. Admin Panel — Legal Pages Management

Create a dedicated admin section.

Suggested route:

```text
/admin/legal-pages
```

The admin should see all legal pages.

Example table:

| Title | Slug | Status | Last Updated | Actions |
|---|---|---|---|---|

Required features:

- View all pages
- Search pages
- Create page
- Edit page
- Delete page
- Publish/unpublish page
- Preview page
- Manage SEO
- Change sort order if applicable

The initial pages should include:

- Terms & Conditions
- Privacy Policy
- Refund Policy

The admin should also be able to create additional legal pages in the future.

---

# 13. Create / Edit Legal Page Form

The admin page form should be organized into logical sections.

---

## Basic Information

Fields:

- Page title
- Slug
- Short description
- Page type/category
- Status

Example page types:

- Terms
- Privacy
- Refund
- Cookie
- Cancellation
- Other

Do not make page type unnecessarily restrictive.

---

## Content

Use the Tiptap Rich Text Editor.

The editor should occupy a large, comfortable editing area.

Requirements:

- Autosave only if the existing project supports it
- Otherwise use normal save/update behavior
- Prevent accidental data loss
- Warn the user about unsaved changes when appropriate

---

## Publication Settings

Fields:

- Draft / Published
- Published date if applicable
- Display last updated date
- Custom last updated date if needed

---

## URL Settings

Fields:

- Slug

Ensure slug uniqueness.

Do not allow two legal pages to have the same slug.

---

## SEO Settings

Fields:

- Meta title
- Meta description
- Open Graph title if supported
- Open Graph description if supported
- Open Graph image if supported by the existing media system

Reuse the existing SEO architecture if available.

Do not create duplicate SEO systems.

---

## Bottom CTA

Optional fields:

- Enable/disable
- Title
- Description
- Button text
- Button URL

---

# 14. Default Legal Pages

The following pages should be created as initial records.

---

## Terms & Conditions

Default slug:

```text
terms-and-conditions
```

---

## Privacy Policy

Default slug:

```text
privacy-policy
```

---

## Refund Policy

Default slug:

```text
refund-policy
```

These should be database-driven records.

Do not hardcode them as static frontend pages.

If seeders are appropriate, create seed data or migrations that ensure these records exist.

Do not overwrite existing content during future deployments.

---

# 15. Database Architecture

Before creating new tables, inspect the existing project.

If the project already has a CMS or dynamic page system that can support rich text pages, extend that system instead of creating duplicate architecture.

If no suitable system exists, create a scalable table.

Suggested table:

```text
legal_pages
```

Suggested fields:

- id
- title
- slug
- page_type
- short_description
- content_json
- content_html (optional)
- status
- published_at
- last_updated_at
- show_last_updated
- meta_title
- meta_description
- og_title
- og_description
- og_image
- cta_enabled
- cta_title
- cta_description
- cta_button_text
- cta_button_url
- created_at
- updated_at

Use:

- Proper indexes
- Unique slug constraint
- Appropriate timestamps

Avoid unnecessary duplication.

---

# 16. Backend Architecture

Follow the existing Laravel project architecture.

Use:

- Form Request validation
- Service Layer
- Repository Pattern if already used
- Eloquent models
- Authorization
- Transactions where appropriate
- Clean controllers

Keep controllers thin.

Suggested flow:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Model
```

However:

If the existing project architecture differs, follow the established architecture instead of forcing a new structure.

Do not introduce architectural inconsistency.

---

# 17. Validation Requirements

Validate:

- Title is required
- Slug is required
- Slug is unique
- Short description has an appropriate maximum length if used
- Content is valid Tiptap JSON
- Status is valid
- SEO fields are validated appropriately
- CTA URL is valid when provided

Do not rely only on frontend validation.

Implement proper backend validation.

---

# 18. Public Routing

The public pages must work correctly.

Possible routes:

```text
/terms-and-conditions
/privacy-policy
/refund-policy
```

Additional legal pages can use:

```text
/legal/{slug}
```

or another routing strategy consistent with the project.

Important:

Avoid route conflicts.

Ensure unknown slugs return a proper 404 response.

Unpublished pages should not be publicly accessible.

---

# 19. Navigation and Footer Integration

If the existing website footer contains:

- Terms & Conditions
- Privacy Policy
- Refund Policy

ensure those links point to the dynamically managed pages.

Do not hardcode the URLs if the existing navigation system is already dynamic.

Reuse the existing navigation/footer management architecture where available.

The pages should integrate naturally into:

- Footer
- Sitemap if supported
- SEO system
- Existing page navigation

---

# 20. Preview Functionality

Allow administrators to preview a legal page before publishing.

Possible approaches:

- Preview route
- Preview mode
- New tab preview

Ensure draft content is not publicly exposed.

Preview access must require appropriate authorization.

---

# 21. Versioning Consideration

Legal pages may be updated over time.

If practical within the existing project architecture, consider a lightweight versioning system.

Possible future capability:

- Track previous versions
- Track update timestamps
- Restore previous versions

Do not overengineer this feature.

Only implement full version history if the project architecture already supports it or it is explicitly required.

At minimum, ensure:

- `updated_at`
- `last_updated_at`

are properly maintained.

---

# 22. Responsive Design

The public legal pages must work properly on:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Important mobile requirements:

- Readable font size
- Comfortable line spacing
- Responsive tables
- Proper list indentation
- Collapsible Table of Contents if enabled
- No horizontal overflow
- Comfortable touch targets

---

# 23. Accessibility

Ensure:

- Semantic HTML
- Proper heading hierarchy
- Keyboard accessible editor controls
- Keyboard accessible links
- Visible focus states
- Sufficient color contrast
- Accessible table structure
- Meaningful link text
- Proper list semantics

The legal page must remain highly readable and accessible.

---

# 24. Security

This is very important because rich text content may contain links and formatted content.

Protect against:

- XSS
- Unsafe HTML
- Malicious URLs
- Script injection

Validate and sanitize content appropriately.

Do not allow:

- Arbitrary `<script>` tags
- Unsafe inline JavaScript
- Dangerous URLs

Use a safe rendering strategy.

Do not use `dangerouslySetInnerHTML` with unsanitized content.

---

# 25. Performance

Keep the system lightweight.

Requirements:

- Avoid unnecessary database queries
- Fetch only required page content
- Use proper indexes
- Avoid N+1 queries
- Lazy load non-critical assets
- Avoid unnecessary editor extensions
- Keep the Tiptap bundle reasonable

The editor should only load where necessary.

Do not load heavy admin editor dependencies on the public legal pages.

---

# 26. React Component Architecture

Suggested structure:

```text
Pages/
    Legal/
        Show.jsx

Components/
    Legal/
        LegalPageHero.jsx
        LegalPageContent.jsx
        LegalTableOfContents.jsx
        LegalPageCTA.jsx

Components/
    Editor/
        TiptapEditor.jsx
        TiptapToolbar.jsx
        LinkDialog.jsx
        TableControls.jsx
```

Admin pages:

```text
Pages/
    Admin/
        LegalPages/
            Index.jsx
            Create.jsx
            Edit.jsx
            Preview.jsx
```

Reuse existing components wherever possible.

Do not create duplicate Button, Card, Modal, Input, or Layout components.

---

# 27. Editor Reusability

The Tiptap editor should be built as a reusable component.

It may later be used for:

- Blog content
- Privacy pages
- Terms pages
- Refund policy
- Other CMS content

Therefore, design the editor API to be reusable.

Example conceptual props:

```text
value
onChange
placeholder
extensions
editable
minHeight
```

Do not tightly couple the editor only to legal pages.

---

# 28. Important Implementation Rules

- Do not hardcode legal page content.
- Use Tiptap Rich Text Editor.
- Support Bold.
- Support Italic.
- Support Underline.
- Support Headings.
- Support Bullet Lists.
- Support Numbered Lists.
- Support Links.
- Support Blockquotes.
- Support Horizontal Rules.
- Support Undo/Redo.
- Support additional essential formatting features.
- Keep the toolbar clean and user-friendly.
- Store content in a structured and safe format.
- Prevent XSS.
- Make all legal pages dynamic.
- Reuse existing CMS architecture if available.
- Reuse existing SEO architecture.
- Reuse existing media architecture.
- Follow the existing backend architecture.
- Follow the existing frontend design system.
- Keep the legal pages highly readable.
- Do not break existing functionality.

---

# Final Deliverables

Implement the complete system including:

1. Dynamic Terms & Conditions page
2. Dynamic Privacy Policy page
3. Dynamic Refund Policy page
4. Scalable support for additional legal pages
5. Tiptap Rich Text Editor integration
6. Essential formatting toolbar
7. Bold formatting
8. Italic formatting
9. Underline formatting
10. Heading support
11. Bullet lists
12. Numbered lists
13. Nested lists
14. Links
15. Blockquotes
16. Horizontal rules
17. Undo and redo
18. Optional text color/highlight
19. Optional table support
20. Structured content storage
21. Safe content rendering
22. XSS protection
23. Dynamic public page rendering
24. Dynamic slugs
25. Admin CRUD management
26. Draft and published status
27. Preview functionality
28. SEO management
29. Last updated information
30. Optional dynamic Table of Contents
31. Optional bottom CTA
32. Responsive design
33. Accessibility support
34. Footer integration
35. Proper validation
36. Clean Laravel architecture
37. Reusable React components
38. Production-ready error handling

Before implementing, carefully inspect the existing project and reuse all existing:

- Settings systems
- CMS systems
- SEO systems
- Media systems
- Admin components
- Form components
- Layouts
- Design tokens
- Backend architecture

The final result must feel like a native part of the existing ISP website and admin panel.

The system should be:

**Fully Dynamic + Secure + Scalable + Easy to Manage + Highly Readable + Production Ready.**

Do not create static legal pages.

Build a reusable legal page management system that can grow with the website.