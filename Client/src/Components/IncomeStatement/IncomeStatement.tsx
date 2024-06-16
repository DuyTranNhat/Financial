import React, { useEffect, useState } from "react";
import { CompanyIncomeStatement } from "../../Company.d"
import { useOutletContext } from "react-router-dom";
import { getIncomeStament } from "../../api";
import Table from "../Table/Table";

interface Props {

};

const config = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date
  },
  {
    label: "Total Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome
  },
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date
  },
  {
    label: "Operating Expenses",
    render: (company: CompanyIncomeStatement) => company.operatingExpenses,
  },
  {
    label: "Cost of Revenue",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
]



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
      <>{companyIncome ? (<Table config={config} data={companyIncome} />) : <h1>Data Not Found</h1>}</>
  );
};

export default IncomeStatement;