import test from 'node:test';
import assert from 'node:assert';
import {
  Observable,
  Subject,
  of,
  asyncScheduler,
  delay,
  timeout,
  debounceTime,
  bufferTime,
  map,
  timeInterval,
  filter,
  timer,
  race
} from "rxjs";

// QUnit.module('Time');

const __ = 'Fill in the blank';

test('launching an event via a scheduler', function (_,done) {
  const state = null;
  let received = '';
  const delay = 600; // Fix this value
  asyncScheduler.schedule(function (scheduler, state) {
    received = 'Finished';
  }, delay, state);

  setTimeout(()=>{
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

  setTimeout(()=>{
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

  setTimeout(()=>{
   done(assert.equal(received, 'Boiling'));
  }, 500);
});

test('you can place a time limit on how long an event should take', function (_,done) {
  const received = [];
  const timeoutDuration = 2000;
  const timeoutEvent = of('Tepid');
  const temperatures = new Subject();

  temperatures.pipe(
    timeout({each: timeoutDuration, with: ()=>timeoutEvent})
  ).subscribe((x)=>received.push(x));

  temperatures.next('Started');

  setTimeout(()=>{
    temperatures.next('Boiling');
  }, 3000);

  setTimeout(()=>{
   done(assert.equal(__, received.join(', ')))
  }, 4000);
});

test('debouncing', function (_,done) {
  const received = [];
  const events = new Subject();
  events.pipe(
    debounceTime(100)
  ).subscribe((x)=>received.push(x));

  events.next('f');
  events.next('fr');
  events.next('fro');
  events.next('from');

  setTimeout(()=>{
    events.next('r');
    events.next('rx');
    events.next('rxj');
    events.next('rxjs');

    setTimeout(()=>{
     done(assert.equal(__, received.join(' ')));
    }, 120);
  }, 120);
});

test('buffering', function (_,done) {
  const received = [];
  const events = new Subject();
  events.pipe(
    bufferTime(100),
    map((c)=>c.join(''))
  ).subscribe((x)=>{ received.push(x); });

  events.next('R');
  events.next('x');
  events.next('J');
  events.next('S');

  setTimeout(()=>{
    events.next('R');
    events.next('o');
    events.next('c');
    events.next('k');
    events.next('s');

    setTimeout(()=>{
     done(assert.equal(__, received.join(' ')));
    }, 120);
  }, 120);
});

test('time between calls', function (_,done) {
  const received = [];
  const events = new Subject();

  events.pipe(
    timeInterval(),
    filter((t)=>(t.interval > 100))
  ).subscribe(({value})=>{ received.push(value); });

  events.next('too');
  events.next('fast');

  setTimeout(()=>{
    events.next('slow');

    setTimeout(()=>{
      events.next('down');

     done(assert.equal(__, received.join(' ')));
    }, 120);
  }, 120);
});

test.only('results can be ambiguous timing', function (_,done) {
  let results = 0;
  const fst = timer(400).pipe(map(()=>-1));
  const snd = timer(500).pipe(map(()=>1));

  race(fst, snd).subscribe(function (x) { results = x; });

  setTimeout(()=>{
   done(assert.equal(results, __));
  }, 600);
});
