import React, { SyntheticEvent } from 'react'
import { CompanySearch } from '../../Company.d'
import Card from '../Card/Card';
// import {v4 as uuidv4} from "uuid"

interface Props {
    searchResults: CompanySearch[];
    onPortfolioCreate: (e: SyntheticEvent) => void;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CartList:React.FC<Props> = ( {searchResults, onPortfolioCreate, onPortfolioDelete} : Props ) : JSX.Element => {
  return (
    <div>
      {
        searchResults.map((companySearch, index) => {
            if(index > 0 && index < 100) 
                return <Card id={companySearch.symbol} key={index} searchResult={companySearch}
             onPortfolioCreate={onPortfolioCreate} />
        })
      }
    </div>
  )
}

export default CartList
