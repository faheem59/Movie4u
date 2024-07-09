import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface MovieTypographyProps extends TypographyProps {
    variant: 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
    gutterBottom?: boolean;
    text: string
    color?: string;
}

const MovieTypography: React.FC<MovieTypographyProps> = ({ variant, gutterBottom = false, text, color, ...typographyProps }) => {
   
    return (
        <>
            <Typography variant={variant} gutterBottom={gutterBottom} color={color} {...typographyProps}>
                {text}
            </Typography>
        </>
    );
};

export default MovieTypography;
