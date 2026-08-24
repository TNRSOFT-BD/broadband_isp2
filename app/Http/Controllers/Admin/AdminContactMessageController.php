<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Services\ContactInquiryTypeService;
use App\Services\ContactMessageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminContactMessageController extends Controller
{
    public function __construct(
        private ContactMessageService $messageService,
        private ContactInquiryTypeService $inquiryTypeService,
    ) {}

    /**
     * List all contact messages with filters.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'search' => $request->input('search'),
            'status' => $request->input('status'),
            'inquiry_type_id' => $request->input('inquiry_type_id'),
        ];

        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $this->messageService->getPaginatedMessages($filters),
            'inquiryTypes' => $this->inquiryTypeService->getAllTypes()
                ->map(fn ($type) => $type->only(['id', 'name', 'slug'])),
            'filters' => $filters,
            'counts' => $this->messageService->getCounts(),
            'statuses' => ContactMessage::STATUSES,
        ]);
    }

    /**
     * Show a single message detail.
     */
    public function show(int $id): Response
    {
        $message = $this->messageService->findById($id);

        abort_if(! $message, 404);

        // Auto-mark as read
        $this->messageService->markAsRead($id);

        return Inertia::render('Admin/ContactMessages/Show', [
            'message' => [
                ...$message->toArray(),
                'inquiryType' => $message->inquiryType?->only(['id', 'name', 'slug']),
            ],
            'statuses' => ContactMessage::STATUSES,
        ]);
    }

    /**
     * Update message status.
     */
    public function updateStatus(Request $request, int $id): RedirectResponse
    {
        $request->validate([
            'status' => ['required', 'string', 'in:' . implode(',', array_keys(ContactMessage::STATUSES))],
        ]);

        $this->messageService->updateStatus($id, $request->input('status'));

        return back()->with('success', 'Message status updated.');
    }

    /**
     * Delete a message.
     */
    public function destroy(int $id): RedirectResponse
    {
        $this->messageService->deleteMessage($id);

        return redirect()
            ->route('admin.contact-messages.index')
            ->with('success', 'Message deleted.');
    }
}
