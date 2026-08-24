<?php

namespace App\Repositories\Contracts;

use App\Models\ContactInquiryType;
use Illuminate\Database\Eloquent\Collection;

interface ContactInquiryTypeRepositoryInterface
{
    public function getActiveOrdered(): Collection;

    public function getAll(): Collection;

    public function findById(int $id): ?ContactInquiryType;

    public function findBySlug(string $slug): ?ContactInquiryType;

    public function create(array $data): ContactInquiryType;

    public function update(int $id, array $data): ContactInquiryType;

    public function delete(int $id): bool;

    public function toggleStatus(int $id): ContactInquiryType;
}
