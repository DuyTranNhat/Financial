import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
}

const DeletePortfilio: React.FC<Props> = ({ onPortfolioDelete, portfolioValue }: Props) => {
    return (
        <div>
            <form onSubmit={onPortfolioDelete}>
                <input hidden={true} value={portfolioValue} />
                <button type='submit' ></button>
            </form>
        </div>
    )
}

export default DeletePortfilio
