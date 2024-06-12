import { useEffect, useState } from "react";
import { getCompanyProfile } from "../../api";
import { CompanyProfile } from "../../Company.d";
import { useParams } from "react-router-dom";

const CompanyPage = () => {
    let { name } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();
  
    useEffect(() => {
      const getProfileInit = async () => {
        const result = await getCompanyProfile(name!);
        setCompany(result?.data[0]);
      };
      getProfileInit();
    }, []);
  
    return (
      <>
        {company ? (
          <div className="company-profile-container">{company.companyName}</div>
        ) : (
          <div>Company Not Found!</div>
        )}
      </>
    );
}

export default CompanyPage
