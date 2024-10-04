import axios from 'axios'
import {
  CompanyKeyMetrics,
  CompanySearch, CompanyProfile,
  CompanyIncomeStatement,
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyTenK
} from './Company.d'
import { handleError } from './Helpers/ErrorHandler';

interface SearchResponse {
  data: CompanySearch[];
}


export const searchCompanies = async (query: string) => {

  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=${apiKey}`
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
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${keyCompany}?apikey=${apiKey}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
}

export const getKeyMetrics = async (symbolQuery: string) => {
  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbolQuery}?limit=40&apikey=${apiKey}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getIncomeStament = async (symbolQuery: string) => {
  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${symbolQuery}?limit=50&apikey=${apiKey}`
    )
    return data;
  } catch (error: any) {
    console.log("Error: ", error.message);

  }
}


export const getBalanceSheet = async (query: string) => {
  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=20&apikey=${apiKey}`
    );
    return data;
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
};

export const getCashFlow = async (query: string) => {
  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${apiKey}`
    );
    return data;
  } catch (error: any) {
    console.log("error: " + error.message);
  }
}

export const getTenK = async (symbol: string) => {
  try {
    const apiKey = import.meta.env.REACT_APP_KEY_API; 
    const data = await axios.get<CompanyTenK[]>(`https://financialmodelingprep.com/api/v3/sec_filings/${symbol}?type=10-K&page=0&apikey=${apiKey}`);
    return data;
  } catch (error) {
    handleError(error);
  }
}