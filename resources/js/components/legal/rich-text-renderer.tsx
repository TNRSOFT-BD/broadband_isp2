import { type JSONContent } from '@tiptap/react';

interface RichTextRendererProps {
    content: JSONContent | null;
    className?: string;
}

function renderNode(node: JSONContent, index: number): React.ReactNode {
    if (!node.type) return null;

    switch (node.type) {
        case 'doc':
            return (
                <div key={index}>
                    {node.content?.map((child, i) => renderNode(child, i))}
                </div>
            );

        case 'paragraph':
            return (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </p>
            );

        case 'heading': {
            const level = node.attrs?.level || 2;
            const id = node.content?.map((c) => c.text || '').join('') || '';
            const slug = id
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');            const headingClasses: Record<number, string> = {
                1: 'text-3xl font-bold mb-6 mt-8',
                2: 'text-2xl font-bold mb-4 mt-8',
                3: 'text-xl font-semibold mb-3 mt-6',
                4: 'text-lg font-semibold mb-2 mt-4',
            };
            const cls = `${headingClasses[level] || 'text-lg font-semibold mb-3 mt-6'} text-gray-900 scroll-mt-24`;
            const content = node.content?.map((child, i) => renderNode(child, i));

            if (level === 1) return <h1 key={index} id={slug} className={cls}>{content}</h1>;
            if (level === 2) return <h2 key={index} id={slug} className={cls}>{content}</h2>;
            if (level === 3) return <h3 key={index} id={slug} className={cls}>{content}</h3>;
            return <h4 key={index} id={slug} className={cls}>{content}</h4>;
        }

        case 'text':
            let text: React.ReactNode = node.text || '';

            if (node.marks) {
                for (const mark of node.marks) {
                    switch (mark.type) {
                        case 'bold':
                            text = <strong className="font-bold text-gray-900">{text}</strong>;
                            break;
                        case 'italic':
                            text = <em className="italic">{text}</em>;
                            break;
                        case 'underline':
                            text = <u className="underline">{text}</u>;
                            break;
                        case 'strike':
                            text = <s className="line-through">{text}</s>;
                            break;
                        case 'code':
                            text = (
                                <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
                                    {text}
                                </code>
                            );
                            break;
                        case 'link':
                            text = (
                                <a
                                    href={mark.attrs?.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                                >
                                    {text}
                                </a>
                            );
                            break;
                        case 'highlight':
                            text = <mark className="bg-yellow-200/60 px-0.5">{text}</mark>;
                            break;
                        case 'textStyle':
                            text = (
                                <span style={{ color: mark.attrs?.color }}>
                                    {text}
                                </span>
                            );
                            break;
                    }
                }
            }

            return <span key={index}>{text}</span>;

        case 'bulletList':
            return (
                <ul key={index} className="mb-4 list-disc pl-6 space-y-2">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </ul>
            );

        case 'orderedList':
            return (
                <ol key={index} className="mb-4 list-decimal pl-6 space-y-2">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </ol>
            );

        case 'listItem':
            return (
                <li key={index} className="leading-relaxed text-gray-700">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </li>
            );

        case 'blockquote':
            return (
                <blockquote
                    key={index}
                    className="my-6 border-l-4 border-[var(--isp-primary)]/30 bg-gray-50 py-3 pl-6 italic text-gray-600"
                >
                    {node.content?.map((child, i) => renderNode(child, i))}
                </blockquote>
            );

        case 'horizontalRule':
            return (
                <hr
                    key={index}
                    className="my-8 border-t border-gray-200"
                />
            );

        case 'table':
            return (
                <div key={index} className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg border border-gray-200 text-sm">
                        {node.content?.map((child, i) => renderNode(child, i))}
                    </table>
                </div>
            );

        case 'tableRow':
            return (
                <tr key={index} className="border-b last:border-b-0">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </tr>
            );

        case 'tableHeader':
            return (
                <th
                    key={index}
                    className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900"
                >
                    {node.content?.map((child, i) => renderNode(child, i))}
                </th>
            );

        case 'tableCell':
            return (
                <td key={index} className="border border-gray-200 px-4 py-2 text-gray-700">
                    {node.content?.map((child, i) => renderNode(child, i))}
                </td>
            );

        case 'image':
            return (
                <img
                    key={index}
                    src={node.attrs?.src}
                    alt={node.attrs?.alt || ''}
                    className="my-4 max-w-full rounded-lg"
                />
            );

        default:
            if (node.content) {
                return (
                    <div key={index}>
                        {node.content.map((child, i) => renderNode(child, i))}
                    </div>
                );
            }
            return null;
    }
}

export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
    if (!content) {
        return (
            <div className="py-8 text-center text-muted-foreground">
                <p>No content available.</p>
            </div>
        );
    }

    return (            <div className={`prose prose-lg max-w-none text-gray-700 ${className}`}>
            {renderNode(content, 0)}
        </div>
    );
}
