import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../api";
import { CompanyProfile } from "../../Company.d";
import { useParams } from "react-router-dom";
import Sidebar from "../../Components/Sildebar/Sildebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Title/Title";

const CompanyPage = () => {
  let { name } = useParams();

  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(name!);
      console.log(result);

      setCompany(result?.data[0]);
    };
    getProfileInit();
  }, []);

  return (
    <>
      {company ? (
        <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
          <Sidebar />
          <CompanyDashboard>
            <Tile title={company.companyName} subTitle={company.city} />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company Not Found!</div>
      )}
    </>
  );
};


export default CompanyPage
