import test from 'node:test';
import assert from 'node:assert';
import {Observable, Subject, merge, of, range, groupBy, reduce, map} from 'rxjs';

// QUnit.module('Advanced Streams');

const __ = 'Fill in the blank';

test('merging', function () {
  const easy = [];
  const you = of(1,2,3);
  const me = of('A','B','C');
  merge(you, me).subscribe((x)=>easy.push(x));
 assert.equal(easy.join(' '), __);
});


test('merging events', function () {
  const first = [];
  const both = [];

  const s1 = new Subject();
  const s2 = new Subject();

  s1.subscribe((x)=>first.push(x));
  merge(s1, s2).subscribe((x)=>both.push(x));

  s1.next('I');
  s1.next('am');
  s2.next('nobody.');
  s2.next('Nobody');
  s2.next('is');
  s1.next('perfect.');

 assert.equal('I am nobody. Nobody is perfect.', both.join(' '));
 assert.equal(__, first.join(' '));
});

test('splitting up', function () {
  const oddsAndEvens = [];
  const numbers = range(1, 9);
  const split = numbers.pipe(groupBy((n)=>(n % __)));
  split.subscribe(function (group) {
    group.subscribe(function (n) {
      oddsAndEvens[group.key] || (oddsAndEvens[group.key] = '');
      oddsAndEvens[group.key] += n;
    })
  });

 assert.equal('2468', oddsAndEvens[0]);
 assert.equal('13579', oddsAndEvens[1]);
});

test('need to subscribe immediately when splitting', function () {
  const averages = [0,0];
  const numbers = of(22,22,99,22,101,22);
  const split = numbers.pipe(groupBy((n)=>(n % 2)));

  split.subscribe(function (g) {
    g.pipe(
      reduce((acc, curr) => ({ sum: acc.sum + curr, count: acc.count + 1 }), {
        sum: 0,
        count: 0,
      }),
      map((x) => x.sum / x.count)
    ).__(function (a) {
      averages[g.key] = a;
    });
  });

 assert.equal(22, averages[0]);
 assert.equal(100, averages[1]);
});

test.only('multiple subscriptions', function () {
  const numbers = new Subject();
  let sum = 0;
  let average = 0;

  numbers.pipe(
    reduce((acc, curr) => acc + curr, 0)
  ).subscribe((n)=>{ sum = n; });
  numbers.next(1);
  numbers.next(1);
  numbers.next(1);
  numbers.next(1);
  numbers.next(1);

  numbers.pipe(
    reduce((acc, curr) => ({ sum: acc.sum + curr, count: acc.count + 1 }), {
      sum: 0,
      count: 0,
    }),
    map((x) => x.sum / x.count)
  ).subscribe((n)=>{ average = n; });
  numbers.next(2);
  numbers.next(2);
  numbers.next(2);
  numbers.next(2);
  numbers.next(2);

  numbers.complete();

 assert.equal(15, sum);
 assert.equal(__, average);
});