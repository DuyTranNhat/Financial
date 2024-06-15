import axios from 'axios'
import {
  CompanyKeyMetrics,
  CompanyKeyRatios, CompanySearch, CompanyProfile
} from './Company.d'

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

export const getCompanyProfile = async (keyCompany: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${keyCompany}?apikey=SmqQpMjGg28k3jlMsIAkwlQule0EiG1z`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
}

export const getKeyMetrics = async (symbolQuery: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbolQuery}?limit=40&apikey=SmqQpMjGg28k3jlMsIAkwlQule0EiG1z`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};
