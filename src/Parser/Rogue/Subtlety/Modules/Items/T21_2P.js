import React from 'react';

import SPELLS from 'common/SPELLS';
import SpellUsable from 'Parser/Core/Modules/SpellUsable';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import Analyzer from 'Parser/Core/Analyzer';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import { formatPercentage } from 'common/format';
import DamageTracker from 'Parser/Core/Modules/AbilityTracker';

class T21_2P extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
    damageTracker: DamageTracker,
  };

  resetMs = 0;
  wastedMs = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasBuff(SPELLS.SUB_ROGUE_T21_2SET_BONUS.id);
  }

  on_byPlayer_spendresource(event) {
    const spent = event.resourceChange;
    if (event.resourceChangeType !== RESOURCE_TYPES.COMBO_POINTS.id) return;
    const resetAmount = 200 * spent;
    if (this.spellUsable.isOnCooldown(SPELLS.SYMBOLS_OF_DEATH.id)) {
      this.spellUsable.reduceCooldown(SPELLS.SYMBOLS_OF_DEATH.id, resetAmount);
      this.resetMs += resetAmount;
    } else {
      this.wastedMs += resetAmount;
    }
  }

  suggestions(when) {
    const badRefreshShare = this.wastedMs / (this.wastedMs + this.resetMs);

    when(badRefreshShare).isGreaterThan(0.05)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment> Try not to use finishers when <SpellLink id={SPELLS.SYMBOLS_OF_DEATH.id} /> is off cooldown, when using <SpellLink id={SPELLS.SUB_ROGUE_T21_2SET_BONUS.id} />. </React.Fragment>)
          .icon(SPELLS.SUB_ROGUE_T21_2SET_BONUS.icon)
          .actual(`You wasted ${formatPercentage(actual)}% of cooldown reduction`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(0.1).major(0.2);
      });
  }

  item() {
    const symbolsCasts = this.damageTracker.getAbility(SPELLS.SYMBOLS_OF_DEATH.id).casts;
    const reductionPerCast = (this.resetMs / 1000) / symbolsCasts;

    return {
      id: SPELLS.SUB_ROGUE_T21_2SET_BONUS.id,
      icon: <SpellIcon id={SPELLS.SUB_ROGUE_T21_2SET_BONUS.id} />,
      title: <SpellLink id={SPELLS.SUB_ROGUE_T21_2SET_BONUS.id} icon={false} />,
      result: <React.Fragment>Cooldown of <SpellLink id={SPELLS.SYMBOLS_OF_DEATH.id} /> reduced by {reductionPerCast.toFixed(1)} seconds on average.</React.Fragment>,
    };
  }
}

export default T21_2P;
