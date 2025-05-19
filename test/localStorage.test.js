import assert from 'node:assert/strict';
import { getItem, setItem, removeItem, clear } from '../src/localStorage.js';
import { test } from 'node:test';

test('set and get item', () => {
  setItem('foo', 'bar');
  assert.equal(getItem('foo'), 'bar');
});

test('remove item', () => {
  setItem('key', 'value');
  removeItem('key');
  assert.equal(getItem('key'), null);
});

test('clear storage', () => {
  setItem('a', '1');
  setItem('b', '2');
  clear();
  assert.equal(getItem('a'), null);
  assert.equal(getItem('b'), null);
});
