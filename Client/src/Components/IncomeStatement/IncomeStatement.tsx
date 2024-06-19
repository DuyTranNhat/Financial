import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../Company.d"
import { useOutletContext } from "react-router-dom";
import { getIncomeStament } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

interface Props {

};
const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Total Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
  {
    label: "Operating Expenses",
    render: (company: CompanyIncomeStatement) => company.operatingExpenses,
  },
  {
    label: "Gross Profit",
    render: (company: CompanyIncomeStatement) => company.grossProfit,
  },
  {
    label: "Income Before Tax",
    render: (company: CompanyIncomeStatement) => company.incomeBeforeTax,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => company.operatingIncome,
  },
];


const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyIncome, setCompanyIncome ] = useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const callApiGetIncomeStatment =  async () => {
      const reponse = await getIncomeStament(ticker);
      setCompanyIncome(reponse?.data);
    }
    callApiGetIncomeStatment();
  }, [])

  return (
      <>{companyIncome ? (<Table config={configs} data={companyIncome} />) : <Spinner />}</>
  );
};

export default IncomeStatement;