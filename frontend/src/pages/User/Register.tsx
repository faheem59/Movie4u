import { useState } from 'react';
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/commonComponet/CommonFormField';
import CommonButton from '../../components/commonComponet/CommonButton';
import useRegisterForm from '../../utils/customHooks/useRegisterForm';
import { UserData } from '../../utils/interface/types';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: UserData) => {
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/register', data, {
                withCredentials: true,
            });

            if (response.status === 201) {
                
                navigate('/login');
            } else {
                throw new Error('Registration failed.');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                
                setError(error.response.data.message || 'Registration failed. Please try again.');
            } else {
                
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
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
