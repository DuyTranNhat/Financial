import React, { SyntheticEvent } from 'react'
import CardPortifolio from '../CardPortifolio/CardPortifolio';

interface Props {
    portfolioValues: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}


const ListPortfilio : React.FC<Props> = ( {portfolioValues, onPortfolioDelete} : Props ) => {
  return (
    <div>
        <h3>My Portfolio</h3>
        <ul>
            {portfolioValues && portfolioValues.map((portfolioValue, index) => {
               return <CardPortifolio key={index} portfolioValue={portfolioValue} onPortfolioDelete={onPortfolioDelete} />   
            })}
        </ul>
    </div>
  )
}

export default ListPortfilio
