"use client"

import React from 'react';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export type TEditorProps = {
    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
}

export default function Editor({ content, setContent }: TEditorProps) {

    return (
        <MdEditor
            language="en-US"
            modelValue={content}
            onChange={setContent}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
            }}
            toolbars={[
                'bold',
                'underline',
                'italic',
                '-',
                'strikeThrough',
                'sub',
                'sup',
                'quote',
                'unorderedList',
                'orderedList',
                'task',
                '-',
                'codeRow',
                'code',
                'link',
                // 'image',
                'table',
                'mermaid',
                '-',
                'revoke',
                'next',
                '=',
                'preview',
            ]}
        />
    );
}

export function EditorComponent({ content, setContent }: TEditorProps) {

    return (
        <MdEditor
            language="en-US"
            maxLength={2048}
            modelValue={content}
            onChange={setContent}
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
            }}
            toolbars={[]}
        />
    );
}
