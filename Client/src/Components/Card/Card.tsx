import React from 'react'
import { CompanySearch } from '../../Company.d'

type Props = {
  id: string;
  searchResult: CompanySearch;
}

const Card : React.FC<Props> = ({ id, searchResult }: Props) : JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
  
      <p className="text-veryDarkBlue">{searchResult.currency}</p>
      <p className="font-bold text-veryDarkBlue">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
    </div>
  )
}

export default Card
