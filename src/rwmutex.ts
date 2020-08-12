/**
 * RWMutex provides reader/writer mutex lock.
 */
import { Mutex } from "./mutex";

export class RWMutex {
  private m = new Mutex();

  /**
   * lock locks the RWMutex for writing.
   */
  public async lock() {
    await this.m.lock();
  }
  /**
   * unLock unlocks the RWMutex for writing.
   */
  public async unLock() {
    this.m.unLock();
  }

  /**
   * lock locks the RWMutex for reading.
   */
  public async rLock() {}

  /**
   * lock unlocks the RWMutex for reading.
   */
  public async rUnLock() {}
}
