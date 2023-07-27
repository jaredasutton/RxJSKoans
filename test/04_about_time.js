import test from 'node:test';
import assert from 'node:assert';
import {Observable, Subject, of, asyncScheduler, delay, timeout} from 'rxjs';

// QUnit.module('Time');

const __ = 'Fill in the blank';

test('launching an event via a scheduler', function (_,done) {
  const state = null;
  let received = '';
  const delay = 600; // Fix this value
  asyncScheduler.schedule(function (scheduler, state) {
    received = 'Finished';
  }, delay, state);

  setTimeout(function () {
   done(assert.equal('Finished', received));
  }, 500);
});

test('launching an event in the future', function (_,done) {
  let received = null;
  const __ = 1000000000; 
  const time = __; // Fill in the blank

  const people = new Subject();
  people.pipe(
    delay(time)
  ).subscribe((x) => { received = x; });
  people.next('Godot');

  setTimeout(function () {
   done(assert.equal('Godot', received));
  }, 500)
});

test('a watched pot', function (_,done) {
  let received = '';
  const delayDuration = 500;
  const timeoutDuration = __;
  const timeoutEvent = of('Tepid');

  of('Boiling').pipe(
    delay(delayDuration),
    timeout({first: timeoutDuration, with: ()=>timeoutEvent})
  ).subscribe((x)=>{ received = x; });

  setTimeout(function() {
   done(assert.equal(received, 'Boiling'));
  }, 500);
});

//TODO below tests are not working

test('you can place a time limit on how long an event should take', function () {
  var received = [];
  var timeout = 2000;
  var timeoutEvent = of('Tepid');
  var temperatures = new Subject();

  temperatures.timeout(timeout, timeoutEvent).subscribe(received.push.bind(received));

  temperatures.next('Started');

  setTimeout(function () {
    temperatures.next('Boiling');
  }, 3000);

  setTimeout(function () {
   assert.equal(__, received.join(', '));
    start();
  }, 4000);
});

test('debouncing', function () {
  expect(1);

  var received = [];
  var events = new Subject();
  events.debounce(100).subscribe(received.push.bind(received));

  events.next('f');
  events.next('fr');
  events.next('fro');
  events.next('from');

  setTimeout(function () {
    events.next('r');
    events.next('rx');
    events.next('rxj');
    events.next('rxjs');

    setTimeout(function () {
     assert.equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

test('buffering', function () {
  var received = [];
  var events = new Subject();
  events.bufferWithTime(100)
    .map(function (c) { return c.join(''); })
    .subscribe(received.push.bind(received));

  events.next('R');
  events.next('x');
  events.next('J');
  events.next('S');

  setTimeout(function () {
    events.next('R');
    events.next('o');
    events.next('c');
    events.next('k');
    events.next('s');

    setTimeout(function () {
     assert.equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

test('time between calls', function () {
  var received = [];
  var events = new Subject();

  events.timeInterval()
    .filter(function (t) { return t.interval > 100; })
    .subscribe(function (t) { received.push(t.value); });

  events.next('too');
  events.next('fast');

  setTimeout(function () {
    events.next('slow');

    setTimeout(function () {
      events.next('down');

     assert.equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

test('results can be ambiguous timing', function () {
  var results = 0;
  var fst = Observable.timer(400).map(-1);
  var snd = Observable.timer(500).map(1);

  fst.amb(snd).subscribe(function (x) { results = x; });

  setTimeout(function () {
   assert.equal(results, __);
    start();
  }, 600);
});
