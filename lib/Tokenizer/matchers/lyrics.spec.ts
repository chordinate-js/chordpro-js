import { Token } from '../Tokenizer';
import match, { createMatcher } from './lyrics';

describe('Lyrics matcher', () => {
  it('matches pure lyrics', () => {
    const tokens = match('Twinkle, twinkle little star');
    expect(tokens).toEqual([
      { type: 'lyric', value: 'Twinkle, twinkle little star' },
    ]);
  });

  it('matches a simple chord', () => {
    const tokens =  match('[C]');
    expect(tokens).toEqual([
      { type: 'chord', value: 'C' },
    ]);
  });

  it('matches an advanced chord', () => {
    const tokens = match('[Bb(add9)/D]');
    expect(tokens).toEqual([
      { type: 'chord', value: 'Bb(add9)/D' },
    ]);
  });

  it('matches text as lyrics', () => {
    const tokens = match('Twinkle, twinkle little star.');
    expect(tokens).toEqual([
      { type: 'lyric', value: 'Twinkle, twinkle little star.' },
    ]);
  });

  it('matches a line of lyrics with chords inside', () => {
    const tokens = match('[C]Twinkle, twinkle [F]little [C]star.');
    expect(tokens).toEqual([
      { type: 'chord', value: 'C' },
      { type: 'lyric', value: 'Twinkle, twinkle ' },
      { type: 'chord', value: 'F' },
      { type: 'lyric', value: 'little ' },
      { type: 'chord', value: 'C' },
      { type: 'lyric', value: 'star.' },
    ]);
  });

  it('matches chords inside a line of lyrics that doesn\'t start with a chord', () => {
    const tokens = match('He [C]could not [F]see which [C]way to [G7]go,');
    expect(tokens).toEqual([
      { type: 'lyric', value: 'He ' },
      { type: 'chord', value: 'C' },
      { type: 'lyric', value: 'could not ' },
      { type: 'chord', value: 'F' },
      { type: 'lyric', value: 'see which ' },
      { type: 'chord', value: 'C' },
      { type: 'lyric', value: 'way to ' },
      { type: 'chord', value: 'G7' },
      { type: 'lyric', value: 'go,' },
    ]);
  });

  it('supports a customizable pattern matcher', () => {
    // This example is completely fictive, and has nothing to do with standard ChordPro... at all.
    // But if it can even do THIS? I mean, come on...! How's that for extendability? ;D

    // | (name)[: (value)] |
    const inlineDirectiveRegex = new RegExp('\\|\\s*([^:]+)((\\s*:\\s*)([^|]+))\\s*?\\|');

    // /* (value) */
    const inlineCommentRegex = new RegExp('\\/\\*\\s*([\\S\\s]*?)\\s*\\*\\/');

    const combinedRegex = new RegExp(inlineDirectiveRegex.source + '|' + inlineCommentRegex.source, 'g');
    const customMatcher = createMatcher(combinedRegex, (match, offset): Token => {
      const comment = match[5] && match[5].trim();
      if (typeof comment !== 'undefined') {
        return { type: 'comment', value: comment };
      }

      const directiveName = match[1].trim();
      const directiveValue = match[4].trim();

      return <any> { type: 'inline_directive', name: directiveName, value: directiveValue };
    });

    const tokens = customMatcher('This is a | voices: 3 |more advanced /* ignore this inline comment */example.');
    expect(tokens).toEqual([
      { type: 'lyric', value: 'This is a ' },
      { type: 'inline_directive', name: 'voices', value: '3' } as any, // => any, because 'inline_directive' is made up.
      { type: 'lyric', value: 'more advanced ' },
      { type: 'comment', value: 'ignore this inline comment' },
      { type: 'lyric', value: 'example.' },
    ]);

    // ¯\_(ツ)_/¯
  });
});
