/*
There is Event Emitter in Node.js, Facebook once had its own implementation but now it is archived.

You are asked to create an Event Emitter Class

const emitter = new Emitter()
It should support event subscribing

const sub1  = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)
// same callback could subscribe 
// on same event multiple times
const sub3 = emitter.subscribe('event1', callback1)
emit(eventName, ...args) is used to trigger the callbacks, with args relayed

emitter.emit('event1', 1, 2);
// callback1 will be called twice
Subscription returned by subscribe() has a release() method that could be used to unsubscribe

sub1.release()
sub3.release()
// now even if we emit 'event1' again, 
// callback1 is not called anymore
*/

class EventEmitter {
  constructor() {
    this.eventMap = new Map();
  }

  subscribe(eventName, callback) {
    if (!this.eventMap.has(eventName)) this.eventMap.set(eventName, []);
    const index = this.eventMap.get(eventName).push(callback) - 1;

    return ({
      release: () => {
        if (this.eventMap.has(eventName)) {
          this.eventMap.get(eventName).splice(index, 1)
        }
      }
    })
  }

  emit(eventName, ...args) {
    if (!this.eventMap.has(eventName)) return;
    this.eventMap.get(eventName).forEach(cb => {
      cb.apply(this, args)
    })
  }
}