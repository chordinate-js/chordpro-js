import match from './directive';

describe('Directive line matcher', () => {
  it('matches a basic directive', () => {
    const tokens = match('{start_of_chorus}');
    expect(tokens).toEqual([
      { type: 'directive', name: 'start_of_chorus' },
    ]);
  });

  it('matches a directive with value', () => {
    const tokens = match('{title: Twinkle Twinkle Little Star}');
    expect(tokens).toEqual([
      { type: 'directive', name: 'title', value: 'Twinkle Twinkle Little Star' },
    ]);
  });
});
