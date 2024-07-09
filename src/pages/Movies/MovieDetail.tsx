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
import { Movie, UserData } from '../../utils/interface/types';
import { addToFavorites, removeFromFavorites, addComment } from '../../redux/uersAuth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import localforage from 'localforage';
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

const MovieDetail = () => {
    const { imdbID } = useParams<{ imdbID: string }>();
    const { data, error } = useApiData();
    const [showLoader, setShowLoader] = useState(true);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser) as UserData | null | undefined;
    const [newComment, setNewComment] = useState('');
    const [ratingValue, setRatingValue] = useState<number | null>(null);
    const [comments, setComments] = useState<{ user: string; comment: string; rating: number }[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const storedComments = await localforage.getItem<{ imdbID: string, user: string; comment: string; rating: number }[]>(`movie_comments`);
                if (storedComments) {
                    setComments(storedComments);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [imdbID]);

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

    const isFavorite = currentUser?.favorites?.some(favorite => favorite.imdbID === movie.imdbID);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(movie));
        } else {
            dispatch(addToFavorites(movie));
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
            const comment = { user: currentUser?.name ?? 'Anonymous', comment: newComment, rating: ratingValue };
            // Update Redux state with the comment for the current movie
            dispatch(addComment({ imdbID: movie.imdbID, ...comment }));

            try {
                // Fetch existing comments from localforage
                const storedComments = await localforage.getItem<{ imdbID: string, user: string; comment: string; rating: number }[]>('movie_comments') || [];
                // Update comments array with the new comment
                const updatedComments = [...storedComments, comment];
                // Store updated comments back to localforage
                await localforage.setItem('movie_comments', updatedComments);
                // Update state to reflect changes
                setComments(updatedComments);
            } catch (error) {
                console.error('Error updating local storage:', error);
            }
            setNewComment('');
            setRatingValue(null);
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
                            <List >
                                {comments.map((comment, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem sx={{ borderBottom: '1px solid #ddd', paddingTop: '8px', paddingBottom: '8px', borderRadius: '50px', backgroundColor: "#D3D3D3", marginBottom: "2px" }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AccountCircleIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primaryTypographyProps={{ variant: 'body2', fontWeight: 'bold' }}
                                                primary={`${comment.user}: ${comment.comment}`}
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
