import test from 'node:test';
import assert from 'node:assert';
import {Observable, Subject, of} from 'rxjs';
import {Range} from '../util/range.js';

// QUnit.module('Observable Streams');

const __ = 'Fill in the blank';

test('simple subscription', function () {
  of(42).subscribe(function (x) {assert.equal(x, __); });
});

test('what comes in goes out', function () {
  of(__).subscribe(function (x) {assert.equal(x, 101); });
});

// Which interface Rx apply? (hint: what does "just()" return)
test('this is the same as an event stream', function () {
  const events = new Subject();
  events.subscribe(function (x) {assert.equal(__, x); });
  events.next(37);
});

// What is the relationship between "this is the same as an event stream" and "simple subscription"?
test('how event streams relate to observables', function () {
  let observableResult = 1;
  of(73).subscribe(function (x) { observableResult = x; });

  let eventStreamResult = 1;
  const events = new Subject();
  events.subscribe(function (x) { eventStreamResult = x; });
  events.__(73);

  assert.equal(observableResult, eventStreamResult);
});

// What does of() map to for a Subject?
test('event streams have multiple results', function () {
  let eventStreamResult = 0;
  const events = new Subject();
  events.subscribe(function (x) { eventStreamResult += x; });

  events.next(10);
  events.next(7);

 assert.equal(__, eventStreamResult);
});

// What does of() map to for a Subject?
test('simple return', function () {
  let received = '';
  of('foo').subscribe(function (x) { received = x; });

 assert.equal(__, received);
});

test('the last event', function () {
  let received = '';
  const names = ['foo', 'bar'];
  Observable.from(names).subscribe(function (x) { received = x; });

 assert.equal(__, received);
});

test('everything counts', function () {
  var received = 0;
  var numbers = [3, 4];
  Observable.from(numbers).subscribe(function (x) { received += x; });

 assert.equal(__, received);
});

test('this is still an event stream', function () {
  var received = 0;
  var numbers = new Subject();
  numbers.subscribe(function (x) { received += x; });

  numbers.onNext(10);
  numbers.onNext(5);

 assert.equal(__, received);
});

test('all events will be received', function () {
  var received = 'Working ';
  var numbers = Range.create(9, 5);

  Observable.from(numbers).subscribe(function (x) { received += x; });

 assert.equal(__, received);
});

test('do things in the middle', function () {
  var status = [];
  var daysTilTest = Observable.from(Range.create(4, 1));

  daysTilTest.tap(function (d) { status.push(d + '=' + (d === 1 ? 'Study Like Mad' : __)); }).subscribe();

 assert.equal('4=Party,3=Party,2=Party,1=Study Like Mad', status.toString());
});

test('nothing listens until you subscribe', function () {
  var sum = 0,
      numbers = Observable.from(Range.create(1, 10)),
      observable = numbers.tap(function (n) { sum += n; });

 assert.equal(0, sum);
  observable.__();

 assert.equal(1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10, sum);
});

test('events before you subscribe do not count', function () {
  var sum = 0,
      numbers = new Subject(),
      observable = numbers.tap(function (n) { sum += n; });

  numbers.onNext(1);
  numbers.onNext(2);

  observable.subscribe();

  numbers.onNext(3);
  numbers.onNext(4);

 assert.equal(__, sum);
});

test('events after you unsubscribe dont count', function () {
  var sum = 0,
      numbers = new Subject(),
      observable = numbers.tap(function (n) { sum += n; }),
      subscription = observable.subscribe();

  numbers.onNext(1);
  numbers.onNext(2);

  subscription.dispose();

  numbers.onNext(3);
  numbers.onNext(4);

 assert.equal(__, sum);
});

test('events while subscribing', function () {
  var received = [],
      words = new Subject(),
      observable = words.tap(received.push.bind(received));

  words.onNext('Peter');
  words.onNext('said');

  var subscription = observable.subscribe();

  words.onNext('you');
  words.onNext('look');
  words.onNext('pretty');

  subscription.dispose();

  words.onNext('ugly');

 assert.equal(__, received.join(' '));
});
