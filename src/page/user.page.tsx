import { Box } from '@mui/material';

import { GridTable } from '@/component';
import { userPageHook } from '@/hook';

export default function UserPage() {
  const onSelect = userPageHook.useGridOnSelectHandler();
  const onChangePage = userPageHook.useGridOnChangePage();
  const onChangeRowsPerPage = userPageHook.useGridOnChangeRowsPerPage();

  const columns = userPageHook.useGridColumns();
  const { count, rows, param, selectRows } = userPageHook.useGridData();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <GridTable
        skip={param.skip}
        take={param.take}
        columns={columns}
        count={count}
        rows={rows}
        orderBy={param.orderBy}
        selectRows={selectRows}
        onSelect={onSelect}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Box>
  );
}
