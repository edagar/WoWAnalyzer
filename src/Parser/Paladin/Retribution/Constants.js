import SPELLS from 'common/SPELLS';

// Based on spelldata for Avenging Wrath, Retribution(buff) and Inquisition
// Avenging Wrath and Retribution also increase melee damage by 20% - this is added in their modules. 
export const ABILITIES_AFFECTED_BY_DAMAGE_INCREASES = [
  SPELLS.CRUSADER_STRIKE.id,
  SPELLS.JUDGMENT_CAST.id,
  SPELLS.TEMPLARS_VERDICT_DAMAGE.id,
  SPELLS.BLADE_OF_JUSTICE.id,
  SPELLS.DIVINE_STORM_DAMAGE.id,
  SPELLS.EXECUTION_SENTENCE_TALENT.id,
  SPELLS.CONSECRATION_TALENT.id,
  SPELLS.ZEAL_DAMAGE.id,
  SPELLS.HAMMER_OF_WRATH_TALENT.id,
  SPELLS.WAKE_OF_ASHES_TALENT.id,
  SPELLS.JUSTICARS_VENGEANCE_TALENT.id,
  SPELLS.EYE_FOR_AN_EYE_TALENT.id,
];

// Stuff like Retribution mastery and Execution sentence increases damage done by these sources of holy damage
export const ABILITIES_AFFECTED_BY_HOLY_DAMAGE_INCREASES = [
  SPELLS.JUDGMENT_CAST.id,
  SPELLS.TEMPLARS_VERDICT_DAMAGE.id,
  SPELLS.EXECUTION_SENTENCE_TALENT.id,
  SPELLS.CONSECRATION_TALENT.id,
  SPELLS.ZEAL_DAMAGE.id,
  SPELLS.HAMMER_OF_WRATH_TALENT.id,
  SPELLS.WAKE_OF_ASHES_TALENT.id,
  SPELLS.JUSTICARS_VENGEANCE_TALENT.id,
];
