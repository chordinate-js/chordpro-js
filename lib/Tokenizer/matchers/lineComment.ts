import { CommentToken } from '../Tokenizer';

export const LINE_COMMENT_REGEX = /^#\s*(.*)/;

export default (line: string): CommentToken[]|void => {
  const matches = line.match(LINE_COMMENT_REGEX);
  if (matches) {
    const comment = matches[1].trim();

    return [
      { type: 'comment', value: comment },
    ];
  }
};
