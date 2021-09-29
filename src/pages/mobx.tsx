import { makeAutoObservable } from 'mobx';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

class Timer {
  t = 0;
  constructor() {
    makeAutoObservable(this);
  }
  increase() {
    this.t++;
  }
  reset() {
    this.t = 0;
  }
}

const myTimer = new Timer();
type TimerViewPoprs = {
  timer?: Timer;
};
export const TimerView: React.FC<TimerViewPoprs> = observer(({ timer = myTimer }) => {
  useEffect(() => {
    const intervalTimer = setInterval(() => {
      myTimer.increase();
    }, 1000);
    return () => {
      myTimer.reset();
      clearInterval(intervalTimer);
    };
  }, []);
  return <button onClick={() => timer.reset()}>t: {timer.t}</button>;
});
