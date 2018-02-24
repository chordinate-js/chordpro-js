import { RuleSet } from './RuleSet';

// @link http://www.chordpro.org/chordpro/index.html
const createV4_6RuleSet = (): RuleSet => {
  const ruleSet: RuleSet = new RuleSet();
  ruleSet['version'] = 'v4.6';

  // Preample directives.
  ruleSet.add({ type: 'directive', name: 'new_song', alias: ['ns'] });

  // Metadata directives
  ruleSet.add({ type: 'metadata', name: 'title', alias: ['t'] });
  ruleSet.add({ type: 'metadata', name: 'subtitle', alias: ['st'] });

  // Formatting directives
  ruleSet.add({ type: 'directive', name: 'comment', alias: ['c'] });
  ruleSet.add({ type: 'directive', name: 'comment_italic', alias: ['ci'] });
  ruleSet.add({ type: 'directive', name: 'comment_box', alias: ['cb'] });

  ruleSet.add({ type: 'directive', name: 'start_of_chorus', alias: ['soc'] });
  ruleSet.add({ type: 'directive', name: 'end_of_chorus', alias: ['eoc'] });

  ruleSet.add({ type: 'directive', name: 'start_of_tab', alias: ['sot'] });
  ruleSet.add({ type: 'directive', name: 'end_of_tab', alias: ['eot'] });

  ruleSet.add({ type: 'directive', name: 'define' });

  // Output related directives
  ruleSet.add({ type: 'directive', name: 'textfont', alias: ['tf'] });
  ruleSet.add({ type: 'directive', name: 'fontsize', alias: ['ts'] });

  ruleSet.add({ type: 'directive', name: 'chordfont', alias: ['cf'] });
  ruleSet.add({ type: 'directive', name: 'chordsize', alias: ['cs'] });
  ruleSet.add({ type: 'directive', name: 'chordcolour' });

  ruleSet.add({ type: 'directive', name: 'grid', alias: ['g'] });
  ruleSet.add({ type: 'directive', name: 'no_grid', alias: ['ng'] });

  ruleSet.add({ type: 'directive', name: 'new_page', alias: ['np'] });
  ruleSet.add({ type: 'directive', name: 'new_physical_page', alias: ['npp'] });
  ruleSet.add({ type: 'directive', name: 'columns', alias: ['col'] });
  ruleSet.add({ type: 'directive', name: 'column_break', alias: ['colb'] });

  return ruleSet;
};

export const v4_6 = createV4_6RuleSet();
