import React from 'react';

import SpellIcon from 'common/SpellIcon';
import SPELLS from 'common/SPELLS';
import Analyzer from 'Parser/Core/Analyzer';
import StatisticBox, { STATISTIC_ORDER } from 'Interface/Others/StatisticBox';

import BeaconTargets from './BeaconTargets';
import { BEACON_TRANSFERING_ABILITIES } from '../../Constants';
import BeaconTransferFactor from './BeaconTransferFactor';

class MissingBeacons extends Analyzer {
  static dependencies = {
    beaconTargets: BeaconTargets,
    beaconTransferFactor: BeaconTransferFactor,
  };

  lostBeaconHealing = 0;

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;
    const spellBeaconTransferFactor = BEACON_TRANSFERING_ABILITIES[spellId];
    if (!spellBeaconTransferFactor) {
      return;
    }

    const numMissingBeacons = this.beaconTargets.numMaxBeacons - this.beaconTargets.numBeaconsActive;
    if (numMissingBeacons > 0) {
      this.lostBeaconHealing += this.beaconTransferFactor.getExpectedTransfer(event) * numMissingBeacons;
    }
  }

  statistic() {
    if (this.lostBeaconHealing === 0) {
      // Normally we don't want optional statistics, but this is an exception as this giving any results is very rare.
      return null;
    }
    return (
      <StatisticBox
        position={STATISTIC_ORDER.UNIMPORTANT(0)}
        icon={<SpellIcon id={SPELLS.BEACON_OF_LIGHT_CAST_AND_BUFF.id} />}
        value={<span style={{ fontSize: '75%' }}>Up to {this.owner.formatItemHealingDone(this.lostBeaconHealing)}</span>}
        label="Beacon healing lost (missing beacon)"
        tooltip={'The amount of <b>raw</b> healing that didn\'t transfer to one or more beacon targets due to a missing beacon. When a beacon drops, re-apply it quickly.'}
      />
    );
  }
}

export default MissingBeacons;
