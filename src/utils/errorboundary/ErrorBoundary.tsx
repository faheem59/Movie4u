import { ReactNode, useState, useEffect } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (): void => {
            setHasError(true);
        };

        const errorListener = window.addEventListener('error', errorHandler);
        console.log(errorListener);

        return () => {
            window.removeEventListener('error', errorHandler);
        };
    }, []);

    if (hasError) {
        return fallback;
    }

    return children || null;
};

export default ErrorBoundary;
