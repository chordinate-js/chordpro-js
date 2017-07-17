import { MatcherInterface } from './matchers';
import { EOL } from 'os';

export interface DirectiveToken {
  type: 'directive';
  name: string;
  value?: string;
};

export interface LyricToken {
  type: 'lyric';
  value: string;
};

export interface ChordToken {
  type: 'chord';
  value: string;
};

export interface CommentToken {
  type: 'comment';
  value: string;
};

export interface NewlineToken {
  type: 'newline';
};

export type Token = DirectiveToken | LyricToken | ChordToken | CommentToken | NewlineToken;

export interface MatcherCallback {
  fn: MatcherInterface,
  priority: number,
};

class Tokenizer {
  private _matchers: MatcherCallback[] = [];

  get matchers(): MatcherCallback[] {
    return this._matchers.slice();
  }

  addMatcher(fn: MatcherInterface, priority: number = 0): void {
    const registeredMatchers = this._matchers;
    const callbackObj: MatcherCallback = { fn, priority };

    // Order by priority, ascending. Most recently added is inserted first.
    for (let i = 0; i < registeredMatchers.length; i++) {
      if (priority <= registeredMatchers[i].priority) {
        registeredMatchers.splice(i, 0, callbackObj);
        return;
      }
    }

    registeredMatchers.push(callbackObj);
  }

  removeMatcher(fn: MatcherInterface, priority?: number): boolean {
    const registeredMatchers = this._matchers;

    let wasRemoved = false;
    const hasPriorityArg = (typeof priority !== 'undefined');

    for (let i = registeredMatchers.length - 1; i >= 0; i--) {
      // Matcher callbacks should be the same.
      if (registeredMatchers[i].fn !== fn) {
        continue;
      }

      // Either the priorities should be the same, or we don't care about the priority at all.
      const shouldRemove = !hasPriorityArg || priority === registeredMatchers[i].priority;
      if (shouldRemove) {
        registeredMatchers.splice(i, 1);
        wasRemoved = true;
      }
    }

    return wasRemoved;
  }

  tokenize(data: string): Token[] {
    let tokens: Token[] = [];

    const lines = data.split(EOL);
    const numLines = lines.length;
    for (let i = 0; i < numLines; i++) {
      const lineTokens = this.tokenizeLine(lines[i]);
      if (this.shouldAddNewline(numLines, lineTokens)) {
        lineTokens.push({ type: 'newline' });
      }

      tokens = tokens.concat(lineTokens);
    }

    return tokens;
  }

  private tokenizeLine(line: string): Token[] {
    // Discard leading and trailing whitespaces.
    line = line.trim();

    // Ignore empty lines.
    if (line.length === 0) {
      return [];
    }

    // Run through all matchers to tokenize the line.
    // When a matcher returns a result, the line is considered as processed,
    // and no other matchers will be called on this input line.
    for (let i = this._matchers.length - 1; i >= 0; i--) {
      const matcherTokens = this._matchers[i].fn(line);
      if (matcherTokens) {
        return matcherTokens;
      }
    }

    // No matcher has yielded a result.
    return [];
  }

  private shouldAddNewline(lineCount: number, tokens: Token[]): boolean {
    // Adding another line break makes no sense, when you only have
    // a single line to begin with...
    if (lineCount <= 1) {
      return false;
    }

    // When the last token in the list already is of type newline,
    // another newline token is not necessary.
    if (tokens.length > 0) {
      const lastToken = tokens[tokens.length - 1];
      return lastToken.type !== 'newline';
    }

    return false;
  }
}

export default Tokenizer;
