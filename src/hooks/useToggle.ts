export interface CardState {
  _i: number;
  active: boolean;
}

export type ToggleAcitve = (state: CardState[]) => void;

export interface InitOptions {
  onUpdate: ToggleAcitve;
  total: number;
}

export class Toggle {
  private onUpdate: ToggleAcitve;
  private amount: number;
  public state: CardState[];

  constructor(initOptions: InitOptions) {
    this.onUpdate = initOptions.onUpdate;
    this.amount = initOptions.total;
    this.state = this.initState(this.amount);
  }

  initState(len: number): Array<CardState> {
    return Array.from({ length: len }).map((_, i) => ({
      _i: i,
      active: false,
    }));
  }

  change(index: number): void {
    this.state[index].active = !this.state[index].active;
    this.onUpdate(this.state);
  }
}

export default function useToggle(initOptions: InitOptions) {
  return new Toggle(initOptions);
}
