import type { Editor } from '@tiptap/react';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    List,
    ListOrdered,
    Link,
    Quote,
    Minus,
    Undo2,
    Redo2,
    Highlighter,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Code,
    TableIcon,
    Palette,
    RemoveFormatting,
} from 'lucide-react';
import { useCallback, useState } from 'react';

interface TiptapToolbarProps {
    editor: Editor;
}

function ToolbarButton({
    onClick,
    isActive = false,
    disabled = false,
    title,
    children,
}: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${
                isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        >
            {children}
        </button>
    );
}

function ToolbarSeparator() {
    return <div className="mx-1 h-6 w-px bg-border" />;
}

export default function TiptapToolbar({ editor }: TiptapToolbarProps) {
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [showColorInput, setShowColorInput] = useState(false);

    const setLink = useCallback(() => {
        if (linkUrl === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
        } else {
            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: linkUrl })
                .run();
        }
        setShowLinkInput(false);
        setLinkUrl('');
    }, [editor, linkUrl]);

    const limitedColors = [
        '#2563EB',
        '#0891B2',
        '#06B6D4',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#1F2937',
        '#6B7280',
    ];

    return (
        <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/30 px-2 py-1.5">
            {/* Text format group */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                title="Bold (Ctrl+B)"
            >
                <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                title="Italic (Ctrl+I)"
            >
                <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                title="Underline (Ctrl+U)"
            >
                <Underline className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive('strike')}
                title="Strikethrough"
            >
                <Strikethrough className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Headings */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                title="Heading 1"
            >
                <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                title="Heading 2"
            >
                <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editor.isActive('heading', { level: 3 })}
                title="Heading 3"
            >
                <Heading3 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                isActive={editor.isActive('heading', { level: 4 })}
                title="Heading 4"
            >
                <Heading4 className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Lists */}
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive('orderedList')}
                title="Ordered List"
            >
                <ListOrdered className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Alignment */}
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
            >
                <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                title="Align Center"
            >
                <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                title="Align Right"
            >
                <AlignRight className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                isActive={editor.isActive({ textAlign: 'justify' })}
                title="Justify"
            >
                <AlignJustify className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Insert group */}
            <div className="relative">
                <ToolbarButton
                    onClick={() => {
                        if (editor.isActive('link')) {
                            setLinkUrl(editor.getAttributes('link').href || '');
                        }
                        setShowLinkInput(!showLinkInput);
                    }}
                    isActive={editor.isActive('link')}
                    title="Insert Link"
                >
                    <Link className="h-4 w-4" />
                </ToolbarButton>
                {showLinkInput && (
                    <div className="absolute left-0 top-full z-50 mt-1 flex gap-1 rounded-md border bg-background p-2 shadow-md">
                        <input
                            type="url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://..."
                            className="h-8 w-64 rounded-md border bg-transparent px-2 text-sm"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') setLink();
                            }}
                        />
                        <button
                            type="button"
                            onClick={setLink}
                            className="h-8 rounded-md bg-primary px-3 text-xs text-primary-foreground"
                        >
                            Apply
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowLinkInput(false);
                                setLinkUrl('');
                            }}
                            className="h-8 rounded-md bg-muted px-3 text-xs"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                title="Blockquote"
            >
                <Quote className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Rule"
            >
                <Minus className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Color */}
            <div className="relative">
                <ToolbarButton
                    onClick={() => setShowColorInput(!showColorInput)}
                    title="Text Color"
                >
                    <Palette className="h-4 w-4" />
                </ToolbarButton>
                {showColorInput && (
                    <div className="absolute left-0 top-full z-50 mt-1 flex flex-wrap gap-1 rounded-md border bg-background p-2 shadow-md">
                        {limitedColors.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => {
                                    editor.chain().focus().setColor(color).run();
                                    setShowColorInput(false);
                                }}
                                className="h-6 w-6 rounded-md border-2 transition-transform hover:scale-110"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                editor.chain().focus().unsetColor().run();
                                setShowColorInput(false);
                            }}
                            className="h-6 w-6 rounded-md border border-dashed"
                            title="Remove color"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive('highlight')}
                title="Highlight"
            >
                <Highlighter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive('code')}
                title="Inline Code"
            >
                <Code className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* Table */}
            <ToolbarButton
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                }
                title="Insert Table"
            >
                <TableIcon className="h-4 w-4" />
            </ToolbarButton>

            {/* Clear formatting */}
            <ToolbarButton
                onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                title="Clear Formatting"
            >
                <RemoveFormatting className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarSeparator />

            {/* History */}
            <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Undo (Ctrl+Z)"
            >
                <Undo2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Redo (Ctrl+Shift+Z)"
            >
                <Redo2 className="h-4 w-4" />
            </ToolbarButton>
        </div>
    );
}
