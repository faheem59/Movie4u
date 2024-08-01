import React, { useState, useEffect } from 'react';
import useApiData from '../../utils/customHooks/Apidata';
import MovieCard from './MoivesCard';
import { Container, Grid } from '@mui/material';
import Loader from '../../components/commonComponet/Loader';
import { Movie } from '../../utils/interface/types';
import ErrorBoundary from '../../utils/errorboundary/ErrorBoundary';
import { initializeAuth } from '../../utils/initializeAuth';

const Movies: React.FC = () => {
    const { data, error } = useApiData();
    const [showLoader, setShowLoader] = useState(true);

    initializeAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (showLoader) return <Loader />;

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Data is not available.</p>;

    return (
        <>
            <ErrorBoundary fallback={<p>Something went wrong while loading movies.</p>}>
                <Container>
                    <Grid container spacing={4}>
                        {data.map((movie: Movie) => (
                            <Grid item xs={12} sm={6} md={3} lg={3} key={movie.imdbID}>
                                <MovieCard movie={movie} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ErrorBoundary>
        </>
    );
};

export default Movies;
