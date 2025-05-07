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
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsPublishing(true);
            if (isPublished) {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
                );
                toast.success('Unpublished');
            } else {
                await axios.patch(
                    `/api/courses/${courseId}/chapters/${chapterId}/publish`
                );
                toast.success('Published');
            }

            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsPublishing(false);
        }
    };

    const onDelete = async () => {
        try {
            setIsDeleting(true);
            await axios.delete(
                `/api/courses/${courseId}/chapters/${chapterId}`
            );
            toast.success('Chapter Deleted');
            router.push(`/teacher/courses/${courseId}`);
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isPublishing}
                variant="outline"
                size={'sm'}
            >
                {isPublishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : isPublished ? (
                    'Unpublish'
                ) : (
                    'Publish'
                )}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                    size={'sm'}
                    variant={'destructive'}
                    disabled={isDeleting}
                    className="disabled:bg-gray-600"
                >
                    {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Trash className="h-4 w-4" />
                    )}
                </Button>
            </ConfirmModal>
        </div>
    );
};
