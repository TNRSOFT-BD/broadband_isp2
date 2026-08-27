<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Services\RoleService;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function __construct(
        private UserService $userService,
        private RoleService $roleService,
    ) {}

    /**
     * Display a listing of all users.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => $this->userService->getAllUsers(),
        ]);
    }

    /**
     * Show the form for creating a new user.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Users/Create', [
            'roles' => $this->roleService->getAllRoles(),
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->userService->createUser($request->validated());

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(int $id): Response
    {
        $user = $this->userService->getUser($id);

        abort_unless($user, 404);

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $this->roleService->getAllRoles(),
        ]);
    }

    /**
     * Update the specified user.
     */
    public function update(UpdateUserRequest $request, int $id): RedirectResponse
    {
        $this->userService->updateUser($id, $request->validated());

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(int $id): RedirectResponse
    {
        $deleted = $this->userService->deleteUser($id);

        if (! $deleted) {
            return back()->withErrors(['error' => 'Cannot delete this user.']);
        }

        return redirect()
            ->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
