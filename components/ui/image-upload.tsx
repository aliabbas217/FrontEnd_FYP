"use client"

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])
    
    const onUpload = (result: any) => {
        console.log("Upload result:", result);
        const secureUrl = result.info.secure_url;
        console.log("Secure URL:", secureUrl);
        onChange(secureUrl);
};

    if (!isMounted) {
        return null;
    }


    return (
        <div>
            <div className='mb-4 flex items-center gap-4'>
                {value.map((url) => (
                    console.log(url),
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='z-10 absolute top-2 right-2'>
                            <Button type='button' onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className='w-4 h-4'/>
                            </Button>
                        </div>
                        <Image fill className='object-cover' alt='Image' src={url} />
                    </div>
                ))}
            </div>
            <CldUploadWidget onSuccess={onUpload} uploadPreset='elysian'>
                {({ open }) => {
                    const onClick = () => {
                        console.log('Uploading Image');
                        open();
                    }

                    return (
                        <>
                        <Button type='button' disabled={disabled} variant={'secondary'} onClick={onClick}>
                            <ImagePlus className='h-4 w-4 mr-2' />
                            Upload an Image
                        </Button>
                        {/* <pre>{JSON.stringify(value, null, 2)}</pre> */}
                        </>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
};

export default ImageUpload