import Analyzer from 'Parser/Core/Analyzer';
import SPELLS from 'common/SPELLS';
import TalentStatisticBox, { STATISTIC_ORDER } from 'Interface/Others/TalentStatisticBox';
import STATISTIC_CATEGORY from 'Interface/Others/STATISTIC_CATEGORY';
import SpellIcon from 'common/SpellIcon';
import React from 'react';

// Example Log: /report/PNYB4zgrnR86h7Lc/6-Normal+Zek'voz,+Herald+of+N'zoth/Khadaj
class Censure extends Analyzer {
  chastiseCasts = 0;
  censureStuns = 0;
  censureIncomp = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.CENSURE_TALENT.id);
  }

  on_byPlayer_cast(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.HOLY_WORD_CHASTISE.id) {
      this.chastiseCasts++;
    }
  }

  on_byPlayer_applydebuff(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.HOLY_WORD_CHASTISE_CENSURE_INCAPACITATE.id) {
      this.censureIncomp++;
    }
    if (spellId === SPELLS.HOLY_WORD_CHASTISE_CENSURE_STUN.id) {
      this.censureStuns++;
    }
  }

  statistic() {
    return (

      <TalentStatisticBox
        category={STATISTIC_CATEGORY.TALENTS}
        icon={<SpellIcon id={SPELLS.CENSURE_TALENT.id} />}
        value={
          `${this.censureStuns + this.censureIncomp} Censure CC(s)`
        }
        label="Censure"
        tooltip={`
          ${this.chastiseCasts} Chastise Casts<br />
          ${this.censureStuns} Chastise Stuns<br />
        `}
        position={STATISTIC_ORDER.CORE(4)}
      />

    );
  }
}

export default Censure;
