import Image from 'next/image';
import React from 'react';

export const Logo = () => {
    return <Image height={120} width={120} alt="logo" src={'./logo.svg'} />;
};
