import test from 'node:test';
import assert from 'node:assert';
import {range, fromEvent, toArray, filter, map, bufferCount} from 'rxjs';
import {EventEmitter} from 'events';

// QUnit.module('Querying');

const __ = 'Fill in the blank';

test('Basic querying', function () {
  const strings = [];
  const numbers = range(1, 100);

  numbers.pipe(
    filter((x)=>(x % __ === 0)),
    map((x)=>(x.toString())),
    toArray()
  )
    .subscribe((x)=>{ strings.push(x); });

  assert.equal('11,22,33,44,55,66,77,88,99', strings.toString());
});

test('querying over events', function () {
  let results = 0;

  const e = new EventEmitter();
  fromEvent(e, 'click').pipe(
    filter((click)=>(click.x === click.y)),
    map((click)=>(__ + __))
  ).subscribe(function (x) { results = x; });

  e.emit('click', {x: 100, y: 50});
  e.emit('click', {x: 75,  y: 75});
  e.emit('click', {x: 40,  y: 80});

  assert.equal(results, 150);
});

test.only('buffering with count and skip', function () {
  const results = [];
  range(1, 10).pipe(
    bufferCount(__, __)
  ).subscribe((x)=>{ results.push(x); });

  assert.equal('12345',  results[0].join(''));
  assert.equal('678910', results[1].join(''));
});
