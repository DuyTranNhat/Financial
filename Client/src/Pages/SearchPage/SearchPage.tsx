import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import ListPortfilio from "../../Components/Portfolio/ListPortifolio/ListPortfilio";
import CardList from "../../Components/CardList/CardList";
import { CompanySearch } from "../../Company.d";
import { PortfolioGet } from "../../Models/Portfolio";
import { PortfolioGetAPI, PortfolioPostAPI, PortfolioDelete } from "../../Services/PortfolioService"
import { toast } from "react-toastify";

const SearchPage = () => {
    const [search, setSearch] = useState<string>("");
    const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string | null>(null);
    

    useEffect(() => {
        getPortfolio();
    }, [])

    
    const getPortfolio = () => {
        PortfolioGetAPI()
            .then(res => {
                if (res?.data) {
                    setPortfolioValues(res?.data)
                }
            }).catch(error => {
                toast.warning(error)
                setPortfolioValues([])
            })

    }

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onPortfolioCreate = (e: any) => {
        e.preventDefault();
        //DO NOT DO THIS
        // portfolioValues.push(event.target[0].value)
        // setPortfolioValues(portfolioValues);
        // const exists = portfolioValues?.find((value) => value === e.target[0].value);
        // if (exists) return;
        // const updatedPortfolio = [...portfolioValues, e.target[0].value];
        // setPortfolioValues(updatedPortfolio);
        console.log(e.target[0].value);
        PortfolioPostAPI(e.target[0].value)
            .then(res => {
                if (res?.status === 201) {
                    toast.success("Add stock to portfolio successfully!")
                    getPortfolio()
                }
            }).catch(error => toast.warning("Could not add stock to portfolio!"))
    };

    const onPortfolioDelete = (e: any) => {
        e.preventDefault();
        PortfolioDelete(e.target[0].value)
        .then(res => {
            if (res?.status === 204) {
                toast.success("Delete portfolio successfully!");
                getPortfolio();
            }
        }).catch(error => toast.warning("Could not delete!"))
    };

    const onSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchCompanies(search);
        //setServerError(result.data);
        if (typeof result === "string") {
            setServerError(result);
        } else if (Array.isArray(result.data)) {
            setSearchResult(result.data);
        }
    };
    return (
        <>
            <Search
                onSearchSubmit={onSearchSubmit}
                search={search}
                handleSearchChange={handleSearchChange}
            />
            <ListPortfilio
                portfolioValues={portfolioValues}
                onPortfolioDelete={onPortfolioDelete}
            />
            <CardList
                searchResults={searchResult}
                onPortfolioCreate={onPortfolioCreate}
            />

            {serverError && <div>Unable to connect to API</div>}
        </>
    );
};

export default SearchPage;