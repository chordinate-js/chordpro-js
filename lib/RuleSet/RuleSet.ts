import {
  includes as _contains,
  find as _find,
  some as _some,
} from 'lodash';

export interface Rule {
  type: 'directive' | 'metadata',
  name: string,
  alias?: string[],
};

class RuleSet {
  private _rules: Rule[];

  constructor(rules: Rule[] = []) {
    this._rules = [];

    rules.forEach(rule => this.add(rule));
  }

  public add(rule: Rule) {
    let existingRule = this.getRuleMatching(rule.name);
    if (existingRule) {
      throw new Error('A conflicting rule already exists.');
    }

    this._rules.push(rule);
  }

  get rules(): Rule[] {
    return this._rules.slice();
  }

  getRuleMatching(nameOrAlias: string): Rule | void {
    return _find(this._rules, rule => {
      return rule.name === nameOrAlias
          || _contains(rule.alias, nameOrAlias);
    });
  }
}

export default RuleSet;
