import { atom, RecoilState, useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

export abstract class RecoilStore<T> {
  private store: RecoilState<T>;

  constructor(
    public readonly key: string,
    public readonly initValue: T,
  ) {
    this.store = atom({ key, default: initValue });
  }

  public useValue() {
    return useRecoilValue(this.store);
  }

  public useState() {
    return useRecoilState(this.store);
  }

  public useSetState() {
    return useSetRecoilState(this.store);
  }

  public useResetState() {
    return useResetRecoilState(this.store);
  }
}
