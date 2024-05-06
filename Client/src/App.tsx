import { useState, ChangeEvent, SyntheticEvent } from 'react'
import './App.css'
import { CompanySearch } from './Company.d'
import {searchCompanies} from './api'
import Search from './Components/Search/Search'
import CartList from './Components/CarsList/CartList'
import ListPortfilio from './Components/Portfolio/ListPortifolio/ListPortfilio'

// const result = await searchCompanies('123')

// if (typeof result === 'string' ) {
//   console.log(result);
// } else if (Array.isArray(result.data)) {
//   console.log(result.data);
// }

function App() {
  const [search, setSearch] = useState<string>("")
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState<string>("")
  const [portfolioValues, setPortfolioValues] = useState<string[]>([])

  const handleSearchChange = (e:  ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
  }

  const onPortfolioDelete = (e: any) => {
    e.preventDefault()

    const portfolioFilter = portfolioValues.filter(item => item != e.target[0].value)

    setPortfolioValues(portfolioFilter)
  }

  // event không support properties --> Sử dụng any
  const onPortfolioCreate = (e: any) => {
    e.preventDefault()
    // if (updatePortfolioValues.find(item => {
      //   if(item === e.target[0].value) return true
      // }))
    const isExisted = portfolioValues.find(item => {
      if (item === e.target[0].value) 
        return true;
      return false
    })

    if (isExisted) return ;
    
    const updatePortfolioValues = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatePortfolioValues)
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(123);
    const result = await searchCompanies(search)
    if (typeof result === 'string' ) {
      setServerError(result)
      
    } else if (Array.isArray(result.data)) {
      console.log(result);
      setServerError('')
      setSearchResult(result.data)
    }
    
  }

  return (
    <>
      {serverError && <h1>Error: {serverError}</h1>}
      <Search onSearchSubmit={onSearchSubmit} search={search} handleSearchChange={handleSearchChange}/>
      {/* <Card /> */}
      <ListPortfilio portfolioValues = {portfolioValues} onPortfolioDelete={onPortfolioDelete} />
      <CartList searchResults={searchResult} onPortfolioCreate={onPortfolioCreate} onPortfolioDelete={onPortfolioDelete} ></CartList>
      {/* CardList */}

    </>
  )
}

export default App
