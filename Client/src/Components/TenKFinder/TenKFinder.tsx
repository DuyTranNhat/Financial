import React, { useEffect, useState } from 'react'
import { CompanyTenK } from '../../Company.d'
import { getTenK } from '../../api';
import { toast } from 'react-toastify';
import TenKFinderIte from './TenKFinderItem/TenKFinderItem'
import Spinner from '../Spinner/Spinner';
import TenKFinderItem from './TenKFinderItem/TenKFinderItem';

interface Props {
    symbol: string;
}

const TenKFinder = ({ symbol }: Props) => {
    const [companyData, setCompanyData] = useState<CompanyTenK[]>([]);

    useEffect(() => {
        getTenK(symbol)
            .then(res => {
                if (res?.data) {
                    setCompanyData(res?.data);
                }
            }).catch(error => {
                toast.warning("Cannot get tenK data!")
            })
    }, [symbol])



    return (
        <div>
            {companyData.length > 0 
                ? (companyData?.map(companyDataItem => <TenKFinderItem tenK={companyDataItem} />)) 
                : <Spinner />   
            }
        </div>
    )
}

export default TenKFinder
