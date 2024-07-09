import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setSearchTerm, clearSuggestions, setSuggestions } from '../../redux/searchAuth/searchSlice';
import { fetchMovieSuggestions } from '../services/movieService';
import { useNavigate } from 'react-router-dom';
import { Movie, UseSearchBarResult } from '../interface/types';
import useApiData from './Apidata';

const useSearchBar = (): UseSearchBarResult => {
    const navigate = useNavigate();
    const {data} = useApiData();
    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
    const suggestions = useSelector((state: RootState) => state.search.suggestions);
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
    const [openSuggestions, setOpenSuggestions] = useState(false);
    const suggestionListRef = useRef<HTMLUListElement>(null);
    
    const fetchSuggestions = async (inputSearchTerm: string) => {
        try {
            const fetchedSuggestions = await fetchMovieSuggestions(inputSearchTerm, data as Movie[]);
            dispatch(setSuggestions(fetchedSuggestions!));
            setOpenSuggestions(true);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        dispatch(setSearchTerm(inputValue));
        if (inputValue.trim() !== '') {
            fetchSuggestions(inputValue);
        } else {
            dispatch(clearSuggestions());
            setOpenSuggestions(false);
        }
    };

    const handleSuggestionClick = (selectedMovieId: string) => {
        setOpenSuggestions(false);
        navigate(`/movie/${selectedMovieId}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            if (suggestions && suggestions.length > 0) {
                let nextIndex = selectedItemIndex === null ? 0 : selectedItemIndex;
                if (event.key === 'ArrowUp') {
                    nextIndex = (nextIndex - 1 + suggestions.length) % suggestions.length;
                } else if (event.key === 'ArrowDown') {
                    nextIndex = (nextIndex + 1) % suggestions.length;
                }
                dispatch(setSearchTerm(suggestions[nextIndex].Title));
                setSelectedItemIndex(nextIndex);
            }
        } else if (event.key === 'Enter' && selectedItemIndex !== null && suggestions && suggestions.length > 0) {
            const selectedMovie = suggestions[selectedItemIndex];
            dispatch(setSearchTerm(selectedMovie.Title));
            setOpenSuggestions(false);
            navigate(`/movie/${selectedMovie.imdbID}`);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionListRef.current && !suggestionListRef.current.contains(event.target as Node)) {
                setOpenSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Additional side effects based on searchTerm, suggestions, openSuggestions
        // Example: Filtering movies based on searchTerm
        // You can add your logic here
    }, [searchTerm, suggestions, openSuggestions]);

    return {
        searchTerm,
        suggestions,
        selectedItemIndex,
        openSuggestions,
        suggestionListRef,
        handleSearchInputChange,
        handleSuggestionClick,
        handleKeyDown,
    };
};

export default useSearchBar;
