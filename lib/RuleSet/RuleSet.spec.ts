import { RuleSet, Rule } from './RuleSet';

describe('Rule set', function () {
  it('accepts metadata rules', function () {
    const ruleSet: RuleSet = new RuleSet();

    const metadataRule: Rule = { type: 'metadata', name: 'tempo', alias: ['tp'] };
    ruleSet.add(metadataRule);

    expect(ruleSet.rules).toContain(metadataRule);
  });

  it('accepts directive rules', function () {
    const ruleSet: RuleSet = new RuleSet();

    const directiveRule: Rule = { type: 'directive', name: 'title', alias: ['t'] };
    ruleSet.add(directiveRule);

    expect(ruleSet.rules).toContain(directiveRule);
  });

  it('throws an error when a rule with the same name has already been defined', function () {
    const ruleSet: RuleSet = new RuleSet([
      { type: 'directive', name: 'this_exists', alias: ['te'] },
    ]);

    const duplicateRule: Rule = { type: 'metadata', name: 'this_exists' };
    expect(() => ruleSet.add(duplicateRule)).toThrow();
  });
});
