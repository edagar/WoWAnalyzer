import Analyzer from 'Parser/Core/Analyzer';
import SPELLS from 'common/SPELLS';
import TalentStatisticBox, { STATISTIC_ORDER } from 'Interface/Others/TalentStatisticBox';
import STATISTIC_CATEGORY from 'Interface/Others/STATISTIC_CATEGORY';
import SpellIcon from 'common/SpellIcon';
import React from 'react';
import ItemHealingDone from 'Interface/Others/ItemHealingDone';
import { formatPercentage, formatThousands } from 'common/format';

// Example Log: /report/PNYB4zgrnR86h7Lc/6-Normal+Zek'voz,+Herald+of+N'zoth/Khadaj
class BindingHeal extends Analyzer {
  bindingHealCasts = 0;
  bindingHealSelfHealing = 0;
  bindingHealSelfOverhealing = 0;
  bindingHealPartyHealing = 0;
  bindingHealPartyOverhealing = 0;

  bindingHealTargets = {};

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.BINDING_HEAL_TALENT.id);
  }

  get bindingHealHealing() {
    return this.bindingHealSelfHealing + this.bindingHealPartyHealing;
  }

  get bindingHealOverHealing() {
    return this.bindingHealSelfHealing + this.bindingHealPartyHealing;
  }

  getOverhealPercent(healingDone, overhealingDone) {
    const percent = overhealingDone / (healingDone + overhealingDone);
    return percent;
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.BINDING_HEAL_TALENT.id) {
      this.bindingHealCasts++;
    }
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    //this.bindingHealTargets[ev] = event.ability;
    if (spellId === SPELLS.BINDING_HEAL_TALENT.id) {
      if (event.targetID === this.owner.selectedCombatant._combatantInfo.sourceID) {
        // Self Heal
        if (event.overheal) {
          this.bindingHealSelfOverhealing += event.overheal;
        }
        this.bindingHealSelfHealing += event.amount;
      } else {
        // Party Heal
        if (event.overheal) {
          this.bindingHealPartyOverhealing += event.overheal;
        }
        this.bindingHealPartyHealing += event.amount;
      }
    }
  }

  statistic() {
    return (

      <TalentStatisticBox
        category={STATISTIC_CATEGORY.TALENTS}
        icon={<SpellIcon id={SPELLS.BINDING_HEAL_TALENT.id} />}
        value={(
          <ItemHealingDone amount={this.bindingHealHealing} />
        )}
        label="Binding Heal"
        tooltip={`
          Casts:&#9;${this.bindingHealCasts}<br />
          Self Healing:&#9;${formatThousands(this.bindingHealSelfHealing)} (${formatPercentage(this.getOverhealPercent(this.bindingHealSelfHealing, this.bindingHealSelfOverhealing))}% OH)<br />
          Party Healing:&#9;${formatThousands(this.bindingHealPartyHealing)} (${formatPercentage(this.getOverhealPercent(this.bindingHealPartyHealing, this.bindingHealPartyOverhealing))}% OH)
        `}
        position={STATISTIC_ORDER.CORE(5)}
      />

    );
  }
}

export default BindingHeal;
