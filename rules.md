# **ISP Provider Website - Project Rules &amp; Technical Specifications**

## **1. Project Overview**

This document outlines the **detailed technical rules, architectural guidelines, and development standards** for building a **professional, elegant, and scalable ISP (Internet Service Provider) website** using **Laravel (Backend), React (Frontend), Inertia.js (Bridge), and Tailwind CSS (Styling)**.

The website will follow \*\* enterprise-grade software engineering practices\*\*, including **Service Layer, Repository Pattern, Dynamic Theming, Multi-Page Architecture, Clean Controllers, and Optimized Data Structures**. The system must be **modular, maintainable, and performant**, adhering to **senior-level coding standards**.

---

## **2. Core Technology Stack**

### **2.1 Backend Framework**

- **Laravel (Latest Stable Version)**
  - **PHP Version:** 8.2+ (Type Declarations, Attributes, Fibers-ready)
  - **Architecture:** MVC with **Service Layer + Repository Pattern**

- **Caching:** Redis (Session, Cache, Queue)
- **Database:** MySQL 8.0+ (with Indexing, Transactions, and Query Optimization)
- **ORM:** Laravel Eloquent (with **Custom Repositories** for complex queries)
- **API:** Laravel API Resources (for Inertia.js data fetching)

### **2.2 Frontend Framework**

- **React 18+ (TypeScript)**
  - **State Management:** React Context API + Custom Hooks (Avoid Redux unless necessary)
  - **Styling:** **Tailwind CSS 3.4+** (Utility-First, JIT Mode)
  - **UI Components:** Headless UI (for accessible components) + Heroicons (SVG Icons)
  - **Form Handling:** React Hook Form + Zod (Validation)
  - **Animation:** Framer Motion (for subtle, professional transitions)

### **2.3 Bridge Layer**

- **Inertia.js (Latest Version)**
  - **Server-Side Rendering (SSR):** Enabled for SEO and Performance
  - **Lazy Loading:** Code Splitting for React Pages
  - **Shared Props:** TypeScript Interfaces for Props Validation

### **2.4 Styling &amp; Theming**

