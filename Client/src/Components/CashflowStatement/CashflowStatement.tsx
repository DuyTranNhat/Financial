import { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../Company.d';
import { useOutletContext } from 'react-router-dom';
import { getCashFlow } from '../../api';
import Table from '../Table/Table';


const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date,
    },
    {
        label: "Operating Cashflow",
        render: (company: CompanyCashFlow) => company.operatingCashFlow,
    },
    {
        label: "Property/Machinery Cashflow",
        render: (company: CompanyCashFlow) =>
            company.investmentsInPropertyPlantAndEquipment,
    },
    {
        label: "Other Investing Cashflow",
        render: (company: CompanyCashFlow) => company.otherInvestingActivites,
    },
    {
        label: "Debt Cashflow",
        render: (company: CompanyCashFlow) =>
            company.netCashUsedProvidedByFinancingActivities,
    },
    {
        label: "CapEX",
        render: (company: CompanyCashFlow) => company.capitalExpenditure,
    },
    {
        label: "Free Cash Flow",
        render: (company: CompanyCashFlow) => company.freeCashFlow,
    },
];

const CashflowStatement = () => {
    const ticker = useOutletContext<string>();
    const [cashflowData, setCashflowData] = useState<CompanyCashFlow[]>()

    useEffect(() => {
        const getRatio = async () => {
            const result = await getCashFlow(ticker!);
            console.log(result?.data);
            setCashflowData(result?.data)
        }

        getRatio()
    }, [])



    return (
        <div>
            {cashflowData ? (<Table config={config} data={cashflowData} />) : <h1>No Data!</h1>}
            
        </div>
    )
}

export default CashflowStatement
