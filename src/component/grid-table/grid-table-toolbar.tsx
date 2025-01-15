import { alpha, Toolbar, Typography } from '@mui/material';

import { GridTableToolbarProps } from './types';

export function GridTableToolbar({ selectCount }: GridTableToolbarProps) {
  return (
    <Toolbar
      sx={
        selectCount > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }
      }
    >
      {selectCount > 0 && (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectCount}행 선택되었습니다.
        </Typography>
      )}
    </Toolbar>
  );
}
