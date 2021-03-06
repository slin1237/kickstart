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
//0xf4F0d31c53027375480c1D494c39b1Dbc6202B20,0x13f5511cbb12004F4ECAEa7a7A34C63d11B67539,0x0aa93445C0f43C2b1F894Aac7B4F8B47d42631c8
function DataTable() {

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

  const data = useMemo(() => [
            {
              Name: "food drive",
              Goal: "500",
              Funding: "10",
              address: "0xf4F0d31c53027375480c1D494c39b1Dbc6202B20",
            },
            {
              Name: "school supplies",
              Goal: "1000",
              Funding: "30",
              address: "0xf4F0d31c53027375480c1D494c39b1Dbc6202B20",
            },
            {
              Name: "corona virus masks",
              Goal: "500",
              Funding: "25",
              address: "0xf4F0d31c53027375480c1D494c39b1Dbc6202B20",
            }
          ], [])

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
        accessor: 'address',
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