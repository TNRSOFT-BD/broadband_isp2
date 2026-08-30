<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRoleRequest;
use App\Http\Requests\Admin\UpdateRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function __construct(
        private RoleService $roleService,
    ) {}

    /**
     * Display a listing of all roles.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $this->roleService->getAllRoles(),
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $this->roleService->getPermissionsGrouped(),
        ]);
    }

    /**
     * Store a newly created role.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        $this->roleService->createRole($request->validated());

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role created successfully.');
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(int $id): Response
    {
        $role = $this->roleService->getRole($id);

        abort_unless($role, 404);

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $this->roleService->getPermissionsGrouped(),
        ]);
    }

    /**
     * Update the specified role.
     */
    public function update(UpdateRoleRequest $request, int $id): RedirectResponse
    {
        $this->roleService->updateRole($id, $request->validated());

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified role.
     */
    public function destroy(int $id): RedirectResponse
    {
        $deleted = $this->roleService->deleteRole($id);

        if (! $deleted) {
            return back()->withErrors(['error' => 'Cannot delete a system role.']);
        }

        return redirect()
            ->route('admin.roles.index')
            ->with('success', 'Role deleted successfully.');
    }
}
