import test from 'node:test';
import assert from 'node:assert';
import {Observable} from 'rxjs';
import {EventEmitter} from 'events';

// QUnit.module('Events');

var __ = 'Fill in the blank';

test('the main event', function () {
  var received = [];
  var e = new EventEmitter();
  var subscription = Observable.fromEvent(e, 'change')
    .subscribe(received.push.bind(received));

  e.emit('change', 'R');
  e.emit('change', 'x');
  e.emit('change', 'J');
  e.emit('change', 'S');

  subscription.dispose();

  e.emit('change', '!');

 assert.equal(__, received.join(''));
});
