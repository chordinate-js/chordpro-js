import { Token } from '../Tokenizer';

import directive from './matchers/directive';
import lineComment from './matchers/lineComment';
import lyrics from './matchers/lyrics';

export interface TokenMatcherInterface {
  (line: string): Token[]|void;
}

export {
  directive,
  lineComment,
  lyrics,
};
