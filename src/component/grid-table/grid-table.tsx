import { Alert, Checkbox, Grow, Snackbar, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';

import { GridTableHead } from './grid-table-head';
import { GridTableProps } from './types';

export function GridTable<PK, D extends { id: PK }>(props: GridTableProps<PK, D>) {
  const { skip, take, count, columns, rows, selectRows, orderBy, marginalHeight, onSelect, onChangePage, onChangeRowsPerPage } = props;

  const rowCount = rows.length;
  const page = skip > 0 ? Math.ceil(skip / take) : 0;
  const selectCount = selectRows.length;
  const open = selectCount > 0;

  return (
    <>
      <TableContainer sx={{ width: '100%', height: `calc(100vh - ${180 + (marginalHeight ?? 0)}px)`, overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
          <GridTableHead orderBy={orderBy} rowCount={rowCount} columns={columns} rows={rows} selectCount={selectCount} onSelect={onSelect} />
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
                    <Checkbox
                      color="primary"
                      checked={selected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onChange={(e, checked) => onSelect(e, checked, row.id.origin)}
                    />
                  </TableCell>

                  {columns.map((column, j) => (
                    <TableCell key={[column.key, j, row.id, i].join('_')}>{row[column.key]?.value}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 50, 100, 500, 1000]}
          count={count}
          rowsPerPage={take}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </TableContainer>
      <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={(props) => <Grow {...props} unmountOnExit />}>
        <Alert severity="info" sx={{ width: '400px' }}>
          {selectCount}행 선택되었습니다.
        </Alert>
      </Snackbar>
    </>
  );
}
