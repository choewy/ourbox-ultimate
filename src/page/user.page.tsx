import { Download, Search } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';

import { GridTable } from '@/component';
import { userPageHook } from '@/hook';
import { userService } from '@/service';

export default function UserPage() {
  const onSelect = userPageHook.useGridOnSelectHandler();
  const onChangePage = userPageHook.useGridOnChangePage();
  const onChangeRowsPerPage = userPageHook.useGridOnChangeRowsPerPage();

  const columns = userPageHook.useGridColumns();
  const { count, rows, param, selectRows } = userPageHook.useGridData();

  return (
    // TODO
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
        <Box sx={{ display: 'flex', gap: 1 }} component="form">
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel id="user-type-select-label" size="small">
              구분
            </InputLabel>
            <Select id="user-type-select" labelId="user-type-select-label" label="구분" autoWidth size="small" value="">
              <MenuItem value="">전체</MenuItem>
              {userService.getUserTypeMaps().map((row) => (
                <MenuItem key={['user-type-select-option', row.label, row.value].join('_')} value={row.value}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <InputLabel id="user-status-select-label" size="small">
              상태
            </InputLabel>
            <Select id="user-status-select" labelId="user-status-select-label" label="상태" autoWidth size="small" value="">
              <MenuItem value="">전체</MenuItem>
              {userService.getUserStatusMaps().map((row) => (
                <MenuItem key={['user-status-select-option', row.label, row.value].join('_')} value={row.value}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <InputLabel id="user-status-select-label" size="small">
                검색어
              </InputLabel>
              <Select id="user-keyword-select" labelId="user-keyword-select-label" label="검색어" autoWidth size="small" value="">
                {userService.getUserKeywordMaps().map((row) => (
                  <MenuItem key={['user-keyword-select-option', row.label, row.value].join('_')} value={row.value}>
                    {row.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField size="small" placeholder="검색어를 입력하세요." />
            <Button variant="outlined" type="submit">
              <Search />
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Button variant="contained">사용자 등록</Button>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small">
              <Download />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <GridTable
        skip={param.skip}
        take={param.take}
        columns={columns}
        count={count}
        rows={rows}
        orderBy={param.orderBy}
        selectRows={selectRows}
        marginalHeight={20}
        onSelect={onSelect}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </>
  );
}
