import { ChangeEvent, MouseEvent } from 'react';

export type GridTableOnSelectHandler<PK> = (e: ChangeEvent<HTMLInputElement>, checked: boolean, ...values: PK[]) => void;
export type GridTableOnChangePageHandler = (e: MouseEvent<HTMLButtonElement> | null, page: number) => void;
export type GridTableOnChangeRowsPerPageHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
export type GridTableOnClickSort = <Element>(e: MouseEvent<Element>) => void;

export type GridTableColumnProps<PK, D extends { id: PK }> = {
  key: keyof D | string;
  label: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  disablePadding?: boolean;
  onClickSort?: GridTableOnClickSort;
};

export type GridTableRowProps<PK, D extends { id: PK }> = Record<
  'id',
  {
    origin: PK;
    value: any;
  }
> &
  Record<keyof D | string, { value: any }>;

export type GridTableHeadProps<PK, D extends { id: PK }> = {
  rowCount: number;
  selectCount: number;
  orderBy: Partial<Record<keyof D, 'asc' | 'desc'>>;
  columns: GridTableColumnProps<PK, D>[];
  rows: GridTableRowProps<PK, D>[];
  onSelect: GridTableOnSelectHandler<PK>;
};

export type GridTableToolbarProps = {
  selectCount: number;
};

export type GridTableProps<PK, D extends { id: PK }> = {
  count: number;
  skip: number;
  take: number;
  selectRows: PK[];
  columns: GridTableColumnProps<PK, D>[];
  rows: GridTableRowProps<PK, D>[];
  orderBy: Partial<Record<keyof D, 'asc' | 'desc'>>;
  onSelect: GridTableOnSelectHandler<PK>;
  onChangePage: GridTableOnChangePageHandler;
  onChangeRowsPerPage: GridTableOnChangeRowsPerPageHandler;
  dense?: boolean;
};
