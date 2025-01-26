import { Download } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';

import { userPageHook } from '@/hook';

export const UserToolbar = () => {
  const onClickCreate = userPageHook.useOnModalController('openCreateModal', true);
  const onClickDownload = userPageHook.useOnClickDownloadButton();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Button variant="contained" onClick={onClickCreate}>
          사용자 등록
        </Button>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton size="small" onClick={onClickDownload}>
          <Download />
        </IconButton>
      </Box>
    </Box>
  );
};
