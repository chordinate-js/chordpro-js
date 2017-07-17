import Tokenizer, { Token } from './Tokenizer';
import * as matchers from './matchers';

export { Token, Tokenizer };

const createTokenizer = (): Tokenizer => {
  const tokenizer = new Tokenizer();

  tokenizer.addMatcher(matchers.lineComment, 5);
  tokenizer.addMatcher(matchers.directive, 10);
  tokenizer.addMatcher(matchers.lyrics, 0);

  return tokenizer;
};

export default createTokenizer;
