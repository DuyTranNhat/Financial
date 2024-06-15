import React, { SyntheticEvent } from 'react'
import { CompanySearch } from '../../Company.d'
import Card from '../Card/Card';
// import {v4 as uuidv4} from "uuid"

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CartList: React.FC<Props> = ({ searchResults, onPortfolioCreate }: Props): JSX.Element => {
  console.log(searchResults);
  return (
    
    <div>
      {
        searchResults.length > 0 ? (
          searchResults.map((companySearch, index) => {
            if (index >= 0 && index < 100)
              return <Card id={companySearch.symbol} key={index} searchResult={companySearch}
                onPortfolioCreate={onPortfolioCreate} />
          })
        )
          :
          (
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              No results!
            </p>
          )
      }
    </div>
  )
}

export default CartList
