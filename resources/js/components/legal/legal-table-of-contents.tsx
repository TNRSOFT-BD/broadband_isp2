import { type JSONContent } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TocItem {
    id: string;
    text: string;
    level: number;
}

function extractHeadings(content: JSONContent | null): TocItem[] {
    if (!content) return [];

    const headings: TocItem[] = [];

    function walk(node: JSONContent) {
        if (node.type === 'heading') {
            const text = node.content?.map((c) => c.text || '').join('') || '';
            const level = node.attrs?.level || 2;
            const slug = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');

            headings.push({ id: slug, text, level });
        }

        if (node.content) {
            node.content.forEach(walk);
        }
    }

    walk(content);

    return headings;
}

interface LegalTableOfContentsProps {
    content: JSONContent | null;
    showByDefault?: boolean;
}

export default function LegalTableOfContents({
    content,
    showByDefault = true,
}: LegalTableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(showByDefault);
    const [activeId, setActiveId] = useState('');
    const headings = extractHeadings(content);

    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: '-80px 0px -70% 0px' }
        );

        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-sm font-semibold text-foreground"
            >
                <span className="text-gray-900">On This Page</span>
                {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                ) : (
                    <ChevronRight className="h-4 w-4" />
                )}
            </button>

            {isOpen && (
                <nav className="mt-3 space-y-1">
                    {headings.map((heading) => (
                        <a
                            key={heading.id}
                            href={`#${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById(heading.id);
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            className={`block py-1 text-sm transition-colors hover:text-[var(--isp-primary)] ${
                                heading.level === 1
                                    ? 'pl-0 font-medium'
                                    : heading.level === 2
                                        ? 'pl-0'
                                        : heading.level === 3
                                            ? 'pl-3'
                                            : 'pl-6'
                            } ${
                                activeId === heading.id
                                    ? 'font-medium text-[var(--isp-primary)]'
                                    : 'text-gray-500'
                            }`}
                        >
                            {heading.text}
                        </a>
                    ))}
                </nav>
            )}
        </div>
    );
}
