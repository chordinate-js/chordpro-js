import tokenize from './lineComment';

describe('Line comment matcher', () => {
  it('matches a line comment', () => {
    let tokens;

    tokens = tokenize('# A line comment');
    expect(tokens).toEqual([
      { type: 'comment', value: 'A line comment' },
    ], 'Failed to match a regular line comment');

    tokens = tokenize('#A line comment without leading space');
    expect(tokens).toEqual([
      { type: 'comment', value: 'A line comment without leading space' },
    ], 'Failed to match a line comment without leading space');
  });

  it('ignores trailing whitespace', () => {
    const tokens = tokenize('# A line comment with trailing spaces   ');
    expect(tokens).toEqual([
      { type: 'comment', value: 'A line comment with trailing spaces' },
    ]);
  });

  it('should not match lines containing a hashtag in the middle', () => {
    const tokens = tokenize('This should not be a # line comment');
    expect(tokens).toBeUndefined();
  });
});
