import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Movie } from '../../utils/interface/types';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';
import { removeFromFavorites, addToFavorites } from '../../redux/uersAuth/thunks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieTypography from '../../components/commonComponet/CommonTypography';
import { AppDispatch } from '../../store';  
import { UnknownAction } from '@reduxjs/toolkit';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const dispatch = useDispatch<AppDispatch>(); 
    const navigate = useNavigate();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);
    const favorites = useSelector((state: RootState) => state.auth.favorites);
    const [isExpanded, setIsExpanded] = useState(false);

    const isFavorite = useMemo(() => {
        return favorites?.some(favorite => favorite.imdbID === movie.imdbID);
    }, [favorites, movie.imdbID]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie.imdbID) as unknown as UnknownAction); 
        } else {
            dispatch(addToFavorites(movie) as unknown as UnknownAction);
        }
    };

    const navigateToMovieDetails = () => {
        navigate(`/movie/${movie.imdbID}`);
    };

    return (
        <Grid item xs={12}>
            <Card className="movie-card" style={{ height: '100%', marginTop: 6 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={movie.Poster}
                    alt={movie.Title}
                    onClick={navigateToMovieDetails}
                    style={{ cursor: 'pointer', objectFit: 'fill' }}
                />
                <CardContent>
                    <MovieTypography
                        variant="h5"
                        gutterBottom
                        text={movie.Title}
                        color="black"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '100%',
                        }}
                    />
                    {isExpanded && (
                        <MovieTypography variant="body2" text={movie.Plot} />
                    )}
                    <Button size="small" onClick={toggleExpand}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </Button>
                    <MovieTypography variant="body2" text={`Rating: ${movie.imdbRating}/10`} color='black' />
                    <MovieTypography variant="body2" text={`Released: ${movie.Released}`} color='black' />
                </CardContent>
                {currentUser &&
                    <CardActions>
                        <Button onClick={toggleFavorite}>
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </Button>
                    </CardActions>
                }
            </Card>
        </Grid>
    );
};

export default MovieCard;
