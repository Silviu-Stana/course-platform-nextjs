'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import 'react-quill-new/dist/quill.bubble.css';

interface PreviewProps {
    value: string;
}

export const Preview = ({ value }: PreviewProps) => {
    //Imported react quill without server side rendering (to avoid hydration errors)
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill-new'), { ssr: false }),
        []
    );

    return <ReactQuill theme="bubble" value={value} readOnly />;
};
