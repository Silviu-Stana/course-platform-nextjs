'use client';
import { ConfirmDeleteModal } from '@/components/modals/confirm-delete-modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface CourseActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
}

export const CourseActions = ({
    disabled,
    courseId,
    isPublished,
}: CourseActionsProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const router = useRouter();

    const onClick = async () => {
        try {
            setIsPublishing(true);
            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success('Course Unpublished');
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success('Course Published');
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
            await axios.delete(`/api/courses/${courseId}`);

            toast.success('Course Deleted');
            router.push(`/teacher/courses`);
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
                ) : (
                    <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
                )}
            </Button>
            <ConfirmDeleteModal onConfirm={onDelete}>
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
            </ConfirmDeleteModal>
        </div>
    );
};
