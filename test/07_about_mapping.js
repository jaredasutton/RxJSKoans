import test from 'node:test';
import assert from 'node:assert';
import {Observable} from 'rxjs';

// QUnit.module('Mapping');

var __ = 'Fill in the blank';

test('flatMap can be a cartesian product', function () {
  var results = [];
  Observable.range(1, 3)
    .flatMap(function (x, i) {
      return Observable.range(__, __);
    })
    .subscribe(results.push.bind(results));

 assert.equal('234', results.join(''));
});

test('flatMapLatest only gets us the latest value', function () {
  var results = [];
  Observable.range(1, 3)
    .flatMapLatest(function (x) {
      return Observable.range(x, ___);
    })
    .subscribe(results.push.bind(results));

 assert.equal('12345', results.join(''));
});
