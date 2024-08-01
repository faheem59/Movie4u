import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie, UserData } from '../../utils/interface/types';
import { RootState } from '../../store';
import { removeMovie, setMovie } from './authSlice';

interface CommentData {
    movieId: string;
    comment: string;
    rating: number;
}
export const addToFavorites = createAsyncThunk<UserData, Movie, { state: RootState }>(
    'auth/addFavorite',
    async (movie: Movie, { getState, dispatch, rejectWithValue }) => {
        const state = getState();
        // const token = state.auth.currentUser?.token;
          const token = localStorage.getItem('authToken')
        if (!token) {
            return rejectWithValue('Token is missing');
        }

        try {
            const currentFavorites = state.auth.favorites ?? [];
            dispatch(setMovie([...currentFavorites, movie]));

            const response = await axios.post('http://localhost:5000/api/favorites/add', null, {
                params: { imdbID: movie.imdbID },
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            return response.data;
        } catch (error) {
            dispatch(removeMovie(movie.imdbID));
            return rejectWithValue('Failed to add favorite');
        }
    }
);


export const removeFromFavorites = createAsyncThunk<string, string, { state: RootState }>(
    'auth/removeFavorite',
    async (imdbID: string, {  dispatch, rejectWithValue }) => {
        // const state = getState();
        // const token = state.auth.currentUser?.token;
        const token = localStorage.getItem('authToken')
        if (!token) {
            return rejectWithValue('Token is missing');
        }

        try {
            dispatch(removeMovie(imdbID));
            await axios.delete('http://localhost:5000/api/favorites/remove', {
                params: { imdbID },
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });

            return imdbID;
        } catch (error) {
            return rejectWithValue('Failed to remove favorite');
        }
    }
);

// Corrected addComment thunk
export const addComment = createAsyncThunk<UserData, CommentData, { state: RootState }>(
    'auth/addComment',
    async (commentData, { getState, rejectWithValue }) => {
        const state = getState();
        const user = state.auth.currentUser;
        // const token = state.auth.currentUser?.token;
        const token = localStorage.getItem('authToken')
        if (!token) {
            return rejectWithValue('Token is missing');
        }

        console.log(commentData);
        if (user) {
            try {
                const response = await axios.post(
                    `http://localhost:5000/api/comment?imdbID=${commentData.movieId}`,
                    {
                        comment: commentData.comment,
                        rating: commentData.rating,
                        user:user,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    }
                );
                console.log(response.data, "comment")
                return response.data;
            } catch (error) {
                
                return rejectWithValue('Failed to add comment');
            }
        }
        return rejectWithValue('User is not authenticated');
    }
);

// Corrected fetchFavorites thunk
export const fetchFavorites = createAsyncThunk<UserData, void, { state: RootState }>(
    'auth/fetchFavorites',
    async (_, { rejectWithValue }) => {
        //const state = getState();
        // const token = state.auth.currentUser?.token;
        const token = localStorage.getItem('authToken')
        if (!token) {
            return rejectWithValue('Token is missing');
        }

        try {
            const response = await axios.get('http://localhost:5000/api/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch favorites');
        }
    }
);
