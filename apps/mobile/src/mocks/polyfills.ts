/* msw core가 기대하지만 Hermes 전역에 없는 최소 스텁.
 * msw core는 모듈 스코프에서 `new BroadcastChannel()`을 실행한다
 * (WebSocket 모킹용 — RN에선 쓰지 않으므로 no-op으로 충분하고,
 *  그 구현에 Event/EventTarget/MessageEvent가 딸려온다).
 * URL·TextEncoder류는 Expo SDK 57 winter 런타임이 전역 설치하므로 불필요.
 * 반드시 msw 모듈 평가 전에 import 되어야 한다 (ensureMocking이 순서를 보장). */

type Listener = (event: unknown) => void;

const g = globalThis as Record<string, unknown>;

if (typeof g.Event === "undefined") {
  g.Event = class Event {
    readonly type: string;
    constructor(type: string) {
      this.type = type;
    }
  };
}

if (typeof g.EventTarget === "undefined") {
  g.EventTarget = class EventTarget {
    private listeners = new Map<string, Set<Listener>>();

    addEventListener(type: string, listener: Listener) {
      let set = this.listeners.get(type);
      if (!set) {
        set = new Set();
        this.listeners.set(type, set);
      }
      set.add(listener);
    }

    removeEventListener(type: string, listener: Listener) {
      this.listeners.get(type)?.delete(listener);
    }

    dispatchEvent(event: { type: string }) {
      this.listeners.get(event.type)?.forEach((listener) => listener(event));
      return true;
    }
  };
}

if (typeof g.MessageEvent === "undefined") {
  const EventCtor = g.Event as new (type: string) => { type: string };
  g.MessageEvent = class MessageEvent extends EventCtor {
    readonly data: unknown;
    constructor(type: string, init?: { data?: unknown }) {
      super(type);
      this.data = init?.data;
    }
  };
}

if (typeof g.BroadcastChannel === "undefined") {
  g.BroadcastChannel = class BroadcastChannel {
    readonly name: string;
    onmessage: Listener | null = null;

    constructor(name: string) {
      this.name = name;
    }

    postMessage() {}
    addEventListener() {}
    removeEventListener() {}
    close() {}
  };
}
