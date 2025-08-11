import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Box,
  TableFooter,
} from '@mui/material';
import * as React from 'react';

interface Column<T> {
  id: keyof T;
  label: string;
  align?: 'left' | 'right' | 'center' | 'justify';
  format?: (value: T[keyof T]) => string;
  sortable?: boolean;
}

interface GenericTableProps<T> {
  columns: readonly Column<T>[];
  rows: readonly T[];
  onActionClick?: (id: string) => void;
  actionLabel?: string;
  showAction?: boolean;
  getRowId?: (row: T) => string;
  children?: React.ReactNode; // Added missing children prop
}

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<T>(
  order: Order,
  orderBy: keyof T,
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const TableComponent = <T extends Record<string, any>>({
  columns,
  rows,
  onActionClick,
  actionLabel = 'Información',
  showAction = true,
  getRowId,
  children, // Added children parameter
}: GenericTableProps<T>) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof T | ''>('');

  const handleRequestSort = (property: keyof T) => {
    const column = columns.find(col => col.id === property);
    if (column?.sortable === false) return;

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = React.useMemo(
    () =>
      orderBy
        ? stableSort(rows, getComparator(order, orderBy))
        : rows,
    [order, orderBy, rows],
  );

  const getSortIcon = (columnId: keyof T) => {
    if (orderBy !== columnId) return '';
    return order === 'desc' ? '↓' : '↑';
  };

  const getUniqueKey = (row: T, index: number): string => {
    if (getRowId) {
      return getRowId(row);
    }

    const possibleKeys = ['id', 'uuid', 'key'];
    for (const key of possibleKeys) {
      if (row[key] !== undefined) {
        return String(row[key]);
      }
    }
    return `row-${index}`;
  };

  const handleActionClick = (row: T) => {
    if (onActionClick && getRowId) {
      const id = getRowId(row);
      onActionClick(id);
    } else if (onActionClick) {
      const id = row.id || row.uuid || row.key || row.idAsesor;
      if (id) {
        onActionClick(String(id));
      }
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', mb: 2, p: 1 }}>
      <TableContainer component={Box} sx={{ overflowX: 'auto', borderRadius: '10px' }}>
        <Table
          size="small"
          sx={{ backgroundColor: '#fff', minWidth: 650 }}
          aria-label="generic table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#667eea' }}>
              {columns.map((column) => {
                const isSortable = column.sortable !== false;
                return (
                  <TableCell
                    key={column.id as string}
                    onClick={() => isSortable && handleRequestSort(column.id)}
                    sx={{
                      cursor: isSortable ? 'pointer' : 'default',
                      textAlign: column.align,
                      padding: '10px',
                      color: 'white',
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {column.label}
                    {isSortable && (
                      <Box component="span" sx={{ ml: '5px' }}>
                        {getSortIcon(column.id)}
                      </Box>
                    )}
                  </TableCell>
                );
              })}
              {showAction && (
                <TableCell
                  sx={{
                    textAlign: 'center',
                    padding: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Acciones
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, rowIndex) => (
              <TableRow key={getUniqueKey(row, rowIndex)}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id as string}
                      sx={{
                        textAlign: column.align,
                        padding: '10px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {column.format
                        ? column.format(value)
                        : value !== null && value !== undefined
                        ? String(value)
                        : ''}
                    </TableCell>
                  );
                })}
                {showAction && (
                  <TableCell sx={{ textAlign: 'center', padding: '10px', whiteSpace: 'nowrap' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleActionClick(row)}
                    >
                      {actionLabel}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          {children && (
            <TableFooter>
              {children}
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;