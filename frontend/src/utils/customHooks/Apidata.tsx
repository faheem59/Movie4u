import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../../utils/interface/types'; 

const useApiData = () => {
    const [dataFromApi, setDataFromApi] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/movie');
                setDataFromApi(response.data); 
                console.log(response.data,"djfdfjdfjdjdf")
            } catch (error) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data: dataFromApi, loading, error };
};

export default useApiData;
