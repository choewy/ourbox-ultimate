import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';

import { DTOConstructorType } from '@/common';

export class FormService {
  public useOnChangeInput<DTO>(dispatch: Dispatch<SetStateAction<DTO>>) {
    return useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        dispatch((prev) => {
          const DtoConstructor = prev.constructor as DTOConstructorType<DTO>;

          return new DtoConstructor({ ...prev, [e.target.name]: e.target.value }) as DTO;
        });
      },
      [dispatch],
    );
  }
}

export const formService = new FormService();