- **Tailwind CSS** (Primary Styling)
  - **Custom Config:** `tailwind.config.js` with **Dynamic Theme Support**
  - **Color Palette:** Professional &amp; Elegant (See **Section 6**)
  - **Typography:** **Dynamic Font Loading** (Admin-Configurable)
  - **Responsiveness:** Mobile-First, Fully Responsive (Breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`)

### **2.5 Build Tools &amp; Bundling**

- **Vite 5+** (Frontend Bundler)
- **Laravel Mix (Optional):** Only if Vite is insufficient for legacy needs
- **ESLint + Prettier:** Code Formatting &amp; Linting
- **TypeScript:** Strict Mode (`strict: true`)

---

## **3. Architectural Rules &amp; Design Patterns**

### **3.1 Layered Architecture (Strict Separation of Concerns)**

```
┌───────────────────────────────────────────────────────────────┐
│                        Presentation Layer                        │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐  │
│  │   React     │    │   Inertia   │    │   Blade (Fallback) │  │
│  │   (Frontend)│    │    (Bridge) │    │   (Server-Rendered)│  │
│  └─────────────┘    └─────────────┘    └───────────────────┘  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐  │
│  │  Controllers │    │   Services  │    │   DTOs (Data       │  │
│  │  (Thin)     │    │  (Business   │    │   Transfer Objects)│  │
│  │             │    │   Logic)     │    │                   │  │
│  └─────────────┘    └─────────────┘    └───────────────────┘  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│                        Domain Layer                              │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐  │
│  │ Repositories │    │   Models    │    │   Enums /          │  │
│  │ (Data Access)│    │ (Entities)  │    │   Constants        │  │
│  └─────────────┘    └─────────────┘    └───────────────────┘  │
└───────────────────────────────────────────────────────────────┘
┌───────────────────────────────────────────────────────────────┐
│                        Infrastructure Layer                      │
│  ┌─────────────┐    ┌─────────────┐    ┌───────────────────┐  │
│  │   Database   │    │   Cache     │    │   External APIs    │  │
│  │   (MySQL)    │    │   (Redis)   │    │   (Payment, SMS)   │  │
│  └─────────────┘    └─────────────┘    └───────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### **3.2 Repository Pattern Implementation**

- **Purpose:** Decouple **business logic** from **data access**.
- **Structure:**
  ```
  app/
  ├── Repositories/
  │   ├── Contracts/ (Interfaces)
  │   │   └── UserRepositoryInterface.php
  │   └── Eloquent/ (Implementations)
  │       └── EloquentUserRepository.php
  ├── Services/
  │   └── UserService.php (Uses Repository)
  └── Models/
      └── User.php (Eloquent Model)
  ```
- **Rules:**
  - **No direct Eloquent calls in Controllers.**
  - **Repositories must implement interfaces** (for mocking in tests).
  - **Complex queries must be in Repositories**, not in Services.
  - **Use Dependency Injection (Laravel Container) for Repositories.**

### **3.3 Service Layer Implementation**

- **Purpose:** Encapsulate **business logic** (e.g., user registration, payment processing).
- **Rules:**
  - **Services must be stateless.**
  - **Use DTOs (Data Transfer Objects) for input/output.**
  - **Throw Custom Exceptions (not Laravel’s default).**
  - **Log critical operations (using Laravel Logging).**
- **Example:**
  ```php
  namespace App\Services;
  
  class UserService
  {
      public function __construct(
          private UserRepositoryInterface $userRepository
      ) {}
      
      public function registerUser(RegisterUserDTO $dto): UserDTO
      {
          // Business logic here
          $user = $this->userRepository->create($dto->toArray());
          
          // Log registration
          activity()->log('User registered: ' . $user->email);
          
          return new UserDTO($user);
      }
  }
  ```

### **3.4 Controller Rules (Clean &amp; Thin)**

- **Controllers must:**
  - **Only handle HTTP requests/responses.**
  - **Delegate business logic to Services.**
  - **Use Form Requests for validation.**
  - **Return Inertia Responses or API Resources.**
- **Example:**
  ```php
  namespace App\Http\Controllers;
  
  class UserController extends Controller
  {
      public function __construct(
          private UserService $userService
      ) {}
      
      public function store(StoreUserRequest $request)
      {
          $dto = new RegisterUserDTO($request->validated());
          $user = $this->userService->registerUser($dto);
          
          return Inertia::render('Users/Show', [
              'user' => UserResource::make($user)
          ]);
      }
  }
  ```

### **3.5 Data Structures &amp; Algorithms**

- **Use efficient data structures:**
  - **Collections (Laravel) for arrays** (instead of raw `foreach`).
  - **Associative arrays for key-value lookups** (O(1) access).
  - **Avoid nested loops** (O(n²) → Refactor into hash maps).
- **Algorithm Rules:**
  - **Sorting:** Use `Collection::sortBy()` or `usort()` with callbacks.
  - **Searching:** Use `Collection::firstWhere()` or `Arr::first()`.
  - **Pagination:** Always use Laravel’s `paginate()` (not `get()` + manual slicing).

---

## **4. Dynamic Theming &amp; Customization**

### **4.1 Dynamic Color Palette**

- **Storage:** Colors stored in **database (`themes` table)**.
- **Structure:**
  ```sql
  CREATE TABLE `themes` (
      `id` INT PRIMARY KEY AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `is_active` BOOLEAN DEFAULT FALSE,
      `colors` JSON NOT NULL, -- {"primary": "#3B82F6", "secondary": "#1E40AF", ...}
      `created_at` TIMESTAMP,
      `updated_at` TIMESTAMP
  );
  ```
- **Implementation:**
  - **Backend:**
    - **`ThemeService`** (Handles CRUD for themes).
    - **Middleware:** `ApplyThemeMiddleware` (Injects active theme into all views).
  - **Frontend:**
    - **Tailwind Config:** Dynamically generated via **CSS Variables**.
    - **Example:**
      ```css
      /* resources/css/app.css */
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      
      :root {
          --color-primary: {{{ theme('primary') }}};
          --color-secondary: {{{ theme('secondary') }}};
      }
      
      .bg-primary { background-color: var(--color-primary); }
      .text-secondary { color: var(--color-secondary); }
      ```
    - **React Hook:** `useTheme()` (Fetches &amp; applies theme dynamically).

### **4.2 Dynamic Font Loading**

- **Storage:** Fonts stored in **database (`fonts` table)**.
- **Structure:**
  ```sql
  CREATE TABLE `fonts` (
      `id` INT PRIMARY KEY AUTO_INCREMENT,
      `name` VARCHAR(255) NOT NULL,
      `family` VARCHAR(255) NOT NULL, -- e.g., "Inter", "Poppins"
      `url` VARCHAR(255), -- Google Fonts URL
      `is_active` BOOLEAN DEFAULT FALSE,
      `weight` VARCHAR(50) DEFAULT '400,500,600,700',
      `created_at` TIMESTAMP,
      `updated_at` TIMESTAMP
  );
  ```
- **Implementation:**
  - **Backend:**
    - **`FontService`** (Manages font CRUD).
    - **Middleware:** `ApplyFontMiddleware` (Injects active font into layout).
  - **Frontend:**
    - **Dynamic `<link>` injection in `<Head>` (Next.js-style).**
    - **Tailwind Config:** Updates `fontFamily` dynamically.
    - **Example:**
      ```javascript
      // resources/js/Layouts/AppLayout.jsx
      import { Head } from '@inertiajs/react';
      
      export default function AppLayout({ children, font }) {
          return (
              <>
                  <Head>
                      {font?.url && <link href={font.url} rel="stylesheet" />}
                  </Head>
                  <div className={`font-${font?.family.toLowerCase().replace(' ', '-')}`}>
                      {children}
                  </div>
              </>
          );
      }
      ```

### **4.3 Admin Panel for Theming**

- **Features:**
  - **Color Picker** (for primary, secondary, accent, etc.).
  - **Font Selector** (Google Fonts integration).
  - **Live Preview** (before applying).
  - **Reset to Default** (fallback to predefined palette).
- **Security:**
  - **Only super-admin can modify themes.**
  - **Validate color formats** (hex, rgb, hsl).

---

## **5. Multi-Page Architecture**

### **5.1 Page Structure (Inertia.js + React)**

```
resources/js/
├── Pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   ├── Dashboard/
│   │   ├── Index.jsx
│   │   ├── Analytics.jsx
│   │   └── Settings/
│   │       ├── Profile.jsx
│   │       └── ThemeSettings.jsx
│   ├── Frontend/
│   │   ├── Home.jsx
│   │   ├── Pricing.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Blog/
│   │       ├── Index.jsx
│   │       └── Show.jsx
│   └── Admin/
│       ├── Dashboard.jsx
│       ├── Users/
│       │   ├── Index.jsx
│       │   ├── Create.jsx
│       │   └── Edit.jsx
│       └── Themes/
│           ├── Index.jsx
│           └── Edit.jsx
└── Layouts/
    ├── AppLayout.jsx (Main Layout)
    ├── AuthLayout.jsx (Auth Pages)
    └── AdminLayout.jsx (Admin Panel)
```

### **5.2 Route Structure (Laravel)**

```php
// routes/web.php
Route::middleware(['web', 'theme', 'font'])->group(function () {
    // Frontend Routes
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/pricing', [PricingController::class, 'index'])->name('pricing');
    Route::get('/services', [ServiceController::class, 'index'])->name('services');
    
    // Auth Routes
    Route::middleware(['guest'])->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'login']);
    });
    
    // Admin Routes (Protected)
    Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
        Route::resource('users', UserController::class);
        Route::resource('themes', ThemeController::class);
    });
});
```

### **5.3 Shared Layouts &amp; Components**

- **AppLayout.jsx:**
  - **Header (Navbar)**
  - **Footer**
  - **Sidebar (for Admin)**
  - **Theme &amp; Font Provider (Context API)**
- **Reusable Components:**
  - **Buttons, Cards, Modals, Tables, Forms** (Headless UI + Tailwind).
  - **Loading Spinners, Toasts (React Hot Toast).**

---

## **6. Professional &amp; Elegant Color Palette (Default)**

### **6.1 Primary Color Scheme (Default)**


| Color Name       | Hex Code  | Usage                   |
| ---------------- | --------- | ----------------------- |
| **Primary**      | `#2563EB` | Buttons, Links, Accents |
| **Primary Dark** | `#1E40AF` | Hover States            |
| **Secondary**    | `#0891B2` | Call-to-Action Elements |
| **Accent**       | `#06B6D4` | Highlights, Icons       |
| **Success**      | `#10B981` | Success Messages        |
| **Warning**      | `#F59E0B` | Alerts, Warnings        |
| **Error**        | `#EF4444` | Errors, Danger Actions  |
| **Neutral**      | `#F8FAFC` | Backgrounds             |
| **Gray**         | `#6B7280` | Text, Borders           |
| **Dark**         | `#1F2937` | Dark Mode Backgrounds   |


### **6.2 Dark Mode Support**

- **Tailwind Dark Mode:** `class` (not `media`)
- **Toggle:** Stored in **localStorage + Database (user preference)**.
- **Implementation:**
  ```javascript
  // resources/js/Layouts/AppLayout.jsx
  import { useEffect, useState } from 'react';
  
  export default function AppLayout({ children }) {
      const [darkMode, setDarkMode] = useState(false);
      
      useEffect(() => {
          const saved = localStorage.getItem('darkMode') === 'true';
          setDarkMode(saved);
          document.documentElement.classList.toggle('dark', saved);
      }, []);
      
      const toggleDarkMode = () => {
          const newMode = !darkMode;
          setDarkMode(newMode);
          localStorage.setItem('darkMode', newMode);
          document.documentElement.classList.toggle('dark', newMode);
      };
      
      return (
          <div className={darkMode ? 'dark' : ''}>
              <button onClick={toggleDarkMode}>
                  {darkMode ? '☀️' : '🌙'}
              </button>
              {children}
          </div>
      );
  }
  ```

---

## **7. Database Design &amp; Optimization**

### **7.1 Schema Rules**

- **Naming:** `snake_case` (Laravel Convention).
- **Indexes:** Add indexes for **foreign keys, frequently queried columns**.
- **Soft Deletes:** Use `deleted_at` for **users, themes, fonts, etc.**
- **JSON Columns:** Use for **flexible data (e.g., `theme.colors`)**.

### **7.2 Example Tables**

```sql
-- Users Table
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `address` TEXT NULL,
    `role` ENUM('user', 'admin', 'super_admin') DEFAULT 'user',
    `email_verified_at` TIMESTAMP NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP,
    `updated_at` TIMESTAMP,
    `deleted_at` TIMESTAMP NULL
);

-- Themes Table (Dynamic Colors)
CREATE TABLE `themes` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN DEFAULT FALSE,
    `colors` JSON NOT NULL,
    `created_at` TIMESTAMP,
    `updated_at` TIMESTAMP
);

-- Fonts Table (Dynamic Fonts)
CREATE TABLE `fonts` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `family` VARCHAR(255) NOT NULL,
    `url` VARCHAR(512) NULL,
    `is_active` BOOLEAN DEFAULT FALSE,
    `weight` VARCHAR(50) DEFAULT '400,500,600,700',
    `created_at` TIMESTAMP,
    `updated_at` TIMESTAMP
);

-- Services Table (ISP Services)
CREATE TABLE `services` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `speed` VARCHAR(50) NOT NULL, -- e.g., "100 Mbps"
    `is_featured` BOOLEAN DEFAULT FALSE,
    `icon` VARCHAR(50) NULL, -- e.g., "wifi"
    `created_at` TIMESTAMP,
    `updated_at` TIMESTAMP
);

-- Packages Table (Pricing Plans)
CREATE TABLE `packages` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `duration` ENUM('monthly', 'yearly') DEFAULT 'monthly',
    `bandwidth` VARCHAR(50) NOT NULL, -- e.g., "Unlimited"
    `features` JSON NOT NULL, -- ["Free Installation", "24/7 Support"]
    `is_popular` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP,
    `updated_at` TIMESTAMP
);
```

### **7.3 Query Optimization**

- **Avoid N+1 Queries:** Use **Eager Loading (`with()`)**.
- **Use `select()`:** Only fetch required columns.
- **Pagination:** Always use `paginate()` or `simplePaginate()`.
- **Chunking:** For large datasets, use `chunk()`.

---

## **8. Security Rules**

### **8.1 Authentication &amp; Authorization**

- **Laravel Sanctum:** For API token-based auth (if needed).
- **Laravel Fortify:** For admin authentication.
- **Gates &amp; Policies:** For fine-grained permissions.
- **Example Policy:**
  ```php
  namespace App\Policies;
  
  class ThemePolicy
  {
      public function update(User $user, Theme $theme)
      {
          return $user->isSuperAdmin();
      }
  }
  ```

### **8.2 Input Validation**

- **Form Requests:** Always use **dedicated Form Requests**.
- **Example:**
  ```php
  namespace App\Http\Requests;
  
  class StoreThemeRequest extends FormRequest
  {
      public function rules()
      {
          return [
              'name' => 'required|string|max:255',
              'colors' => 'required|json',
              'colors.primary' => 'required|string|regex:/^#[a-f0-9]{6}$/i',
          ];
      }
  }
  ```

### **8.3 CSRF &amp; XSS Protection**

- **CSRF:** Laravel’s built-in middleware (`VerifyCsrfToken`).
- **XSS:** Use `{!! !!}` **only for trusted HTML** (e.g., admin-generated content).
- **Sanitization:** Use `strip_tags()` or `Purifier` for user input.

### **8.4 Rate Limiting**

- **Login Attempts:** `throttle:5,1` (5 attempts per minute).
- **API Endpoints:** `throttle:60,1` (60 requests per minute).

---

## **9. Performance Optimization**

### **9.1 Caching Strategies**

- **Redis:** For **sessions, cache, queues**.
- **Route Caching:** `php artisan route:cache` (Production).
- **Config Caching:** `php artisan config:cache` (Production).
- **View Caching:** `php artisan view:cache` (Production).
- **Query Caching:** Use `Cache::remember()` for expensive queries.

### **9.2 Frontend Optimization**

- **Lazy Loading:** Inertia.js **code splitting**.
- **Image Optimization:** Use **Intervention Image** (resize, compress).
- **Bundle Analyzer:** `npm run dev -- --analyze` (Check bundle size).
- **Tree Shaking:** Ensure unused code is removed.

### **9.3 Database Optimization**

- **Indexes:** Add indexes for **foreign keys, search columns**.
- **Database Pooling:** Use **MySQL connection pooling**.
- **Query Logging:** Disable in production (`DB_LOGGER=false`).

---

## **10. Testing &amp; Quality Assurance**

### **10.1 Testing Framework**

- **PHPUnit:** For backend tests.
- **Pest:** Alternative (if preferred).
- **Jest + React Testing Library:** For frontend tests.

### **10.2 Test Coverage Requirements**


| Layer            | Minimum Coverage |
| ---------------- | ---------------- |
| Controllers      | 90%              |
| Services         | 95%              |
| Repositories     | 100%             |
| React Components | 80%              |


### **10.3 Test Types**

- **Unit Tests:** For **Services, Repositories, Helpers**.
- **Feature Tests:** For **Controllers, API Endpoints**.
- **Integration Tests:** For **full HTTP requests**.
- **E2E Tests:** For **critical user flows** (Cypress).

### **10.4 Example Test (Pest)**

```php
// tests/Feature/Themes/TestThemeCreation.php
it('can create a new theme', function () {
    $user = User::factory()->superAdmin()->create();
    
    $response = $this->actingAs($user)
        ->post('/admin/themes', [
            'name' => 'Dark Theme',
            'colors' => json_encode([
                'primary' => '#1E40AF',
                'secondary' => '#0891B2',
            ]),
        ]);
    
    $response->assertRedirect();
    $this->assertDatabaseHas('themes', ['name' => 'Dark Theme']);
});
```

---

## **11. Deployment &amp; DevOps**

### **11.1 Environment Requirements**


| Environment | PHP Version | Node Version | Database   |
| ----------- | ----------- | ------------ | ---------- |
| Local       | 8.2+        | 18+          | MySQL 8.0+ |
| Staging     | 8.2+        | 18+          | MySQL 8.0+ |
| Production  | 8.2+        | 18+          | MySQL 8.0+ |


### **11.2 Deployment Workflow**

1. **Local Development:**
  - `git clone` → `composer install` → `npm install` → `cp .env.example .env` → `php artisan key:generate`
  - `php artisan migrate:fresh --seed` (for local DB setup)
  - `npm run dev` (Vite)
2. **Staging:**
  - **Pull Request → Auto-Deploy (GitHub Actions / GitLab CI)**
  - Run **tests, linting, static analysis** before deploy.
3. **Production:**
  - **Manual Deployment (or CI/CD)**
  - `php artisan optimize` (Cache routes, config, views)
  - `npm run build` (Production-optimized assets)



---

## **12. Code Quality &amp; Standards**

### **12.1 PHP Coding Standards**

- **PSR-12:** Follow **PSR-12** strictly.
- **Type Declarations:** Always use **return types, parameter types**.
- **DocBlocks:** Use **PHPDoc** for methods, classes.
- **Example:**
  ```php
  /**
   * Register a new user.
   *
   * @param RegisterUserDTO $dto
   * @return UserDTO
   * @throws UserRegistrationException
   */
  public function registerUser(RegisterUserDTO $dto): UserDTO
  {
      // ...
  }
  ```

### **12.2 JavaScript/TypeScript Standards**

- **ESLint:** `eslint-config-airbnb` + `eslint-plugin-react`.
- **Prettier:** For consistent formatting.
- **TypeScript:** `strict: true` in `tsconfig.json`.
- **Example:**
  ```typescript
  interface User {
      id: number;
      name: string;
      email: string;
      role: 'user' | 'admin' | 'super_admin';
  }
  
  const fetchUser = async (id: number): Promise<User> => {
      const response = await axios.get(`/api/users/${id}`);
      return response.data;
  };
  ```

### **12.3 Git Rules**

- **Branching:**
  - `main` (Production)
  - `develop` (Staging)
  - `feature/*` (New features)
  - `bugfix/*` (Bug fixes)
  - `release/*` (Release candidates)
- **Commit Messages:**
  - Use **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`).
  - Example: `feat(auth): add Google OAuth login`
- **Pull Requests:**
  - **Minimum 1 approval** (for non-critical changes).
  - **2+ approvals** (for major changes).
  - **Must pass all tests &amp; linting.**

---

## **13. Third-Party Integrations**

###  **Maps &amp; Location**

- **Google Maps API / Mapbox** (For service area visualization).

---

## **14. Project Structure (Final)**

```
isp-provider-website/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Resources/
│   ├── Models/
│   ├── Repositories/
│   │   ├── Contracts/
│   │   └── Eloquent/
│   ├── Services/
│   ├── DTOs/
│   ├── Enums/
│   └── Providers/
├── bootstrap/
├── config/
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── public/
├── resources/
│   ├── css/
│   ├── js/
│   │   ├── Pages/
│   │   ├── Layouts/
│   │   ├── Components/
│   │   └── hooks/
│   └── views/
├── routes/
├── storage/
├── tests/
│   ├── Unit/
│   ├── Feature/
│   └── Browser/
├── .env
├── .eslintrc.js
├── .prettierrc
├── composer.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.js
```

---

## **15. Non-Negotiable Rules (Must Follow)**

✅ **No direct Eloquent calls in Controllers.**  
✅ **No business logic in Controllers.**  
✅ **No hardcoded colors/fonts (must be dynamic).**  
✅ **No `any` type in TypeScript (use proper types).**  
✅ **No N+1 queries (always eager load).**  
✅ **No `dd()` or `dump()` in production.**  
✅ **All external inputs must be validated.**  
✅ **All database changes must be in migrations.**  
✅ **All tests must pass before merging.**  
✅ **Code must follow PSR-12 / ESLint rules.**

---

## **16. Next Steps**

1. **Setup Project Skeleton** (Laravel + Inertia + React + Tailwind).
2. **Implement Dynamic Theming System** (Database + Middleware + Frontend).
3. **Implement Dynamic Font Loading** (Database + Middleware + Frontend).
4. **Setup Repository &amp; Service Layer** (Base classes + interfaces).
5. **Create Multi-Page Structure** (Inertia.js + React).
6. **Implement Authentication** (Laravel Fortify + Sanctum).
7. **Build Admin Panel** (CRUD for Themes, Fonts, Users, etc.).
8. **Add Frontend Pages** (Home, Pricing, Services, etc.).
9. **Optimize Performance** (Caching, Lazy Loading, etc.).
10. **Write Tests** (PHPUnit, Pest, Jest).
11. **Deploy to Staging** (Test in real environment).
12. **Final Deployment to Production**.

---

## **17. References &amp; Inspirations**

- **Laravel Best Practices:** [Laravel Docs](https://laravel.com/docs)
- **React Best Practices:** [React Docs](https://react.dev/learn)
- **Tailwind CSS Best Practices:** [Tailwind Docs](https://tailwindcss.com/docs)
- **Clean Architecture:** [Uncle Bob’s Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- **Repository Pattern:** [Martin Fowler](https://martinfowler.com/eaaCatalog/repository.html)

---

**Document Version:** `1.0.0`  
**Last Updated:** `August 22, 2026`  
**Author:** `Towfique Emrose`  
**Organization:** `Towfique Emrose`
