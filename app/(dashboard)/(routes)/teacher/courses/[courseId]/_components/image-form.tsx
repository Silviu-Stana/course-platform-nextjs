'use client';
import axios from 'axios';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { ImageIcon, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@/lib/generated/prisma';
import Image from 'next/image';
import { FileUpload } from '@/components/file-upload';

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: 'Image is required',
    }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    const toggleEdit = () => setIsEditing((current) => !current);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success('Updated');
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    let hasImage = initialData.imageUrl;

    return (
        <div className="mt-6 border bg-sky-50 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && <>Cancel</>}
                    {!isEditing && !hasImage && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add image
                        </>
                    )}
                    {!isEditing && hasImage && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing &&
                (!hasImage ? (
                    <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image
                            alt="Upload"
                            fill
                            className="object-cover rounded-md"
                            src={hasImage}
                        />
                    </div>
                ))}
            {isEditing && (
                <div>
                    <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => {
                            if (url) onSubmit({ imageUrl: url });
                        }}
                    />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    );
};
