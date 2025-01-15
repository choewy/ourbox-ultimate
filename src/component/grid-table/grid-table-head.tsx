import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { GridTableHeadProps } from './types';

export function GridTableHead<PK, D extends { id: PK }>({ rowCount, selectCount, columns, rows, orderBy, onSelect }: GridTableHeadProps<PK, D>) {
  const checked = rowCount > 0 && selectCount === rowCount;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectCount > 0 && selectCount < rowCount}
            checked={checked}
            onChange={(e, checked) => onSelect(e, checked, ...rows.map((row) => row.id.origin))}
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
