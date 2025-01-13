import { Box, FormControl, Paper } from '@mui/material';

import { GridTable } from '@/component';
import { userPageHook } from '@/hook';

export default function UserPage() {
  const columns = userPageHook.useGridColumns();
  const { count, rows, param, selectRows } = userPageHook.useGridRows();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper>
        <FormControl></FormControl>
      </Paper>

      <GridTable
        skip={0}
        take={20}
        columns={columns}
        count={count}
        rows={rows}
        orderBy={param.orderBy}
        selectRows={selectRows}
        onSelectAll={() => console.log('TODO')}
      />
    </Box>
  );
}
