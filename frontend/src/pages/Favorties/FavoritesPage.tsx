import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Movie } from '../../utils/interface/types';
import { fetchFavorites, removeFromFavorites } from '../../redux/uersAuth/thunks';
import './FavoritesPage.css';
import MovieTypography from '../../components/commonComponet/CommonTypography';
import { useEffect, useState } from 'react';
import Loader from '../../components/commonComponet/Loader';
import { UnknownAction } from '@reduxjs/toolkit';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    //const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const favorites = useSelector((state: RootState) => state.auth.favorites);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchFavorites() as unknown as UnknownAction);
            const timer = setTimeout(() => {
                setShowLoader(false);
            }, 2000);

            return () => clearTimeout(timer);
        };

        fetchData();
    }, [dispatch]);

    const handleRemoveFromFavorites = (movie: Movie) => {
        dispatch(removeFromFavorites(movie.imdbID) as unknown as UnknownAction);
    };

    // useEffect(() => {
    //     console.log('Updated Current User:', currentUser);
    // }, [currentUser]);

    if (showLoader) {
        return <Loader />;
    }

    return (
        <div className="favorites-container">
            <Typography variant="h4" className="page-title" gutterBottom>
                Your Favorites
            </Typography>
            {Array.isArray(favorites) && favorites.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    No favorite movies added yet.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {Array.isArray(favorites) && favorites.map((favorite) => (
                        <Grid item key={favorite?.imdbID} xs={12} sm={6} md={4} lg={3}>
                            <Card className="favorite-card">
                                <CardMedia
                                    component="img"
                                    className="card-media"
                                    image={favorite?.Poster}
                                    alt={favorite?.Title}
                                    sx={{ objectFit: "contain" }}
                                />
                                <CardContent className="card-content">
                                    <MovieTypography variant="h6" gutterBottom text={favorite?.Title} color='red' />
                                    <MovieTypography variant="body2" text={favorite?.Genre} />
                                    <MovieTypography variant="body2" color="text.secondary" text={`Rating: ${favorite?.imdbRating}/10`} />
                                    <MovieTypography variant="body2" color="text.secondary" text={`Released: ${favorite?.Year}`} />
                                </CardContent>
                                <div className="card-actions">
                                    <IconButton
                                        aria-label="remove"
                                        onClick={() => handleRemoveFromFavorites(favorite)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default FavoritesPage;
