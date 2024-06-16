import React from "react";


type Props = {
    config: any;
    data: any;
};





const Table = ({ config, data }: Props) => {
    const renderedRows = data.map((company : any) => {
        return (

            <tr key={company.cik}>
                {/* <td className="p-4 text-left whitespace-nowrap text-sm font-normal text-gray-900">
                    {configs[0].render(company)}
                </td>
                <td className="text-left p-3">{configs[1].render(company)}</td> */}
                {config.map((config: any) => {
                    return <td>{config.render(company)}</td>
                })}
            </tr>
        );
    });
    const renderedHeaders = config.map((config: any) => {

        return (
            <th
                className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                key={config.label}
            >
                {config.label}
            </th>
        );
    });
    return (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
            <table className="min-w-full divide-y divide-gray-200 m-5">
                <thead className="bg-gray-50">{renderedHeaders}</thead>
                <tbody>{renderedRows}</tbody>
            </table>
        </div>
    );
};

export default Table;