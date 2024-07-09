export  interface User {
    id: number;
    username: string;
    favorites: Movie[]; 
    name: string
    
}

export interface AuthState {
    currentUser: UserData | null;
    error: string | null;
    user: UserData | null;
    isLoggedIn: boolean;
    isLoading: boolean;
}
export interface UserData {
    id: string;
    name: string;
    email: string;
    password: string;
    favorites: Movie[];
    comments: { imdbID:string,user: string; comment: string, rating?: number }[];
}

export interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
}

export interface LoginFormInput {
    email: string;
    password: string;
 
}
export interface Movie {
    imdbID: string;
    Poster: string;
    Title: string;
    shortDescription: string;
    longDescription?: string;
    imdbRating: number;
    Plot:string;
    Released: string;
    Director: string;
    Writer: string;
    Genre: string;
    Actors:string;
    Language:string;
    comments?: {  user: string; comment: string, rating?: number }[];

}

export interface Props {
    formType: 'login' | 'signup';
}

export interface LoginFormData {
    email: string;
    password: string;
}
 
export
    interface UseSearchBarResult {
    searchTerm: string;
    suggestions: any[];
    selectedItemIndex: number | null;
    openSuggestions: boolean;
    suggestionListRef: React.RefObject<HTMLUListElement>;
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSuggestionClick: (selectedMovieId: string) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
}