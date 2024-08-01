
import { Movie } from "../interface/types";

export const fetchMovieSuggestions = async (searchTerm: string, data:Movie[]) => {
    
    try {
       
        const filteredMovies = data?.filter((movie) =>
            movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredMovies;
    } catch (error) {
        console.error('Error fetching movie suggestions:', error);
        throw error; 
    }
};