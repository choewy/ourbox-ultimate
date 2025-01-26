import { Search } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { FormEvent, useRef } from 'react';

import { UserSearchKeywordField, UserStatus, UserType } from '@/persistence/enums';
import { userService } from '@/service';
import { authStore, userPageStore } from '@/store';

export const UserSearchForm = () => {
  const auth = authStore.useValue();
  const setState = userPageStore.useSetState();

  const selectTypeRef = useRef<HTMLInputElement>();
  const selectStatusRef = useRef<HTMLInputElement>();
  const selectFieldRef = useRef<HTMLInputElement>();
  const inputKeywordRef = useRef<HTMLInputElement>();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const type = selectTypeRef.current.value ? (selectTypeRef.current.value as UserType) : undefined;
    const status = selectStatusRef.current.value ? (selectStatusRef.current.value as UserStatus) : undefined;
    const field = selectFieldRef.current.value ? (selectFieldRef.current.value as UserSearchKeywordField) : undefined;
    const value = inputKeywordRef.current.value.trim() ? inputKeywordRef.current.value.trim() : undefined;

    setState((prev) => ({
      ...prev,
      param: { ...prev.param, filter: { type, status }, keyword: { field, value } },
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }} component="form" onSubmit={onSearch}>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel id="user-type-select-label" size="small">
            구분
          </InputLabel>
          <Select inputRef={selectTypeRef} id="user-type-select" labelId="user-type-select-label" label="구분" autoWidth size="small" defaultValue="">
            <MenuItem value="">선택</MenuItem>
            {userService.getSearchTypeOptions(auth?.current).map((option) => (
              <MenuItem key={['user-type-select-option', option.label, option.value].join('_')} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel id="user-status-select-label" size="small">
            상태
          </InputLabel>
          <Select inputRef={selectStatusRef} id="user-status-select" labelId="user-status-select-label" label="상태" autoWidth size="small" defaultValue="">
            <MenuItem value="">선택</MenuItem>
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
            <Select
              inputRef={selectFieldRef}
              id="user-keyword-select"
              labelId="user-keyword-select-label"
              label="검색어"
              autoWidth
              size="small"
              defaultValue=""
            >
              {userService.getSearchKeywordFieldOptions().map((row) => (
                <MenuItem key={['user-keyword-select-option', row.label, row.value].join('_')} value={row.value}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField inputRef={inputKeywordRef} size="small" placeholder="검색어를 입력하세요." />
          <Button variant="outlined" type="submit">
            <Search />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
