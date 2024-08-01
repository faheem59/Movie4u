import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography"
import { useNavigate } from 'react-router-dom';

import { Props } from '../utils/interface/types';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';

const LoginSignup: React.FC<Props> = ({ formType }) => {
    const navigate = useNavigate();

    return (
        <>
            <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Card sx={{ width: '100%', overflow: 'hidden' }}>
                    <CardHeader
                        title={
                            <Box display="flex" justifyContent="space-between">
                                <Typography
                                    variant="h5"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        cursor: 'pointer',
                                        fontWeight: formType === 'login' ? 'bold' : 'normal',
                                        color: formType === 'login' ? "black" : 'rgba(0,0,0,0.5)'
                                    }}
                                >
                                    Login
                                </Typography>
                                <Typography
                                    variant="h5"
                                    onClick={() => navigate('/signup')} //validations
                                    sx={{
                                        cursor: 'pointer',
                                        fontWeight: formType === 'signup' ? 'bold' : 'normal',
                                        color: formType === 'signup' ? "black" : 'rgba(0,0,0,0.5)'
                                    }}
                                >
                                    Signup
                                </Typography>
                            </Box>
                        }
                    />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {formType === 'login' ? <Login /> : <Register />}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default LoginSignup;