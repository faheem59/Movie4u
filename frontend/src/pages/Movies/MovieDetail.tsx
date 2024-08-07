import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router-dom';
import useApiData from '../../utils/customHooks/Apidata';
import Loader from '../../components/commonComponet/Loader';
import { Comment, Movie, UserData } from '../../utils/interface/types';
import { addToFavorites, removeFromFavorites, addComment } from '../../redux/uersAuth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MovieTypography from '../../components/commonComponet/CommonTypography';
import CommentTextarea from '../../components/commonComponet/CommonTextArea';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Rating from '@mui/material/Rating';
import CommentIcon from '@mui/icons-material/Comment';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';

const MovieDetail = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const { data, error } = useApiData();
    const [showLoader, setShowLoader] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as UserData | null | undefined;
    const [newComment, setNewComment] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const favorites = useSelector((state: RootState) => state.auth.favorites);
    const [changed, setChanged] = useState(0)

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('https://movie4u-mo.onrender.com/api/comment',
                    {
                        withCredentials:true,
                    }
                );
                const allComments = response.data.comments[0].comments;
                const filteredComments = allComments.filter((comment: Comment) => comment.movie === imdbID);
                setComments(filteredComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [imdbID, changed]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (showLoader) {
        return <Loader />;
    }

    if (error) {
        return <Typography variant="h6">Error fetching data: {error}</Typography>;
    }

    if (!data) {
        return <Typography variant="h6">No data available</Typography>;
    }

    const movie = data.find((movie: Movie) => movie.imdbID === imdbID);

    if (!movie) {
        return <Typography variant="h6">Movie not found!</Typography>;
    }

    const isFavorite = favorites?.some(favorite => favorite.imdbID === movie.imdbID);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie.imdbID) as unknown as UnknownAction);
        } else {
            dispatch(addToFavorites(movie) as unknown as UnknownAction);
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleRatingChange = (_event: React.ChangeEvent<{}>, value: number | null) => {
        setRatingValue(value);
    };

    const handleAddCommentAndRating = async () => {
        if (newComment.trim() !== '' && ratingValue !== null) {
            const commentPayload = { movieId: movie.imdbID, comment: newComment, rating: ratingValue };
            try {
                dispatch(addComment(commentPayload) as unknown as UnknownAction);
                setChanged(prev => prev + 1)
                setNewComment('')
                setRatingValue(null)
            } catch (error) {
                console.error('Error dispatching addComment:', error);
            }
        } else {
            alert('Please enter a comment and select a rating.');
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: '100%', margin: 'auto', marginTop: 1, display: 'flex', flexDirection: 'column' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CardMedia
                            component="img"
                            height="600"
                            image={movie.Poster}
                            alt={movie.Title}
                            sx={{ width: '100%', objectFit: 'contain' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <MovieTypography variant="h4" gutterBottom text={movie.Title} color='black' />
                            <MovieTypography variant="body1" gutterBottom text={movie.Plot} />
                            <MovieTypography variant="body2" gutterBottom text={`Rating: ${movie.imdbRating}/10`} color='black' />
                            <MovieTypography variant="body2" gutterBottom text={`Released: ${movie.Released}`} color='black' />
                            <MovieTypography variant="body2" gutterBottom text={`Director: ${movie.Director}`} color='black' />
                            <MovieTypography variant="body2" gutterBottom text={`Writer: ${movie.Writer}`} color='black' />
                            <MovieTypography variant="body2" gutterBottom text={`Actors: ${movie.Actors}`} color='black' />
                            <MovieTypography variant="body2" gutterBottom text={`Language: ${movie.Language}`} color='black' />
                            {currentUser &&
                                <Button onClick={toggleFavorite}>
                                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </Button>
                            }
                            <CommentTextarea value={newComment} onChange={handleCommentChange} />
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Rating
                                        name="movie-rating"
                                        value={ratingValue}
                                        onChange={handleRatingChange}
                                        size="large"
                                        style={{ marginTop: '4px' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        onClick={handleAddCommentAndRating}
                                        style={{ backgroundColor: "black" }}
                                    >
                                        Add Comment & Rating
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent>
                            <Typography variant="h6" style={{ color: "black", display: "flex", alignItems: "center" }}>
                                Comments: <CommentIcon style={{ marginLeft: '4px' }} />
                            </Typography>
                            <List key={changed}>
                                {comments?.map((comment, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem sx={{ borderBottom: '1px solid #ddd', paddingTop: '8px', paddingBottom: '8px', borderRadius: '50px', backgroundColor: "#D3D3D3", marginBottom: "2px" }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                                                primary={`${comment.user.name}: ${comment.comment}`}
                                            />
                                            <MovieTypography variant="body2" gutterBottom text={`Rating: ${comment.rating}`} color='blue' />
                                        </ListItem>
                                        {index < comments.length - 1 && <Divider variant="middle" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default MovieDetail;
