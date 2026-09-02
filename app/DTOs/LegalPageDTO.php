<?php

namespace App\DTOs;

use App\Models\LegalPage;

class LegalPageDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $title,
        public readonly string $slug,
        public readonly string $pageType,
        public readonly ?string $shortDescription,
        public readonly ?array $contentJson,
        public readonly ?string $contentHtml,
        public readonly string $status,
        public readonly ?string $publishedAt,
        public readonly ?string $lastUpdatedAt,
        public readonly bool $showLastUpdated,
        public readonly ?string $metaTitle,
        public readonly ?string $metaDescription,
        public readonly ?string $ogTitle,
        public readonly ?string $ogDescription,
        public readonly ?string $ogImage,
        public readonly bool $ctaEnabled,
        public readonly ?string $ctaTitle,
        public readonly ?string $ctaDescription,
        public readonly ?string $ctaButtonText,
        public readonly ?string $ctaButtonUrl,
        public readonly ?int $sortOrder,
        public readonly ?string $createdAt = null,
        public readonly ?string $updatedAt = null,
    ) {}

    public static function fromModel(LegalPage $page): self
    {
        return new self(
            id: $page->id,
            title: $page->title,
            slug: $page->slug,
            pageType: $page->page_type,
            shortDescription: $page->short_description,
            contentJson: $page->content_json,
            contentHtml: $page->content_html,
            status: $page->status,
            publishedAt: $page->published_at?->toISOString(),
            lastUpdatedAt: $page->last_updated_at?->toISOString(),
            showLastUpdated: $page->show_last_updated,
            metaTitle: $page->meta_title,
            metaDescription: $page->meta_description,
            ogTitle: $page->og_title,
            ogDescription: $page->og_description,
            ogImage: $page->og_image,
            ctaEnabled: $page->cta_enabled,
            ctaTitle: $page->cta_title,
            ctaDescription: $page->cta_description,
            ctaButtonText: $page->cta_button_text,
            ctaButtonUrl: $page->cta_button_url,
            sortOrder: $page->sort_order,
            createdAt: $page->created_at?->toISOString(),
            updatedAt: $page->updated_at?->toISOString(),
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'page_type' => $this->pageType,
            'short_description' => $this->shortDescription,
            'content_json' => $this->contentJson,
            'content_html' => $this->contentHtml,
            'status' => $this->status,
            'published_at' => $this->publishedAt,
            'last_updated_at' => $this->lastUpdatedAt,
            'show_last_updated' => $this->showLastUpdated,
            'meta_title' => $this->metaTitle,
            'meta_description' => $this->metaDescription,
            'og_title' => $this->ogTitle,
            'og_description' => $this->ogDescription,
            'og_image' => $this->ogImage,
            'cta_enabled' => $this->ctaEnabled,
            'cta_title' => $this->ctaTitle,
            'cta_description' => $this->ctaDescription,
            'cta_button_text' => $this->ctaButtonText,
            'cta_button_url' => $this->ctaButtonUrl,
            'sort_order' => $this->sortOrder,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}
