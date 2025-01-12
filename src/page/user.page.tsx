import { Box, FormControl, Paper } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';

import { GridTable } from '@/component';
import { tableHook } from '@/hook/table.hook';

export default function UserPage() {
  const columns = tableHook.useUserGridColumns();
  const response = tableHook.useUserGridRows();
  const gridRef = useGridApiRef();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper>
        <FormControl></FormControl>
      </Paper>

      <GridTable
        skip={0}
        take={20}
        columns={columns}
        count={response.count}
        rows={response.rows}
        orderBy={{}}
        onSelectAll={() => console.log('TODO')}
        selectRows={[]}
      />
    </Box>
  );
}
