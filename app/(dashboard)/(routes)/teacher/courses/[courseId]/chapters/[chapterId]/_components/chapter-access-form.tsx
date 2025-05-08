'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Chapter } from '@/lib/generated/prisma';
import { Editor } from '@/components/editor';
import { Preview } from '@/components/preview';
import { Checkbox } from '@/components/ui/checkbox';

interface ChapterAccessFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    isFree: z.boolean(),
});

export const ChapterAccessForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterAccessFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: initialData?.isFree ?? false,
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            await axios.patch(
                `/api/courses/${courseId}/chapters/${chapterId}`,
                values
            );
            toast.success('Updated');
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="mt-6 border bg-sky-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Is chapter free?
                <Button
                    onClick={toggleEdit}
                    variant="link"
                    className="text-sky-800"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4" />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <div
                    className={cn(
                        'text-sm mt-2',
                        !initialData.isFree && 'text-slate-500 italic'
                    )}
                >
                    {initialData.isFree ? (
                        <>✅Free Preview</>
                    ) : (
                        <>❌ Not free.</>
                    )}
                </div>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="isFree"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-sky-700 border-2"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            Make this chapter free for preview
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
