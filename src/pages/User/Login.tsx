import  { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess, addToFavorites } from '../../redux/uersAuth/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import CommonButton from '../../components/commonComponet/CommonButton';
import localforage from 'localforage';
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

        setTimeout(async () => {
            try {
                const users: UserData[] = await localforage.getItem<UserData[]>('users') || [];
                const authenticated = users.find(u => u.email === data.email && u.password === data.password);

                if (authenticated) {
                    dispatch(loginSuccess(authenticated));
                    if (authenticated.favorites) {
                        authenticated.favorites.forEach((fav) => dispatch(addToFavorites(fav)));
                    }
                    localforage.setItem('currentUser', authenticated);
                    navigate("/");
                } else {
                    dispatch(loginFailure('Invalid Credentials'));
                    setError('Invalid Credentials');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000); 
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
