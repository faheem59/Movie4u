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
                const response = await axios.get('https://mocki.io/v1/ea43f041-362f-400f-b775-8e87b1af029d');
                setDataFromApi(response.data);  
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
