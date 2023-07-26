import test from 'node:test';
import assert from 'node:assert';
import {tap, from, range, reduce, filter, map, every} from 'rxjs';
import {Range} from '../util/range.js';

// QUnit.module('Composable Observations');

const __ = 'Fill in the blank';
const add = (x, y)=>(x + y);

test('composable add', function () {
  let received = 0;
  const numbers = [10, 100, __];
  const sum = from(numbers).pipe(reduce(add));

  sum.subscribe(function (x) { received = x; });

  assert.equal(1110, received);
});

test('composable before and after', function () {
  const numbers = Range.create(1, 6);
  let a = '';
  let b = '';

  from(numbers).pipe(
    tap((n)=>{ a += n; }),
    filter((n)=>(n % 2 === 0)),
    tap((n)=>{ b += n; })
  )
  .subscribe();

  assert.equal(__, a);
  assert.equal('246', b);
});

test('we wrote this', function () {
  const received = [];
  const names = ["Bart", "Marge", "Wes", "Linus", "Erik", "Matt"];

  from(names).pipe(
    filter((x)=>(x.length <= __)),
  ).subscribe((x)=>{ received.push(x); });

  assert.equal('Bart,Wes,Erik,Matt', received.toString());
});

test('converting events', function () {
  let received = '';
  const names = ["wE", "hOpE", "yOU", "aRe", "eNJoyIng", "tHiS"];

  from(names).pipe(
    map((x)=>(x.__())),
  ).subscribe((x)=>{ received += `${x} `; });

  assert.equal('we hope you are enjoying this ', received);
});

test('create a more relevant stream', function () {
  let received = '';
  const mouseXMovements = [100, 200, 150];
  const relativemouse = from(mouseXMovements).pipe(
    map((x)=>(x - __))
  );

  relativemouse.subscribe(function (x) { received += `${x}, `; });

 assert.equal('50, 150, 100, ', received);
});

test('checking everything', function () {
  let received = null;
  const names = [2,4,6,8];

  from(names).pipe(
    every((x)=>(x % 2 === 0))
  ).subscribe(function (x) { received = x; });

  assert.equal(__, received);
});

test.only('composition means the sum is greater than the parts', function () {
  let received = 0;
  const numbers = range(1, 10);

  numbers.pipe(
    filter((x)=>(x > __)),
    reduce(add)
  ).subscribe(function (x) { received = x; });

 assert.equal(19, received);
});
