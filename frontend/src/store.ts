import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import authReducer from './redux/uersAuth/authSlice'; 
import searchReducer from './redux/searchAuth/searchSlice';
import { SearchState } from './redux/searchAuth/searchSlice';
import { AuthState } from './utils/interface/types';

export type RootState = {
    auth: AuthState;
    search: SearchState;
    
};

const store: EnhancedStore<{ auth: AuthState, search: SearchState }> = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export default store;
