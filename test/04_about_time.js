const Rx = require('rxjs'),
    Observable = Rx.Observable,
    Subject = Rx.Subject,
    Scheduler = Rx.Scheduler;

QUnit.module('Time');

var __ = 'Fill in the blank';

asyncTest('launching an event via a scheduler', function () {
  var state = null;
  var received = '';
  var delay = 600; // Fix this value
  Scheduler.default.scheduleFuture(state, delay, function (scheduler, state) {
    received = 'Finished';
  });

  setTimeout(function () {
    start();
    equal('Finished', received);
  }, 500);
});

asyncTest('launching an event in the future', function () {
  var received = null;
  var time = __;

  var people = new Subject();
  people.delay(time).subscribe(function (x) { received = x; });
  people.onNext('Godot');

  setTimeout(function () {
    equal('Godot', received);
    start();
  }, 500)
});

asyncTest('a watched pot', function () {
  var received = '';
  var delay = 500;
  var timeout = __;
  var timeoutEvent = of('Tepid');

  Observable
    of('Boiling')
    .delay(delay)
    .timeout(timeout, timeoutEvent)
    .subscribe(function(x) { received = x; });

  setTimeout(function() {
    equal(received, 'Boiling');
    start();
  }, 500);
});

asyncTest('you can place a time limit on how long an event should take', function () {
  var received = [];
  var timeout = 2000;
  var timeoutEvent = of('Tepid');
  var temperatures = new Subject();

  temperatures.timeout(timeout, timeoutEvent).subscribe(received.push.bind(received));

  temperatures.onNext('Started');

  setTimeout(function () {
    temperatures.onNext('Boiling');
  }, 3000);

  setTimeout(function () {
    equal(__, received.join(', '));
    start();
  }, 4000);
});

asyncTest('debouncing', function () {
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
      equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

asyncTest('buffering', function () {
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
      equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

asyncTest('time between calls', function () {
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

      equal(__, received.join(' '));
      start();
    }, 120);
  }, 120);
});

asyncTest('results can be ambiguous timing', function () {
  var results = 0;
  var fst = Observable.timer(400).map(-1);
  var snd = Observable.timer(500).map(1);

  fst.amb(snd).subscribe(function (x) { results = x; });

  setTimeout(function () {
    equal(results, __);
    start();
  }, 600);
});
