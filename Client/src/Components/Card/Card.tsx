import React, { SyntheticEvent } from 'react'
import { CompanySearch } from '../../Company.d'
// import AddPortfilio from '../Portfolio/AddPortfilio/AddPortfilio'
import AddPortfilio from '../Portfolio/AddPortfilio/AddPortfilio'
import { Link } from 'react-router-dom'

type Props = {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }: Props): JSX.Element => {
  return (
    <div
      className="flex flex-col items-center justify-around w-full p-6 bg-slate-100 rounded-lg md:flex-row"
      key={id}
      id={id}
    >
      <Link
        to={`/company/${searchResult.symbol}`}
        className="font-bold text-center text-veryDarkViolet md:text-left"
      >
        {searchResult.name} ({searchResult.symbol})
      </Link>

      <p className="ms-2 text-veryDarkBlue">{searchResult.currency}</p>
      <p className="font-bold text-veryDarkBlue">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
      <AddPortfilio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol} />
    </div>
  )
}

export default Card
