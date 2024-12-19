import axios from 'axios';

export interface Product {
    id: number;
    name: string;
    price: number;
}

export class ApiService {
    private API_URL: string;

    constructor(apiUrl: string) {
        this.API_URL = apiUrl;
    }

    async getProducts(): Promise<Product[]> {
        try {
            const response = await axios.get<Product[]>(this.API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }
}

