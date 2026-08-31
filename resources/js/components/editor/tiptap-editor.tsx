import { useEditor, EditorContent, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { Highlight } from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TiptapToolbar from './tiptap-toolbar';
import { useEffect } from 'react';

interface TiptapEditorProps {
    value: JSONContent | null;
    onChange: (value: JSONContent) => void;
    placeholder?: string;
    editable?: boolean;
    minHeight?: string;
}

export default function TiptapEditor({
    value,
    onChange,
    placeholder = 'Start writing...',
    editable = true,
    minHeight = '400px',
}: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3, 4],
                },
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                link: false,
                underline: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                multicolor: false,
            }),
            TextStyle,
            Color,
            Placeholder.configure({
                placeholder,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content: value ?? undefined,
        editable,
        onUpdate: ({ editor: ed }) => {
            onChange(ed.getJSON());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] px-4 py-3',
                style: `min-height: ${minHeight}`,
            },
        },
    });

    // Sync external value changes
    useEffect(() => {
        if (editor && value) {
            const currentJSON = JSON.stringify(editor.getJSON());
            const newJSON = JSON.stringify(value);
            if (currentJSON !== newJSON) {
                editor.commands.setContent(value);
            }
        }
    }, [value, editor]);

    if (!editor) {
        return (
            <div className="flex h-64 items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">Loading editor...</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-md border border-input">
            {editable && <TiptapToolbar editor={editor} />}
            <EditorContent editor={editor} className="legal-page-editor" />
        </div>
    );
}
