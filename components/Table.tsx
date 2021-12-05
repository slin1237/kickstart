// Layout.tsx
import {ReactNode, FC, useMemo} from "react";
import { ethers } from "ethers";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import FundProjectButton from "./project/FundProjectButton";
import { useGetCampaign } from "../pages/api/contract";
import campaignABI from "../pages/api/CampaignContract.json";

interface TableProps {
    children?: ReactNode;
}

function DataTable() {
  const network = {
    name: "dev",
    chainId: 97,
    ensAddress: "https://data-seed-prebsc-1-s1.binance.org:8545/"
};
  const campaignInterface = new ethers.utils.Interface(campaignABI);
  const campaigns = useGetCampaign()
  console.log(campaigns)
  const campaignData = []
  if (campaigns !== undefined){
    campaigns.forEach((e) => {
      var contract = new ethers.Contract(e, campaignInterface, new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
      var test = contract.name();
      console.log(test);
      campaignData.push(
        {
          Name: "test2",
          Goal: "test",
          Funding: "test",
        }
      );
    });
  }
  const data = useMemo(
    () => campaignData,
    [],
  )

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Goal',
        accessor: 'Goal',
      },
      {
        Header: 'Funding',
        accessor: 'Funding',
      },
      {
        Header:'Fund',
        accessor: 'Fund',
        Cell: ({ cell }) => (
          <FundProjectButton campaignAddress={cell.row.values.address}/>
        )
      }
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                isNumeric={column.isNumeric}
              >
                {column.render('Header')}
                <chakra.span pl='4'>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label='sorted descending' />
                    ) : (
                      <TriangleUpIcon aria-label='sorted ascending' />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default DataTable;