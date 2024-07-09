import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import localforage from 'localforage';
import { AuthState, Movie, UserData } from '../../utils/interface/types';


const initialState: AuthState = {
    currentUser: null,
    error: null,
    user: null,
    isLoggedIn: false,
    isLoading: false

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserData>) => {
            state.currentUser = action.payload;
            state.error = null;
            localforage.setItem('currentUser', action.payload);
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.currentUser = null;
            state.error = action.payload;
           
        },
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
            
        },
        addToFavorites: (state, action: PayloadAction<Movie>) => {
            if (state.currentUser) {
                const movieToAdd = action.payload;
                const isMovieAlreadyAdded = state.currentUser.favorites.some(fav => fav.imdbID === movieToAdd.imdbID);

                if (!isMovieAlreadyAdded) {
                    const updatedFavorites = [...state.currentUser.favorites, movieToAdd];
                    state.currentUser = { ...state.currentUser, favorites: updatedFavorites };
                    updateFavoritesInLocalStorage(state.currentUser);
                }
            }
        },

        removeFromFavorites: (state, action: PayloadAction<Movie | string>) => {
            if (state.currentUser) {
                let imdbID: string;
                if (typeof action.payload === 'string') {
                    imdbID = action.payload;
                } else {
                    imdbID = action.payload.imdbID;
                }
                const updatedFavorites = state.currentUser.favorites.filter(fav => fav.imdbID !== imdbID);
                state.currentUser = { ...state.currentUser, favorites: updatedFavorites };
                updateFavoritesInLocalStorage(state.currentUser);
            }
        },
        addComment: (state, action: PayloadAction<{ imdbID: string, user: string, comment: string, rating: number }>) => {
    if (state.currentUser) {
        const { imdbID, user, comment, rating } = action.payload;
        const existingComments = state.currentUser.comments;
        
        // Check if the comment already exists for the given imdbID
        const index = existingComments.findIndex(c => c.imdbID === imdbID);

        if (index !== -1) {
            // If comment already exists, update it
            existingComments[index] = { imdbID, user, comment, rating };
        } else {
            // Otherwise, add the new comment
            existingComments.push({ imdbID, user, comment, rating });
        }

        state.currentUser = { ...state.currentUser, comments: existingComments };
        updateCommentsInLocalStorage(state.currentUser); // Pass updatedComments here instead of state.currentUser
    }
},

    },
});

const updateFavoritesInLocalStorage = (updatedUser: UserData) => {
    localforage.getItem<UserData[]>('users')
        .then((users: UserData[] | null) => {
            if (users) {
                const updatedUsers = users.map(user => {
                    if (user.id === updatedUser.id) {
                        return { ...user, favorites: updatedUser.favorites };
                    }
                    return user;
                });
                localforage.setItem('users', updatedUsers)
                    .then(() => console.log('Updated users in localforage:', updatedUsers))
                    .catch(err => console.error('Error saving updated users to localforage:', err));
            }
        })
        .catch(err => console.error('Error fetching users from localforage:', err));
};

const updateCommentsInLocalStorage = (updatedUser: UserData) => {
    localforage.getItem<UserData[]>('users')
        .then((users: UserData[] | null) => {
            if (users) {
                const updatedUsers = users.map(user => {
                    if (user.id === updatedUser.id) {
                        return { ...user, comments: updatedUser.comments };
                    }
                    return user;
                });
                localforage.setItem('users', updatedUsers)
                    .then(() => console.log('Updated users in localforage:', updatedUsers))
                    .catch(err => console.error('Error saving updated users to localforage:', err));
            }
        })
        .catch(err => console.error('Error fetching users from localforage:', err));
};

export const { loginSuccess, loginFailure, logout, addToFavorites, removeFromFavorites ,addComment } = authSlice.actions;

export default authSlice.reducer;
