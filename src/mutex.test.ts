import { Mutex } from "./mutex";

test("hammer mutex", async () => {
  const m = new Mutex();
  let n = 0;

  async function hammer() {
    await m.lock();
    expect(n).toBe(0);

    n++;
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
    expect(n).toBe(1);

    n--;
    m.unLock();
  }

  await Promise.all(Array(10).fill(hammer()));
});

test("mutex misuse", async () => {
  const testcase = [
    {
      name: "Mutex.unLock",
      func: async () => {
        const m = new Mutex();
        m.unLock();
      },
    },
    {
      name: "Mutex.unLock2",
      func: async () => {
        const m = new Mutex();
        await m.lock();
        m.unLock();
        m.unLock();
      },
    },
  ];

  for (const n of testcase) {
    await expect(n.func()).rejects.toThrow("cannot unlock an unlocked mutex");
  }
});
