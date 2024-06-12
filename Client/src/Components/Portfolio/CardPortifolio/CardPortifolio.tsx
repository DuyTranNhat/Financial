import React, { SyntheticEvent } from 'react'
import DeletePortfilio from '../DeletePortfilio/DeletePortfilio';
import { Link } from 'react-router-dom';

interface Props {
  portfolioValue: string;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortifolio: React.FC<Props> = ({ portfolioValue, onPortfolioDelete }: Props): JSX.Element => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <p className="pt-6 text-xl font-bold">{portfolioValue}</p>
      <h4>{portfolioValue}</h4>
      <Link
        to={`/company/${portfolioValue}`}
        className="pt-6 text-xl font-bold"
      >
        {portfolioValue}
      </Link>
      <DeletePortfilio onPortfolioDelete={onPortfolioDelete} portfolioValue={portfolioValue} />
    </div>
  )
}

export default CardPortifolio
