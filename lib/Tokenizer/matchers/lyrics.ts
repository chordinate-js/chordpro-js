import { Token } from '../Tokenizer';

export interface MatchHandler {
  (matches: string[], offset: number): Token;
}

export const createMatcher = (regex: RegExp, matchHandler: MatchHandler) => {
  return function lyricsMatcher(line: string): Token[] {
    const tokens: Token[] = [];

    let lastOffset = 0;
    let match: RegExpExecArray | null;

    while (null !== (match = regex.exec(line))) {
      // Add contents between end of last match (if any) and the beginning
      // of the next match as a "lyric" token.
      if (match.index > lastOffset) {
        tokens.push({ type: 'lyric', value: line.substring(lastOffset, match.index) });
      }

      // Transform the match into a token, and push it on the tokens list.
      const matchToken = matchHandler(match, match.index);
      tokens.push(matchToken);

      // Update last known offset to the end of the last match.
      lastOffset = match.index + match[0].length;
    }

    // Add leftover contents after the last match as a "lyric" token (if any).
    if (lastOffset < line.length) {
      tokens.push({ type: 'lyric', value: line.substr(lastOffset) });
    }

    return tokens;
  };
};

// Export default lyrics matcher implementation with simple chord support.
export const CHORD_REGEX = /\[([^\]]+)\]/g;
const chordMatchHandler: MatchHandler = (match) => {
  const chordValue = match[1];

  return { type: 'chord', value: chordValue };
};

export default createMatcher(CHORD_REGEX, chordMatchHandler);
