const createError = require('http-errors');
const knex = require('../dbs/pg/knex');
const { CARDS_TABLE } = require('../constants/tables');

const create = async ({
  serviceCardId, accountId, rank,
  creditCardIssuerId, displayName, cardUse,
  cardProcessorTypeName, defaultCreditCardTypeName,
  creditCardId, activeCreditCardTypes, cardRatingsId,
  cardName, editorRating, regApr, regAprType, penaltyApr,
  introAprDuration, introAprRate, balanceTransferIntroApr,
  balanceTransferRate, balanceTransferIntroDuration,
  balanceTransferDurationMonths, balanceTransferFees,
  balanceTransferMin, balanceTransferGracePeriod, creditScoreNeeded,
  creditRatingGroup, hasAnnualFee, annualFees, annualFeeDisclaimer,
  bonusMiles, bonusMilesFull, rewardsDescriptionLong, specialOffer,
  termsAndConditionsLink, cashAdvanceApr, cashAdvanceFee, cashAdvanceGracePeriod,
  latePaymentFee, foreignTransactionFee, rewardsProgramName, rewardsProgramLogoImage,
  logoImageUrl, rawLogoImageUrl, source, creditCardType,
  isActive, ppcDescription, reviewSectionText,
  slug, pros, cons, badgeText, link, ctaButtonText,
}) => {
  const result = await knex(CARDS_TABLE).insert({
    serviceCardId,
    accountId,
    rank,
    creditCardIssuerId,
    displayName,
    cardUse,
    cardProcessorTypeName,
    defaultCreditCardTypeName,
    creditCardId,
    activeCreditCardTypes,
    cardRatingsId,
    cardName,
    editorRating,
    regApr,
    regAprType,
    penaltyApr,
    introAprDuration,
    introAprRate,
    balanceTransferIntroApr,
    balanceTransferRate,
    balanceTransferIntroDuration,
    balanceTransferDurationMonths,
    balanceTransferFees,
    balanceTransferMin,
    balanceTransferGracePeriod,
    creditScoreNeeded,
    creditRatingGroup,
    hasAnnualFee,
    annualFees,
    annualFeeDisclaimer,
    bonusMiles,
    bonusMilesFull,
    rewardsDescriptionLong,
    specialOffer,
    termsAndConditionsLink,
    cashAdvanceApr,
    cashAdvanceFee,
    cashAdvanceGracePeriod,
    latePaymentFee,
    foreignTransactionFee,
    rewardsProgramName,
    rewardsProgramLogoImage,
    logoImageUrl,
    rawLogoImageUrl,
    source,
    creditCardType,
    ppcDescription,
    isActive,
    reviewSectionText,
    slug,
    pros,
    cons,
    badgeText,
    link,
    ctaButtonText,
  }).returning(['id']);

  return result[0];
};

const get = async ({ id }) => {
  const user = await knex(CARDS_TABLE)
    .select()
    .where({
      id,
    })
    .limit(1)
    .first();

  return user;
};

const update = async ({ id, toUpdate }) => {
  const result = await knex(CARDS_TABLE)
    .update(toUpdate)
    .where({
      id,
    })
    .returning(['id']);

  if (!result.length) {
    throw createError(404);
  }

  return result;
};

const list = async ({
  limit = 10, offset = 0, sort, filters = {}, q,
}) => {
  const { sortField, direction } = sort;

  const query = knex(CARDS_TABLE)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy(sortField, direction);

  if (q) {
    query.where(knex.raw(`
      display_name ilike '%${q}%' OR
      card_name ilike '%${q}%' OR
      credit_score_needed ilike '%${q}%'
    `));
  }

  if (filters.isActive) query.where({ isActive: filters.isActive });
  if (filters.createdAt) query.where('createdAt', '>=', filters.createdAt);

  const results = await query;

  return results;
};

const count = async ({ q, filters }) => {
  const query = knex(CARDS_TABLE)
    .count('id');

  if (q) {
    query.where(knex.raw(`
        display_name ilike '%${q}%' OR
        card_name ilike '%${q}%' OR
        credit_score_needed ilike '%${q}%'
      `));
  }

  if (filters.isActive) query.where({ isActive: filters.isActive });

  const results = await query;

  return results[0].count;
};

const del = async ({ id }) => {
  const result = await knex(CARDS_TABLE)
    .where({ id })
    .del()
    .returning('id');

  if (!result.length) {
    throw createError(404);
  }

  return result;
};

module.exports = {
  create,
  update,
  count,
  list,
  get,
  del,
};
