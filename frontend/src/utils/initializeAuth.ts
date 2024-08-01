// authInitialization.ts
import { UnknownAction } from '@reduxjs/toolkit';
import { loginSuccess } from '../redux/uersAuth/authSlice';
import { fetchFavorites } from '../redux/uersAuth/thunks';
import store from '../store';
import { UserData } from './interface/types';

export const initializeAuth = () => {
    try {
        const currentUserJson = localStorage.getItem('currentUser');
        if (currentUserJson) {
            
            const currentUser: UserData = JSON.parse(currentUserJson);
            store.dispatch(loginSuccess(currentUser));
            store.dispatch(fetchFavorites() as unknown as UnknownAction)
        }
    } catch (error) {
        console.error('Error fetching currentUser from localStorage:', error);
    }
    
};
