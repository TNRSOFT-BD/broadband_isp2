import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { type JSONContent } from '@tiptap/react';
import RichTextRenderer from '@/components/legal/rich-text-renderer';
import LegalTableOfContents from '@/components/legal/legal-table-of-contents';
import { Calendar, ArrowRight } from 'lucide-react';

interface LegalPageData {
    id: number;
    title: string;
    slug: string;
    page_type: string;
    short_description: string | null;
    content_json: JSONContent | null;
    content_html: string | null;
    status: string;
    published_at: string | null;
    last_updated_at: string | null;
    show_last_updated: boolean;
    meta_title: string | null;
    meta_description: string | null;
    og_title: string | null;
    og_description: string | null;
    og_image: string | null;
    cta_enabled: boolean;
    cta_title: string | null;
    cta_description: string | null;
    cta_button_text: string | null;
    cta_button_url: string | null;
}

interface PageProps {
    page: LegalPageData;
    isPreview?: boolean;
}

export default function LegalShow() {
    const { page, isPreview } = usePage().props as unknown as PageProps;

    const displayDate = page.last_updated_at || page.published_at;

    return (
        <PublicLayout>
            <Head>
                <title>{page.meta_title || page.title}</title>
                {page.meta_description && <meta name="description" content={page.meta_description} />}
                {page.og_title && <meta property="og:title" content={page.og_title} />}
                {page.og_description && <meta property="og:description" content={page.og_description} />}
                {page.og_image && <meta property="og:image" content={page.og_image} />}
                <meta property="og:type" content="website" />
            </Head>

            {/* Preview Banner */}
            {isPreview && (
                <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-center text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    ⚠️ Preview Mode — This page is not publicly visible.
                </div>
            )}

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-white pb-12 pt-24">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                            <Link href="/" className="transition-colors hover:text-gray-900">
                                Home
                            </Link>
                            <span className="text-gray-300">/</span>
                            <span className="text-gray-900">{page.title}</span>
                        </nav>

                        {/* Page Title */}
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            {page.title}
                        </h1>

                        {/* Short Description */}
                        {page.short_description && (
                            <p className="mt-4 max-w-2xl text-lg text-gray-500">
                                {page.short_description}
                            </p>
                        )}

                        {/* Last Updated */}
                        {page.show_last_updated && displayDate && (
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                                <Calendar className="h-4 w-4" />
                                <span>
                                    Last updated:{' '}
                                    {new Date(displayDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                {/* Content Section */}
                <section className="bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex gap-8 lg:gap-12">
                            {/* Table of Contents (Sidebar) */}
                            <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-64 shrink-0 overflow-y-auto self-start lg:block">
                                <LegalTableOfContents content={page.content_json} />
                            </aside>

                            {/* Main Content */}
                            <article className="min-w-0 flex-1">
                                {/* Mobile TOC */}
                                <div className="mb-6 lg:hidden">
                                    <LegalTableOfContents content={page.content_json} showByDefault={false} />
                                </div>

                                {/* Content */}
                                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                                    <RichTextRenderer content={page.content_json} />
                                </div>

                                {/* Bottom CTA */}
                                {page.cta_enabled && (
                                    <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
                                        {page.cta_title && (
                                            <h3 className="text-xl font-bold text-gray-900">{page.cta_title}</h3>
                                        )}
                                        {page.cta_description && (
                                            <p className="mx-auto mt-2 max-w-md text-gray-500">
                                                {page.cta_description}
                                            </p>
                                        )}
                                        {page.cta_button_text && page.cta_button_url && (
                                            <Link
                                                href={page.cta_button_url}
                                                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--isp-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--isp-primary)]/90 hover:shadow-lg hover:shadow-[var(--isp-primary)]/20"
                                            >
                                                {page.cta_button_text}
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </article>
                        </div>
                    </div>
                </section>
            </main>
        </PublicLayout>
    );
}
