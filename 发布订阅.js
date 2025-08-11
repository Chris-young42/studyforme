class EventEmitter {
  /**
   * 初始化事件发射器实例
   * 创建一个空的事件对象用于存储事件和对应的处理函数列表
   */
  constructor() {
    this.events = {};
  }
  on(event, handler) {
    (this.events[event] || (this.events[event] = [])).push(handler);
  }
  off(event, handler) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((h) => h !== handler);
  }
  emit(event, ...args) {
    (this.events[event] || []).slice().forEach((h) => h(...args));
  }
  once(event, handler) {
    const fn = (...args) => {
      handler(...args);
      this.off(event, fn);
    };
    this.on(event, fn);
  }
}
