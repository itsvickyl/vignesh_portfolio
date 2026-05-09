import { test, describe } from 'node:test';
import assert from 'node:assert';
import { setupCounter } from './counter.js';

describe('setupCounter', () => {
  test('should initialize counter with 0', () => {
    const element = {
      innerHTML: '',
      addEventListener: () => {}
    };

    setupCounter(element);

    assert.strictEqual(element.innerHTML, 'Count is 0');
  });

  test('should increment counter on click', () => {
    let clickHandler;
    const element = {
      innerHTML: '',
      addEventListener: (type, handler) => {
        if (type === 'click') {
          clickHandler = handler;
        }
      }
    };

    setupCounter(element);
    assert.strictEqual(element.innerHTML, 'Count is 0');

    if (clickHandler) {
      clickHandler();
    }
    assert.strictEqual(element.innerHTML, 'Count is 1');

    if (clickHandler) {
      clickHandler();
    }
    assert.strictEqual(element.innerHTML, 'Count is 2');
  });
});
