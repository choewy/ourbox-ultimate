import {
  alpha,
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { ChangeEvent, MouseEvent } from 'react';

export type GridTableColumnProps<PK, D extends { id: PK }> = {
  key: keyof D | string;
  label: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  disablePadding?: boolean;
  onClickSort?: <Element>(e: MouseEvent<Element>) => void;
};

export type GridTableRowProps<PK, D extends { id: PK }> = Record<'id', { origin: PK; value: any }> & Record<keyof D | string, { value: any }>;

export type GridTableHeadProps<PK, D extends { id: PK }> = {
  rowCount: number;
  selectCount: number;
  orderBy: Partial<Record<keyof D, 'asc' | 'desc'>>;
  columns: GridTableColumnProps<PK, D>[];
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function GridTableHead<PK, D extends { id: PK }>({ rowCount, selectCount, columns, orderBy, onSelectAll }: GridTableHeadProps<PK, D>) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectCount > 0 && selectCount < rowCount}
            checked={selectCount > 0 && selectCount === rowCount}
            onChange={onSelectAll}
          />
        </TableCell>
        {columns.map((column) => {
          const key = column.key;
          const order = key in orderBy ? orderBy[key as keyof D] : undefined;
          const isActiveSort = !!order;

          return (
            <TableCell
              key={String(column.key)}
              align={column.align}
              padding={column.disablePadding ? 'none' : 'normal'}
              sortDirection={isActiveSort ? order : false}
            >
              <TableSortLabel active={isActiveSort} direction={order} onClick={column.onClickSort}>
                {column.label}
                {isActiveSort && (
                  <Box component="span" sx={visuallyHidden}>
                    {order}
                  </Box>
                )}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export type GridTableToolbarProps = {
  selectCount: number;
};

export function GridTableToolbar({ selectCount }: GridTableToolbarProps) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        selectCount > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {selectCount > 0 && (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectCount}행 선택되었습니다.
        </Typography>
      )}
    </Toolbar>
  );
}

export type GridTableProps<PK, D extends { id: PK }> = {
  count: number;
  skip: number;
  take: number;
  selectRows: PK[];
  columns: GridTableColumnProps<PK, D>[];
  rows: GridTableRowProps<PK, D>[];
  orderBy: Partial<Record<keyof D, 'asc' | 'desc'>>;
  onSelectAll: (e: ChangeEvent<HTMLInputElement>) => void;
  dense?: boolean;
};

// TODO 컴포넌트 더 쪼개기(테스트하려고 막 짜놓아서 난잡스러움)
export function GridTable<PK, D extends { id: PK }>({ skip, take, count, columns, rows, selectRows, orderBy, onSelectAll, dense }: GridTableProps<PK, D>) {
  const rowCount = rows.length;
  const selectCount = selectRows.length;
  const emptyRowCount = rowCount > 0 ? Math.max(0, take - rowCount) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <GridTableToolbar selectCount={selectCount} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <GridTableHead orderBy={orderBy} rowCount={rowCount} columns={columns} selectCount={selectCount} onSelectAll={onSelectAll} />
            <TableBody>
              {rows.map((row, i) => {
                const selected = selectRows.includes(row.id.origin);
                const labelId = `grid-table-checkbox-${i}`;

                return (
                  <TableRow
                    key={String(row.id.origin)}
                    hover
                    role="checkbox"
                    aria-checked={selected}
                    tabIndex={-1}
                    selected={selected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell colSpan={1} padding="checkbox">
                      <Checkbox color="primary" checked={selected} inputProps={{ 'aria-labelledby': labelId }} onChange={() => console.log('TODO')} />
                    </TableCell>

                    {columns.map((column, j) => (
                      <TableCell key={[column.key, j, row.id, i].join('_')}>{row[column.key].value}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRowCount > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRowCount }}>
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 50, 100, 500, 1000]}
          count={count}
          rowsPerPage={take}
          page={skip}
          onPageChange={(e, page) => console.log(`TODO :: onPageChange :: ${page}`)}
          onRowsPerPageChange={(e) => console.log(`TODO :: onRowsPerPageChange :: ${e.target.value}`)}
        />
      </Paper>
    </Box>
  );
}
