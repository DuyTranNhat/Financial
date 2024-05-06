import React, { SyntheticEvent } from 'react'
import DeletePortfilio from '../DeletePortfilio/DeletePortfilio';

interface Props {
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortifolio : React.FC<Props> = ( {portfolioValue, onPortfolioDelete} : Props ) : JSX.Element => {
  return (
    <>
        <h4>{portfolioValue}</h4>
        <DeletePortfilio onPortfolioDelete={onPortfolioDelete} portfolioValue={portfolioValue} />
    </>
  )
}

export default CardPortifolio
