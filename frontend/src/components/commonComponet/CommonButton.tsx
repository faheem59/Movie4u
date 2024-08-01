import React from 'react';
import Button from "@mui/material/Button";
import Loader from './Loader';

interface CustomButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: string
}

const CommonButton: React.FC<CustomButtonProps> = ({ type = "button", disabled = false, loading = false, onClick, children }) => {
    return (
       <>
            <Button
                type={type}
                variant="contained"
                disabled={disabled || loading}
                onClick={onClick}
                sx={{
                    width: '100%',
                    marginTop: '10px',
                    backgroundColor: 'black',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
            >
                {children}
                {loading && <Loader />}
            </Button>
       </>
    );
};

export default CommonButton;