"use client";

import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import styles from './StockTable.module.css';

// Define the data type
type StockData = {
  id: string;
  symbol: string;
  companyName: string;
  weight: number | null;
  gicsSector: string;
  gicsSubIndustry: string;
  dateAdded: string;
  price: number;
};

interface StockTableProps {
  data: StockData[];
}

export function StockTable({ data }: StockTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // Define columns using TanStack Table
  const columns = useMemo<ColumnDef<StockData, any>[]>(
    () => [
      // Checkbox column
      {
        id: 'select',
        header: '',
        cell: ({ row }) => (
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        size: 40,
      },
      // Symbol column
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: (info) => (
          <span className={styles.symbolCell}>{info.getValue()}</span>
        ),
      },
      // Company Name column
      {
        accessorKey: 'companyName',
        header: 'Company Name',
        cell: (info) => (
          <span className={styles.companyName}>{info.getValue()}</span>
        ),
      },
      // Weight column
      {
        accessorKey: 'weight',
        header: 'Weight',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={styles.weight}>
              {value ? `${value}%` : 'N/A'}
            </span>
          );
        },
      },
      // GICS Sector column
      {
        accessorKey: 'gicsSector',
        header: 'GICS Sector',
        cell: (info) => {
          const value = info.getValue();
          const sectorClass = 
            value === 'Excellent' ? styles.sectorExcellent :
            value === 'Very Good' ? styles.sectorVeryGood :
            value === 'Good' ? styles.sectorGood :
            '';
          
          return (
            <span className={`${styles.sector} ${sectorClass}`}>
              {value}
            </span>
          );
        },
      },
      // GICS Sub-industry column
      {
        accessorKey: 'gicsSubIndustry',
        header: 'GICS Sub-industry',
        cell: (info) => (
          <span className={styles.subIndustry}>{info.getValue()}</span>
        ),
      },
      // Date Added column
      {
        accessorKey: 'dateAdded',
        header: 'Date added',
        cell: (info) => {
          const value = info.getValue();
          return (
            <span className={styles.dateAdded}>
              {new Date(value).toLocaleDateString()}
            </span>
          );
        },
      },
      // Price column
      {
        accessorKey: 'price',
        header: 'Price',
        cell: (info) => (
          <span className={styles.price}>
            ${info.getValue()?.toLocaleString()}
          </span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
  });

  const getSortIcon = (isSorted: false | "asc" | "desc") => {
    if (isSorted === 'asc') {
      return <span className={`${styles.sortIcon} ${styles.asc}`}>↑</span>;
    }
    if (isSorted === 'desc') {
      return <span className={`${styles.sortIcon} ${styles.desc}`}>↓</span>;
    }
    return <span className={styles.sortIcon}>↕</span>;
  };

  if (!data || data.length === 0) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.noData}>No data available</div>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${styles.headerCell} ${
                    header.column.getCanSort() ? styles.sortable : ''
                  }`}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    width: header.getSize() !== 150 ? header.getSize() : undefined,
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && 
                        getSortIcon(header.column.getIsSorted())
                      }
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tableBody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.tableCell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
