// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AuthState,  Movie,  UserData } from '../../utils/interface/types';
// import { addToFavorites, removeFromFavorites, addComment, fetchFavorites } from './thunks'; 

// const initialState: AuthState = {
//     currentUser: null,
//     error: null,
//     user: null,
//     favorites:[],
//     isLoggedIn: false,
//     isLoading: false
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginSuccess: (state, action: PayloadAction<UserData>) => {
//             state.currentUser = action.payload;
//             state.error = null;
//             state.isLoggedIn = true;
//             state.isLoading = false;
//             state.favorites = action.payload.user?.favorites || [];
//             localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
//         },
//         loginFailure: (state, action: PayloadAction<string>) => {
//             state.currentUser = null;
//             state.error = action.payload;
//         },
//         logout: (state) => {
//             state.currentUser = null;
//             state.error = null;
//         },
//         setMovie: (state, action: PayloadAction<Movie[]>) => {
//             state.favorites = action.payload;
//         },
//         removeMovie: (state, action: PayloadAction<string>) => {
//             state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(addToFavorites.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<UserData>) => {
//                 if (state.currentUser) {
//                     state.currentUser = {
//                         ...state.currentUser,
//                         favorites: action.payload.favorites
//                     };
//                     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
//                     console.log('Updated currentUser:', state.currentUser); // Debugging
                
//                 state.isLoading = false;
//             })

//             .addCase(addToFavorites.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to add favorite';
//                 state.isLoading = false;
//             })
//             .addCase(removeFromFavorites.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(removeFromFavorites.fulfilled, (state, action: PayloadAction<string>) => {
//                 if (state.currentUser) {
//                     state.currentUser = {
//                         ...state.currentUser,
//                         favorites: state.currentUser.favorites?.filter(fav => fav.imdbID !== action.payload) || []
//                     };
//                     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(removeFromFavorites.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to remove favorite';
//                 state.isLoading = false;
//             })
//             .addCase(addComment.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(addComment.fulfilled, (state, action: PayloadAction<UserData>) => {
//                 if (state.currentUser) {
//                     state.currentUser = action.payload;
//                 }
//                 state.isLoading = false;
//             })
//             .addCase(addComment.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to add comment';
//                 state.isLoading = false;
//             })
//             .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<UserData>) => {
//                 if (state.currentUser) {
//                     state.currentUser = {
//                         ...state.currentUser,
//                         favorites: action.payload.favorites
//                     };
//                     localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
//                 }
//             })
//             .addCase(fetchFavorites.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to fetch favorites';
//             })
//             ;
        
//     },
// });

// export const { loginSuccess, loginFailure,logout,setMovie, removeMovie } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, Movie } from '../../utils/interface/types';
import { addToFavorites, removeFromFavorites, addComment, fetchFavorites } from './thunks';

interface AuthState {
    currentUser: UserData | null | { token: string };
    favorites: Movie[];
    comments: Record<string, any>; 
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    currentUser: { token: '' },
    favorites: [],
    comments: {},
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.currentUser = { token: action.payload };
        },
        setMovie(state, action: PayloadAction<Movie[]>) {
            state.favorites = action.payload;
        },
        removeMovie(state, action: PayloadAction<string>) {
            state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
        },
        loginSuccess: (state, action: PayloadAction<UserData>) => {
                    state.currentUser = action.payload;
                    state.error = null;
                   
                    state.favorites = action.payload.user?.favorites || [];
                    localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                },
        loginFailure: (state, action: PayloadAction<string>) => {
                    state.currentUser = null;
                    state.error = action.payload;
                },
        logout: (state) => {
                    state.currentUser = null;
                    state.error = null;
                },
        
    },
    extraReducers: builder => {
        builder
            .addCase(addToFavorites.pending, state => {
                state.status = 'loading';
            })
            .addCase(addToFavorites.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(removeFromFavorites.pending, state => {
                state.status = 'loading';
            })
            .addCase(removeFromFavorites.fulfilled, (state, ) => {
                state.status = 'succeeded';
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(addComment.pending, state => {
                state.status = 'loading';
            })
            .addCase(addComment.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.status = 'succeeded';
                state.currentUser = action.payload;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(fetchFavorites.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.status = 'succeeded';
                state.favorites = action.payload.favorites || []; 
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { setMovie, removeMovie, logout, loginSuccess,loginFailure, setToken } = authSlice.actions;
export default authSlice.reducer;
