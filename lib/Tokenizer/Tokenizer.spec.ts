import { Tokenizer } from './Tokenizer';

const createSpy = jasmine.createSpy;

describe('Tokenizer', () => {
  let t: Tokenizer;
  beforeEach(() => {
    t = new Tokenizer();
  });

  it('has no matchers by default', () => {
    expect(t.matchers.length).toBe(0);
  });

  it('adds matchers using a default priority', () => {
    const matcher = createSpy('a matcher');

    t.addMatcher(matcher);

    expect(t.matchers[0].priority).toBe(0);
    expect(t.matchers[0].fn).toBe(matcher);
  });

  it('adds matchers with different priorities by priority, descending', () => {
    const matcherA = createSpy('first matcher');
    const matcherB = createSpy('second matcher');

    t.addMatcher(matcherB, 10);
    t.addMatcher(matcherA, 5);

    expect(t.matchers.length).toBe(2, 'Expected tokenizer to have 2 matchers');
    expect(t.matchers[0].fn).toBe(matcherA);
    expect(t.matchers[1].fn).toBe(matcherB);
    expect(t.matchers[0].priority).toBe(5, 'Incorrect priority for matcher A');
    expect(t.matchers[1].priority).toBe(10, 'Incorrect priority for matcher B');
  });

  it('adds matchers with the same priority sequentially', () => {
    const matcherB = createSpy('first matcher');
    const matcherA = createSpy('second matcher');
    const matcherC = createSpy('third matcher');

    t.addMatcher(matcherA, 5);
    t.addMatcher(matcherC, 7);
    t.addMatcher(matcherB, 5);

    expect(t.matchers.length).toBe(3, 'Expected tokenizer to have 3 matchers');
    expect(t.matchers[0].fn).toBe(matcherB);
    expect(t.matchers[1].fn).toBe(matcherA);
    expect(t.matchers[2].fn).toBe(matcherC);
    expect(t.matchers[0].priority).toBe(5, 'Incorrect priority for matcher B');
    expect(t.matchers[1].priority).toBe(5, 'Incorrect priority for matcher A');
    expect(t.matchers[2].priority).toBe(7, 'Incorrect priority for matcher C');
  });

  it('removes matchers with the same priority', () => {
    const matcherA = createSpy('first matcher');
    const matcherB = createSpy('second matcher');

    t.addMatcher(matcherA, 5);
    t.addMatcher(matcherA, 7);
    t.addMatcher(matcherB, 3);

    expect(t.matchers.length).toBe(3, 'Expected tokenizer to have 3 matchers before removal');

    const ret = t.removeMatcher(matcherA, 7);
    expect(ret).toBe(true);

    expect(t.matchers.length).toBe(2, 'Expected tokenizer to have only 2 matchers left after removal');
    expect(t.matchers[0].fn).toBe(matcherB);
    expect(t.matchers[1].fn).toBe(matcherA);
    expect(t.matchers[1].priority).toBe(5, 'Removed instance of matcher A with wrong priority');
  });

  it('removes all matchers having the same callback', () => {
    const matcherA = createSpy('first matcher');
    const matcherB = createSpy('second matcher');

    t.addMatcher(matcherA, 5);
    t.addMatcher(matcherA, 7);
    t.addMatcher(matcherB, 3);

    expect(t.matchers.length).toBe(3, 'Expected tokenizer to have 3 matchers before removal');

    t.removeMatcher(matcherA);
    expect(t.matchers.length).toBe(1, 'Expected tokenizer to have only 1 matcher left after removal');
    expect(t.matchers[0].fn).toBe(matcherB);
  });
});
