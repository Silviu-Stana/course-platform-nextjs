'use client';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
}

export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished,
}: ChapterActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(
                `/api/courses/${courseId}/chapters/${chapterId}`
            );
            toast.success('Chapter Deleted');
            router.push(`/teacher/courses/${courseId}`);
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={() => {}}
                disabled={disabled || isLoading}
                variant="outline"
                size={'sm'}
            >
                {isPublished ? 'Unpublish' : 'Publish'}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                    size={'sm'}
                    variant={'destructive'}
                    disabled={isLoading}
                    className="disabled:bg-gray-600"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Trash className="h-4 w-4" />
                    )}
                </Button>
            </ConfirmModal>
        </div>
    );
};
