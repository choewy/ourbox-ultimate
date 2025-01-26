import { GridTable } from '@/component';
import { userPageHook } from '@/hook';

export const UserGridTable = () => {
  const onSelect = userPageHook.useGridOnSelectHandler();
  const onChangePage = userPageHook.useGridOnChangePage();
  const onChangeRowsPerPage = userPageHook.useGridOnChangeRowsPerPage();

  const columns = userPageHook.useGridColumns();
  const { count, rows, param, selectRows } = userPageHook.useGridData();

  return (
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
  );
};
