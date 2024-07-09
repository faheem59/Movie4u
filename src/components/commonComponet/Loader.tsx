import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from "@mui/material/Box"

const Loader: React.FC = () => {
    return (
       <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: "hidden"

                }}
            >
                <CircularProgress size={24} />
            </Box>
       </>
    );
};

export default Loader;