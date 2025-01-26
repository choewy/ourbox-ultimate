import { MouseEventHandler, useCallback, useEffect } from 'react';

import { ultimateApi } from '@/api';
import {
  GridTableColumnProps,
  GridTableOnChangePageHandler,
  GridTableOnChangeRowsPerPageHandler,
  GridTableOnSelectHandler,
  GridTableRowProps,
} from '@/component';
import { SnackEvent } from '@/persistence/event';
import { DownloadEvent } from '@/persistence/event/download.event';
import { User } from '@/persistence/types';
import { dateService, userService } from '@/service';
import { userPageStore, UserPageStoreType } from '@/store';

export class UserPageHook {
  public useGridColumns(): GridTableColumnProps<string, User>[] {
    return [
      { key: 'id', label: '번호', minWidth: 100 },
      { key: 'email', label: '이메일', minWidth: 100 },
      { key: 'name', label: '이름', minWidth: 100 },
      { key: 'type', label: '구분', minWidth: 100 },
      { key: 'partnerId', label: '고객사번호', minWidth: 130 },
      { key: 'partnerName', label: '고객사명', minWidth: 120 },
      { key: 'partnerChannelId', label: '판매채널번호', minWidth: 140 },
      { key: 'partnerChannelName', label: '판매채널명', minWidth: 120 },
      { key: 'fulfillmentId', label: '풀필먼트번호', minWidth: 140 },
      { key: 'fulfillmentName', label: '풀필먼트명', minWidth: 120 },
      { key: 'fulfillmentCenterId', label: '센터번호', minWidth: 120 },
      { key: 'fulfillmentCenterName', label: '센터명', minWidth: 120 },
      { key: 'status', label: '계정상태', minWidth: 120 },
      { key: 'createdAt', label: '등록일시', minWidth: 120 },
      { key: 'updatedAt', label: '수정일시', minWidth: 120 },
    ];
  }

  public useGridData() {
    const [state, setState] = userPageStore.useState();

    const getUserList = useCallback(async () => {
      const response = await ultimateApi.getUserList(state.param);

      if (!response.ok) {
        if (response.error) {
          SnackEvent.error(response.error);
        }

        if (response.exception) {
          SnackEvent.warning(response.exception);
        }

        return;
      }

      const count = response.data.count;
      const rows = response.data.rows.map(
        (row) =>
          ({
            id: { origin: row.id, value: row.id },
            email: { value: row.email },
            name: { value: row.name },
            type: { value: userService.getUserTypeTett(row.type) },
            partnerId: { value: row.partner?.id ?? '' },
            partnerName: { value: row.partner?.name ?? '' },
            partnerChannelId: { value: row.partnerChannel?.id ?? '' },
            partnerChannelName: { value: row.partnerChannel?.name ?? '' },
            fulfillmentId: { value: row.fulfillment?.id ?? '' },
            fulfillmentName: { value: row.fulfillment?.name ?? '' },
            fulfillmentCenterId: { value: row.fulfillmentCenter?.id ?? '' },
            fulfillmentCenter: { value: row.fulfillmentCenter?.name ?? '' },
            status: { value: userService.getUserStatusText(row.status) },
            createdAt: { value: dateService.fromISOToDateTimeText(row.createdAt) },
            updatedAt: { value: dateService.fromISOToDateTimeText(row.updatedAt) },
          }) as GridTableRowProps<string, User>,
      );

      setState((prev) => ({ ...prev, count, rows }));
    }, [state.param]);

    useEffect(() => {
      getUserList();
    }, [getUserList]);

    return state;
  }

  public useGridOnSelectHandler(): GridTableOnSelectHandler<string> {
    const setState = userPageStore.useSetState();

    return useCallback(
      (_, checked, ...values) => {
        setState((prev) => {
          const state = { ...prev };

          if (checked) {
            state.selectRows = state.selectRows.filter((selectRow) => !values.includes(selectRow)).concat(values);
          } else {
            state.selectRows = state.selectRows.filter((selectRow) => !values.includes(selectRow));
          }

          return state;
        });
      },
      [setState],
    );
  }

  public useGridOnChangePage(): GridTableOnChangePageHandler {
    const setState = userPageStore.useSetState();

    return useCallback(
      (_, page) => {
        setState((prev) => ({ ...prev, selectRows: [], param: { ...prev.param, skip: page * prev.param.take } }));
      },
      [setState],
    );
  }

  public useGridOnChangeRowsPerPage(): GridTableOnChangeRowsPerPageHandler {
    const setState = userPageStore.useSetState();

    return useCallback(
      (e) => {
        setState((prev) => ({ ...prev, param: { ...prev.param, take: Number(e.target.value), skip: 0 } }));
      },
      [setState],
    );
  }

  public useOnClickDownloadButton(): MouseEventHandler<HTMLButtonElement> {
    const { param } = userPageStore.useValue();

    return useCallback(async () => {
      const response = await ultimateApi.downloadUserListExcel(param);

      if (!response.ok) {
        if (response.error) {
          SnackEvent.error(response.error);
        }

        if (response.exception) {
          SnackEvent.warning(response.exception);
        }

        return;
      }

      DownloadEvent.download(response.data.url, response.data.filename);
    }, []);
  }

  public useOnModalController = (key: keyof Pick<UserPageStoreType, 'openCreateModal'>, openState: boolean) => {
    const setState = userPageStore.useSetState();

    return useCallback(() => {
      setState((prev) => ({ ...prev, [key]: openState }));
    }, []);
  };
}

export const userPageHook = new UserPageHook();
