import test from 'node:test';
import assert from 'node:assert';
import {fromEvent} from 'rxjs';
import {EventEmitter} from 'events';

// QUnit.module('Events');

const __ = 'Fill in the blank';

test('the main event', function () {
  const received = [];
  const e = new EventEmitter();
  const subscription = fromEvent(e, 'change')
    .subscribe((x)=>received.push(x));

  e.emit('change', 'R');
  e.emit('change', 'x');
  e.emit('change', 'J');
  e.emit('change', 'S');

  subscription.unsubscribe();

  e.emit('change', '!');

 assert.equal(__, received.join(''));
});
