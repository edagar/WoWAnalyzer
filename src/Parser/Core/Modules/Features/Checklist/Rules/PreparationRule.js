import Rule from '../Rule';
import Requirement from '../Requirement';
import { EnchantsRequirement } from '../Requirements';

/**
 * @deprecated Use Checklist2 instead.
 */
class PreparationRule extends Rule {
  constructor(options = {}, extraRequirements = []) {
    super({
      name: 'Be well prepared',
      description: 'Being well prepared with potions and enchants is an easy way to improve your performance.',
      // For this rule it wouldn't make sense for the bar to be completely green when just 1 of the requirements failed, showing the average instead of median takes care of that properly.
      performanceMethod: 'average',
      requirements: function () {
        return [
          new Requirement({
            name: 'Used a pre-potion',
            check: () => this.prePotion.prePotionSuggestionThresholds,
          }),
          new Requirement({
            name: 'Used a second potion',
            check: () => this.prePotion.secondPotionSuggestionThresholds,
          }),
          new EnchantsRequirement(),
          ...extraRequirements,
        ];
      },
      ...options,
    });
  }
}

export default PreparationRule;
