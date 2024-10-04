import React, { SyntheticEvent } from 'react'
import DeletePortfilio from '../DeletePortfilio/DeletePortfilio';
import { PortfolioGet } from '../../../Models/Portfolio';
import { Link } from 'react-router-dom';

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortifolio: React.FC<Props> = ({ portfolioValue, onPortfolioDelete }: Props): JSX.Element => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <p className="pt-6 text-xl font-bold">{portfolioValue.symbol}</p>
      <h4>{portfolioValue.companyName}</h4>
      <Link
        to={`/company/${portfolioValue.symbol}`}
        className="pt-6 text-xl font-bold"
      >
        {portfolioValue.industry}
      </Link>
      <DeletePortfilio onPortfolioDelete={onPortfolioDelete} portfolioValue={portfolioValue.symbol} />
    </div>
  )
}

export default CardPortifolio
