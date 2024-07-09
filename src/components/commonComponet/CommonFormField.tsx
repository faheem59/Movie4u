// components/commonComponent/FormField.tsx
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl"
import {FormControlProps} from '@mui/material';
import { UserData } from '../../utils/interface/types';


interface FormFieldProps {
    name: keyof UserData;
    control: Control<UserData>;
    label: string;
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    margin?: FormControlProps['margin'];
}
const FormField: React.FC<FormFieldProps> = ({
    name,
    control,
    label,
    error = false,
    helperText,
    fullWidth = true,
    margin = 'normal',
}) => {
    return (
      <>
            <FormControl fullWidth={fullWidth} margin={margin}>
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label={label}
                            variant="outlined"
                            error={error}
                            helperText={helperText}
                        />
                    )}
                />
            </FormControl>
      </>
    );
};

export default FormField;