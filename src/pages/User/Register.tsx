import { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/commonComponet/CommonFormField';
import CommonButton from '../../components/commonComponet/CommonButton';
import useRegisterForm from '../../utils/customHooks/useRegisterForm';
import { UserData } from '../../utils/interface/types';
import localforage from 'localforage';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: UserData) => {
        setLoading(true);

        setTimeout(async () => {
            try {
                const existingUsers: UserData[] = (await localforage.getItem<UserData[]>('users')) || [];

                // Generate unique ID based on current length + 1
                const userId = existingUsers.length + 1;

                const newUser: UserData = {
                    ...data, 
                    id: userId.toString(), 
                    favorites: [],
                    comments: [],
                };
                existingUsers.push(newUser);
                await localforage.setItem('users', existingUsers);
                navigate('/login');
            } catch (error) {
                console.error('Error registering user:', error);
                setError('Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000); 
    };

    const { handleSubmit: handleFormSubmit, control, errors } = useRegisterForm({ onSubmit, error, loading });

    return (
        <>
           
            <form onSubmit={handleFormSubmit}>
                {error && <Typography color="error">{error}</Typography>}
                <FormField
                    name="name"
                    control={control}
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
                <FormField
                    name="email"
                    control={control}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <FormField
                    name="password"
                    control={control}
                    label="Password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <CommonButton type="submit" loading={loading}>
                    SignUp
                </CommonButton>
            </form>
        </>
    );
};

export default Register;
