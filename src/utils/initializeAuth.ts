// authInitialization.ts
import localforage from 'localforage';
import { loginSuccess } from '../redux/uersAuth/authSlice';
import store from '../store'; 
import { UserData } from './interface/types';

export const initializeAuth = () => {
    localforage.getItem<UserData>('currentUser')
        .then((currentUser) => {
            if (currentUser) {
                store.dispatch(loginSuccess(currentUser));
            }
        })
        .catch((error) => {
            console.error('Error fetching currentUser from localforage:', error);
        });
};
