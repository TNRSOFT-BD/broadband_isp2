<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'inquiry_type_id',
        'name',
        'phone',
        'email',
        'subject',
        'message',
        'additional_data',
        'status',
        'read_at',
        'resolved_at',
    ];

    protected $casts = [
        'additional_data' => 'array',
        'read_at' => 'datetime',
        'resolved_at' => 'datetime',
    ];

    public const STATUSES = [
        'new' => 'New',
        'read' => 'Read',
        'in_progress' => 'In Progress',
        'replied' => 'Replied',
        'resolved' => 'Resolved',
        'archived' => 'Archived',
    ];

    public function inquiryType(): BelongsTo
    {
        return $this->belongsTo(ContactInquiryType::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderByDesc('created_at');
    }

    public function scopeByStatus($query, ?string $status)
    {
        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        return $query;
    }

    public function scopeByInquiryType($query, ?int $typeId)
    {
        if ($typeId) {
            $query->where('inquiry_type_id', $typeId);
        }

        return $query;
    }

    public function scopeSearch($query, ?string $search)
    {
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        return $query;
    }

    public function markAsRead(): void
    {
        if ($this->status === 'new') {
            $this->update(['status' => 'read', 'read_at' => now()]);
        }
    }

    public function markAsResolved(): void
    {
        $this->update(['status' => 'resolved', 'resolved_at' => now()]);
    }
}
