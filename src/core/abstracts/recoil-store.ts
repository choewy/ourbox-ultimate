import { atom, RecoilState, useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { v4 } from 'uuid';

export abstract class RecoilStore<StoreValue> {
  private readonly store: RecoilState<StoreValue>;

  constructor(
    public readonly name: string,
    public readonly defaultValue?: StoreValue,
  ) {
    this.store = atom({
      key: [name, v4()].join('_'),
      default: defaultValue,
    });
  }

  public useState() {
    return useRecoilState(this.store);
  }

  public useValue() {
    return useRecoilValue(this.store);
  }

  public useDispatch() {
    return useSetRecoilState(this.store);
  }

  public useResetDispatch() {
    return useResetRecoilState(this.store);
  }
}
