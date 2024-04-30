import axios from 'axios'
import { CompanySearch } from './Company.d'

interface SearchResponse {
    data: CompanySearch[];
}


export const searchCompanies = async (query: string) => {

    try {

        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=SmqQpMjGg28k3jlMsIAkwlQule0EiG1z`
        );
        
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          return error.message;
        } else {
          console.log("unexpected error: ", error);
          return "An expected error has occured.";
        }
      }
}