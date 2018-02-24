import { Tokenizer, Token } from './Tokenizer/Tokenizer';
import * as matchers from './Tokenizer/matchers';

export { Token, Tokenizer, matchers as tokenMatchers };

export const createTokenizer = (): Tokenizer => {
  const tokenizer = new Tokenizer();

  tokenizer.addMatcher(matchers.lineComment, 5);
  tokenizer.addMatcher(matchers.directive, 10);
  tokenizer.addMatcher(matchers.lyrics, 0);

  return tokenizer;
};
