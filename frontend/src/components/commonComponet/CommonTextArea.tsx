import React from 'react';
import { TextareaAutosize, styled } from '@mui/material';

interface CommentTextareaProps {
    value: string;  
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;  
}

const CustomTextareaAutosize = styled(TextareaAutosize)({
    marginTop: '16px',
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    lineHeight: '1.6',
    resize: 'vertical',
    minHeight: '80px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
});

const CommentTextarea: React.FC<CommentTextareaProps> = ({ value, onChange }) => {
    return (
       <>
            <CustomTextareaAutosize
                aria-label="Add a comment"
                placeholder="Add a comment..."
                value={value}
                onChange={onChange}
            />
       </>
    );
};

export default CommentTextarea;
