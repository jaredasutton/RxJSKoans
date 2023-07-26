import test from 'node:test';
import assert from 'node:assert';
import {Observable, of} from 'rxjs';

// QUnit.module('Imperative');

var __ = 'Fill in the blank';

test('can make a decision with an if with no else', function () {
  var results = [];
  Observable.range(1, 10)
    .flatMap(function (x) {
      return Rx.Observable.if(
        function () { return x % 2 === 0; },
        of(x)
      );
    })
    .subscribe(results.push.bind(results));

 assert.equal(__, results.join(''));
});

test('can make a decision with an if with an else', function () {
  var results = [];
  Observable.range(1, 5)
    .flatMap(function (x, i) {
      return Rx.Observable.if(
        function () { return x % 2 === 0; },
        of(x),
        Observable.range(x, i)
      );
    })
    .subscribe(results.push.bind(results));

 assert.equal(__, results.join(''));
});

test('we can make test cases', function () {
  var result = '';

  var cases = {
    'matt': of(1),
    'erik': of(2),
    'bart': of(3),
    'wes': of(4)
  };

  of(__)
    .flatMap(function (x) {
      return Observable.case(
        function () { return x; },
        cases
      );
    })
    .subscribe(function (x) { result = x; });

 assert.equal(4, result);
});

test('we can also have a default case', function () {
  var result = '';

  var cases = {
    'matt': of(1),
    'erik': of(2),
    'bart': of(3),
    'wes': of(4)
  };

  of('RxJS')
    .flatMap(function (x) {
      return Observable.case(
        function () { return x; },
        cases,
        of(__)
      );
    })
    .subscribe(function (x) { result = x; });

 assert.equal(5, result);
});

test('while does something until proven false', function () {
  var i = 0;
  var result = [];

  var source = Rx.Observable
    .while(
      function () { return ++i < 3 },
      Rx.of(__)
    )
    .subscribe(result.push.bind(result));

 assert.equal('4242', result.join(''));
});
