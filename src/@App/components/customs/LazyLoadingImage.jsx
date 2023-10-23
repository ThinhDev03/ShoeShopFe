import { Box } from '@mui/material';
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function LazyLoadingImage({ src, alt, w, h }) {
    return (
        <LazyLoadImage
            src={src}
            width={w || '100%'}
            height={h || '100%'}
            alt={alt || 'image'}
            effect='blur'
        // style={{ objectFit: 'contain' }}
        />
    );
}

export default LazyLoadingImage;
