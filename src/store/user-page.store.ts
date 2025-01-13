import { GridTableRowProps } from '@/component';
import { RecoilStore } from '@/persistence/abstracts';
import { User, UserListRequestParam } from '@/persistence/types';

export type UserPageStoreType = {
  loading: boolean;
  count: number;
  selectRows: string[];
  rows: GridTableRowProps<string, User>[];
  param: UserListRequestParam;
};

export class UserPageStore extends RecoilStore<UserPageStoreType> {}

export const userPageStore = new UserPageStore('userPageStore', {
  loading: false,
  count: 0,
  rows: [],
  selectRows: [],
  param: {
    skip: 0,
    take: 20,
    keyword: {},
    dateRange: {},
    orderBy: {},
  },
});
