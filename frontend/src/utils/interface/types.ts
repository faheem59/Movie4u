export  interface User {
    id: number;
    username: string; 
    name: string
    
}

export interface AuthState {
    currentUser: UserData | null;
    error: string | null;
    user?: UserData | null;
    favorites?:Movie[] |[]
    isLoggedIn?: boolean;
    isLoading?: boolean;
}
export interface UserData {
    id?: string;
    name: string;
    email: string;
    password: string;
    favorites?: Movie[];
    comments?: { imdbID: string, user: string; comment: string, rating?: number }[];
    token?: string
    user?: {
        id?: string;
        name: string;
        email: string;
        password: string;
        favorites?: Movie[];
}
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
    Language: string;
    Year?: string;
    isFavorite?:string
    comments?: { imdbId:string, user: string; comment: string, rating?: number }[];

}


export interface Favorite {
    imdbID: string;
    image: string;
    title: string;
    shortDescription?: string;
    longDescription?: string;
    imdbRating?: number;
    plot?: string;
    released?: string;
    director?: string;
    writer?: string;
    genre?: string;
    actors?: string;
    language?: string;
   

}


export interface Props {
    formType: 'login' | 'signup';
}

export interface LoginFormData {
    email: string;
    password: string;
}
 
export interface UseSearchBarResult {
    searchTerm: string;
    suggestions: any[];
    selectedItemIndex: number | null;
    openSuggestions: boolean;
    suggestionListRef: React.RefObject<HTMLUListElement>;
    handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSuggestionClick: (selectedMovieId: string) => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
}

export interface Comment {
    user: {
        name: string;
    };
    comment: string;
    rating: number;
    movie?: string;
}

export interface CommentsResponse {
    comments: Comment[];
}