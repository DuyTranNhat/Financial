import React, { SyntheticEvent } from 'react'

interface Props {
  onPortfolioCreate: (e : SyntheticEvent) => void;
  symbol: string;
}

const AddPortfilio : React.FC<Props> = ( {onPortfolioCreate, symbol} : Props ) : JSX.Element => {
  return (
    <form onSubmit={onPortfolioCreate} >
      <input readOnly={true} hidden={true} value={symbol}  />
      <button type='submit' >add</button>
    </form>
  )
}

export default AddPortfilio
