import React from 'react'
import { CompanySearch } from '../../Company.d'
import Card from '../Card/Card';
import {v4 as uuidv4} from "uuid"

interface Props {
    searchResults: CompanySearch[];
}

const CartList:React.FC<Props> = ( {searchResults} : Props ) : JSX.Element => {
  return (
    <div>
      {
        searchResults.map((companySearch, index) => {
            if(index > 0 && index < 100) 
                return <Card id={companySearch.symbol} key={uuidv4()} searchResult={companySearch} />
        })
      }
    </div>
  )
}

export default CartList
