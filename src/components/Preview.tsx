"use client"

import React from 'react'
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

export default function Preview({ value }: { value: string }) {
    return (
        <MdPreview
            modelValue={value}
            language="en-US"
            style={{
                width: "100%",
                height: "100%",
                border: "none",
            }}
        />
    )
}

