<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSocialMediaImageRequest;
use App\Http\Requests\Admin\StoreSocialMediaItemRequest;
use App\Http\Requests\Admin\UpdateSocialMediaItemRequest;
use App\Services\SocialMediaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminSocialMediaController extends Controller
{
    public function __construct(
        private SocialMediaService $socialMediaService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Admin/SocialMedia/Index', [
            'items' => $this->socialMediaService->getAllItems()
                ->map(fn ($item) => $item->only(['id', 'name', 'image', 'link', 'is_active', 'sort_order'])),
        ]);
    }

    public function store(StoreSocialMediaItemRequest $request): RedirectResponse
    {
        $this->socialMediaService->createItem($request->validated());

        return redirect()
            ->route('admin.social-media.index')
            ->with('success', 'Social media item created successfully.');
    }

    public function update(UpdateSocialMediaItemRequest $request, int $id): RedirectResponse
    {
        $this->socialMediaService->updateItem($id, $request->validated());

        return redirect()
            ->route('admin.social-media.index')
            ->with('success', 'Social media item updated successfully.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->socialMediaService->deleteItem($id);

        return redirect()
            ->route('admin.social-media.index')
            ->with('success', 'Social media item deleted successfully.');
    }

    public function toggleStatus(int $id): RedirectResponse
    {
        $this->socialMediaService->toggleStatus($id);

        return back()->with('success', 'Social media item status updated.');
    }

    public function upload(StoreSocialMediaImageRequest $request): JsonResponse
    {
        $url = $this->socialMediaService->storeImage($request->file('image'));

        return response()->json(['url' => $url]);
    }
}
