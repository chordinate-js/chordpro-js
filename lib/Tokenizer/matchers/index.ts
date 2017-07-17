import { Token } from '../Tokenizer';

import directive from './directive';
import lineComment from './lineComment';
import lyrics from './lyrics';

export interface MatcherInterface {
  (line: string): Token[]|void;
}

export {
  directive,
  lineComment,
  lyrics,
};

export default MatcherInterface;
