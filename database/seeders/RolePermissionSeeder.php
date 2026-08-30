<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Seed roles and permissions for the admin panel.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ── Permissions ──────────────────────────────────────────────
        $permissions = [
            // Dashboard
            'view-dashboard',

            // Plans
            'view-plans',
            'create-plans',
            'edit-plans',
            'delete-plans',

            // Plan Categories
            'view-plan-categories',
            'create-plan-categories',
            'edit-plan-categories',
            'delete-plan-categories',

            // Services
            'view-services',
            'create-services',
            'edit-services',
            'delete-services',

            // Homepage
            'view-homepage',
            'edit-homepage',
            'manage-homepage-partners',
            'manage-homepage-intro-features',
            'manage-homepage-testimonials',
            'manage-homepage-faqs',
            'manage-homepage-coverage',

            // Hero Config
            'view-hero-config',
            'edit-hero-config',

            // Contact
            'view-contact-messages',
            'manage-contact-messages',
            'delete-contact-messages',
            'manage-quick-contact-methods',
            'manage-inquiry-types',
            'manage-office-locations',

            // Pages
            'manage-plans-page',
            'manage-about-page',
            'manage-contact-page',

            // Website Config
            'view-website-config',
            'edit-website-config',

            // Users
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',

            // Roles & Permissions
            'manage-roles',

            // Profile
            'edit-own-profile',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // ── Roles ────────────────────────────────────────────────────

        // Super Admin – full access
        $superAdmin = Role::firstOrCreate(['name' => 'super_admin', 'guard_name' => 'web']);
        $superAdmin->update(['prefix' => 'admin']);
        $superAdmin->givePermissionTo($permissions);

        // Admin – most access except user/role management
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->update(['prefix' => 'admin']);
        $admin->givePermissionTo([
            'view-dashboard',
            'view-plans', 'create-plans', 'edit-plans', 'delete-plans',
            'view-plan-categories', 'create-plan-categories', 'edit-plan-categories', 'delete-plan-categories',
            'view-services', 'create-services', 'edit-services', 'delete-services',
            'view-homepage', 'edit-homepage',
            'manage-homepage-partners', 'manage-homepage-intro-features',
            'manage-homepage-testimonials', 'manage-homepage-faqs', 'manage-homepage-coverage',
            'view-hero-config', 'edit-hero-config',
            'view-contact-messages', 'manage-contact-messages', 'delete-contact-messages',
            'manage-quick-contact-methods', 'manage-inquiry-types', 'manage-office-locations',
            'manage-plans-page', 'manage-about-page', 'manage-contact-page',
            'view-website-config', 'edit-website-config',
            'edit-own-profile',
        ]);

        // Editor – read + edit, no delete, no config
        $editor = Role::firstOrCreate(['name' => 'editor', 'guard_name' => 'web']);
        $editor->update(['prefix' => 'editor']);
        $editor->givePermissionTo([
            'view-dashboard',
            'view-plans', 'create-plans', 'edit-plans',
            'view-plan-categories', 'create-plan-categories', 'edit-plan-categories',
            'view-services', 'create-services', 'edit-services',
            'view-homepage', 'edit-homepage',
            'manage-homepage-partners', 'manage-homepage-intro-features',
            'manage-homepage-testimonials', 'manage-homepage-faqs', 'manage-homepage-coverage',
            'view-hero-config', 'edit-hero-config',
            'view-contact-messages', 'manage-contact-messages',
            'manage-quick-contact-methods', 'manage-inquiry-types', 'manage-office-locations',
            'manage-plans-page', 'manage-about-page', 'manage-contact-page',
            'edit-own-profile',
        ]);

        // Viewer – read-only
        $viewer = Role::firstOrCreate(['name' => 'viewer', 'guard_name' => 'web']);
        $viewer->update(['prefix' => 'viewer']);
        $viewer->givePermissionTo([
            'view-dashboard',
            'view-plans',
            'view-plan-categories',
            'view-services',
            'view-homepage',
            'view-hero-config',
            'view-contact-messages',
            'edit-own-profile',
        ]);

        // ── Ensure all roles have a prefix ──────────────────────────
        // If a role was created manually without a prefix, set it to the role name
        Role::whereNull('prefix')->each(function ($role) {
            $role->update(['prefix' => $role->name]);
        });

        // ── Assign default role to existing admin ────────────────────
        $adminUser = \App\Models\User::where('email', 'admin@gmail.com')->first();
        if ($adminUser && ! $adminUser->hasRole('super_admin')) {
            $adminUser->assignRole('super_admin');
        }
    }
}
