import { useEffect, useState } from 'react';

import { ultimateApi } from '@/api';
import { GridTableColumnProps, GridTableRowProps } from '@/component';
import { SnackEvent } from '@/persistence/event';
import { User } from '@/persistence/types';
import { dateService, userService } from '@/service';

export class TableHook {
  public useUserGridColumns(): GridTableColumnProps<string, User>[] {
    return [
      {
        key: 'id',
        label: '번호',
      },
      {
        key: 'email',
        label: '이메일',
      },
      {
        key: 'name',
        label: '이름',
      },
      {
        key: 'type',
        label: '구분',
      },
      {
        key: 'createdAt',
        label: '등록일시',
      },
      {
        key: 'updatedAt',
        label: '수정일시',
      },
    ];
  }

  public useUserGridRows() {
    const [state, setState] = useState<{
      count: number;
      rows: GridTableRowProps<string, User>[];
    }>({
      count: 0,
      rows: [],
    });

    const getUserList = async () => {
      const response = await ultimateApi.getUsers();

      if (!response.ok) {
        if (response.error) {
          SnackEvent.error(response.error);
        }

        if (response.exception) {
          SnackEvent.warning(response.error);
        }

        return;
      }

      const count = response.data.count;
      const skip = response.data.skip;
      const rows = response.data.rows.map(
        (row, i) =>
          ({
            id: { origin: row.id, value: skip + i + 1 },
            email: { value: row.email },
            name: { value: row.name },
            type: { value: userService.getUserTypeTett(row.type) },
            createdAt: { value: dateService.fromISOToDateTimeText(row.createdAt) },
            updatedAt: { value: dateService.fromISOToDateTimeText(row.updatedAt) },
          }) as GridTableRowProps<string, User>,
      );

      setState({ count, rows });
    };

    useEffect(() => {
      getUserList();
    }, []);

    return state;
  }
}

export const tableHook = new TableHook();
