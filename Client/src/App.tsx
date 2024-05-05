import { useState, MouseEvent, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import './App.css'
import Card from './Components/Card/Card'
import { CompanySearch } from './Company.d'
import {searchCompanies} from './api'
import Search from './Components/Search/Search'
import CartList from './Components/CarsList/CartList'

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

  const onChange = (e:  ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    }

  const onClick = async (e: SyntheticEvent) => {
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
      <Search onSearchSubmit={onClick} search={search} handleSearchChange={onChange}/>
      {/* <Card /> */}
      <CartList searchResults={searchResult} ></CartList>
      {/* CardList */}
    </>
  )
}

export default App
