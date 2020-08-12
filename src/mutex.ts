/**
 * Mutex provides a mutex lock.
 */
export class Mutex {
  // default is 0, state = 0 is free, state = 1 is locked.
  private state = 0;
  private queue: (() => void)[] = [];

  /**
   * lock locks the mutex. If the mutex has been locked, we will wait for the mutex to be available.
   */
  public async lock(): Promise<void> {
    if (this.state == 0) {
      this.state = 1;
      return;
    }

    return new Promise((resolve) => {
      this.queue.push(resolve);
    });
  }

  /**
   * unLock unlocks the mutex. If the mutex is not locked, an error is thrown.
   */
  public unLock(): void {
    if (this.state == 0) {
      throw new Error("cannot unlock an unlocked mutex");
    } else if (this.queue.length > 0) {
      this.queue.shift()?.();
      if (this.queue.length == 0) {
        this.state = 0;
      }
    } else {
      this.state = 0;
    }
  }
}
