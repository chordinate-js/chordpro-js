import { DirectiveToken } from '../Tokenizer';

export const DIRECTIVE_REGEX = /\{([^:]+)(\s*:\s*([^\}]+))?\}/;

export default (line: string): DirectiveToken[]|void => {
  const matches = line.match(DIRECTIVE_REGEX);
  if (!matches) {
    return;
  }

  const directiveName = matches[1];
  const directiveValue = matches[3];

  const directiveToken: DirectiveToken = {
    type: 'directive',
    name: directiveName,
  };

  if (directiveValue) {
    directiveToken.value = directiveValue;
  }

  return [ directiveToken ];
};
