// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieSuggestion {
    imdbID: string;
    Title: string;
}

export interface SearchState {
    searchTerm: string;
    suggestions: MovieSuggestion[];
}

const initialState: SearchState = {
    searchTerm: '',
    suggestions: [], 
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },
        clearSuggestions(state) {
            state.suggestions = [];
        },
        setSuggestions(state, action: PayloadAction<MovieSuggestion[]>) {
            state.suggestions = action.payload;
        },
    },
});

export const { setSearchTerm, clearSuggestions, setSuggestions } = searchSlice.actions;

export default searchSlice.reducer;
