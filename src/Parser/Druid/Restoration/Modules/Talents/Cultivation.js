import React from 'react';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';
import { formatPercentage } from 'common/format';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';

import SPELLS from 'common/SPELLS';
import Analyzer from 'Parser/Core/Analyzer';
import Mastery from '../Core/Mastery';

class Cultivation extends Analyzer {
  static dependencies = {
    mastery: Mastery,
  };

  constructor(...args) {
    super(...args);
    const hasCultivation = this.selectedCombatant.hasTalent(SPELLS.CULTIVATION_TALENT.id);
    this.active = hasCultivation;
  }

  get directPercent() {
    return this.owner.getPercentageOfTotalHealingDone(this.mastery.getDirectHealing(SPELLS.CULTIVATION.id));
  }

  get masteryPercent() {
    return this.owner.getPercentageOfTotalHealingDone(this.mastery.getMasteryHealing(SPELLS.CULTIVATION.id));
  }

  get totalPercent() {
    return this.directPercent + this.masteryPercent;
  }

  get suggestionThresholds() {
    return {
      actual: this.totalPercent,
      isLessThan: {
        minor: 0.06,
        average: 0.045,
        major: 0.03,
      },
      style: 'percentage',
    };
  }

  statistic() {
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.CULTIVATION.id} />}
        value={`${formatPercentage(this.totalPercent)} %`}
        label="Cultivation Healing"
        tooltip={`This is the sum of the direct healing from Cultivation and the healing enabled by Cultivation's extra mastery stack.
            <ul>
            <li>Direct: <b>${formatPercentage(this.directPercent)}%</b></li>
            <li>Mastery: <b>${formatPercentage(this.masteryPercent)}%</b></li>
            </ul>`}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.OPTIONAL();

  suggestions(when) {
    when(this.suggestionThresholds)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<React.Fragment>Your healing from <SpellLink id={SPELLS.CULTIVATION.id} /> could be improved. You may have too many healers or doing easy
          content, thus having low cultivation proc rate. You may considering selecting another talent.</React.Fragment>)
          .icon(SPELLS.CULTIVATION.icon)
          .actual(`${formatPercentage(this.totalPercent)}% healing`)
          .recommended(`>${Math.round(formatPercentage(recommended))}% is recommended`);
      });
  }
}

export default Cultivation;
