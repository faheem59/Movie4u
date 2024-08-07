import { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, } from '../../redux/uersAuth/authSlice';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import CommonButton from '../../components/commonComponet/CommonButton';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../utils/schema/loginSignupSchema';
import { LoginFormData, UserData } from '../../utils/interface/types';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);

        try {
            const response = await axios.post('https://movie4u-mo.onrender.com/api/login', data, {
                withCredentials: true,
            });
            const authenticatedUser: UserData = response.data;
            const token = response.data.token;
            if (token) {
                // dispatch(setToken(token));

                localStorage.setItem('authToken', token);
            }
            if (authenticatedUser) {
                dispatch(loginSuccess(authenticatedUser));

                // Store user in local storage or session storage if needed
                localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
                navigate("/");
            } else {
                dispatch(loginFailure('Invalid Credentials'));
                setError('Invalid Credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Error logging in. Please try again.');
            dispatch(loginFailure('Error logging in. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                    <Typography color="error" style={{ marginBottom: '10px' }}>
                        {error}
                    </Typography>
                )}
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                />
                <CommonButton type="submit" loading={loading}>
                    Login
                </CommonButton>
            </form>
        </>
    );
};

export default Login;
