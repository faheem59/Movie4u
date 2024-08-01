import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpschema } from '../../utils/schema/loginSignupSchema';
import { UserData } from '../../utils/interface/types';

interface UseRegisterFormProps {
    onSubmit: (data: UserData) => void;
    error: string | null;
    loading: boolean;
}

const useRegisterForm = ({ onSubmit, error, loading }: UseRegisterFormProps) => {
    const { handleSubmit, control, formState: { errors } } = useForm<UserData>({
        resolver: yupResolver(SignUpschema) as any,
    });

    return {
        handleSubmit: handleSubmit(onSubmit),
        control,
        errors,
        error,
        loading,
    };
};

export default useRegisterForm;
