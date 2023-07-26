import test from 'node:test';
import assert from 'node:assert';
import {Observable, Subject, of} from 'rxjs';

// QUnit.module('Advanced Streams');

var __ = 'Fill in the blank';

test('merging', function () {
  var easy = [];
  var you = of(1,2,3);
  var me = of('A','B','C');
  you.merge(me).subscribe(easy.push.bind(easy));
 assert.equal(easy.join(' '), __);
});

test('merging events', function () {
  var first = [];
  var both = [];

  var s1 = new Subject();
  var s2 = new Subject();

  s1.subscribe(first.push.bind(first));
  s1.merge(s2).subscribe(both.push.bind(both));

  s1.onNext('I');
  s1.onNext('am');
  s2.onNext('nobody.');
  s2.onNext('Nobody');
  s2.onNext('is');
  s1.onNext('perfect.');

 assert.equal('I am nobody. Nobody is perfect.', both.join(' '));
 assert.equal(__, first.join(' '));
});

test('splitting up', function () {
  var oddsAndEvens = [];
  var numbers = Observable.range(1, 9);
  var split = numbers.groupBy(function (n) { return n % __; });
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
  var averages = [0,0];
  var numbers = of(22,22,99,22,101,22);
  var split = numbers.groupBy(function (n) { return n % 2; });

  split.subscribe(function (g) {
    g.average().__(function (a) { averages[g.key] = a; });
  });

 assert.equal(22, averages[0]);
 assert.equal(100, averages[1]);
});

test('multiple subscriptions', function () {
  var numbers = new Subject();
  var sum = 0;
  var average = 0;

  numbers.sum().subscribe(function (n) { sum = n; });
  numbers.onNext(1);
  numbers.onNext(1);
  numbers.onNext(1);
  numbers.onNext(1);
  numbers.onNext(1);

  numbers.average().subscribe(function (n) { average = n; });
  numbers.onNext(2);
  numbers.onNext(2);
  numbers.onNext(2);
  numbers.onNext(2);
  numbers.onNext(2);

  numbers.onCompleted();

 assert.equal(15, sum);
 assert.equal(__, average);
});
