import { useEffect } from 'react';

import { ultimateApi } from '@/api';
import { GridTableColumnProps, GridTableRowProps } from '@/component';
import { SnackEvent } from '@/persistence/event';
import { User } from '@/persistence/types';
import { dateService, userService } from '@/service';
import { userPageStore } from '@/store';

export class UserPageHook {
  public useGridColumns(): GridTableColumnProps<string, User>[] {
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
        key: 'partner',
        label: '고객사',
      },
      {
        key: 'partnerChannel',
        label: '판매채널',
      },
      {
        key: 'fulfillment',
        label: '풀필먼트',
      },
      {
        key: 'fulfillmentCenter',
        label: '풀필먼트센터',
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

  public useGridRows() {
    const [state, setState] = userPageStore.useState();

    const getUserList = async () => {
      const response = await ultimateApi.getUserList(state.param);

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
            partner: { value: row.partner?.name ?? '' },
            partnerChannel: { value: row.partnerChannel?.name ?? '' },
            fulfillment: { value: row.fulfillment?.name ?? '' },
            fulfillmentCenter: { value: row.fulfillmentCenter?.name ?? '' },
            createdAt: { value: dateService.fromISOToDateTimeText(row.createdAt) },
            updatedAt: { value: dateService.fromISOToDateTimeText(row.updatedAt) },
          }) as GridTableRowProps<string, User>,
      );

      setState((prev) => ({ ...prev, count, rows }));
    };

    useEffect(() => {
      getUserList();
    }, []);

    return state;
  }
}

export const userPageHook = new UserPageHook();
