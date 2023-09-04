const { wrapAsyncRoute, getPaginationRanges } = require('../lib/helpers');
const { cardsService } = require('../services');

const list = wrapAsyncRoute(async (req, res) => {
  const { filter, range = '[]', sort = '[]' } = req.query;

  const [from, to] = getPaginationRanges(range);

  const {
    q,
    id,
    isActive,
    createdAt,
  } = JSON.parse(filter);

  const [sortField = 'id', direction = 'ASC'] = JSON.parse(sort);

  const filters = {};

  if (isActive) filters.isActive = isActive;
  if (createdAt) filters.createdAt = createdAt;

  const [result, total] = await Promise.all([
    cardsService.list({
      limit: to - from,
      offset: from,
      filters,
      sort: {
        sortField,
        direction,
      },
      filter: {
        id,
      },
      q,
    }),
    cardsService.count({ q, filters }),
  ]);

  if (!result.length) {
    res.set('Content-Range', 0);
    return res.status(200).json([]);
  }

  res.set('Content-Range', +total);

  return res.status(200).json(result);
});

const get = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const result = await cardsService.get({ id });

  return res.status(200).json({ id: result.id, root: result });
});

const update = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  const creditCardTypeFormatted = Array.isArray(creditCardType)
    ? creditCardType
    : creditCardType.split(',').map((r) => r.trim());

  await cardsService.update({
    id,
    toUpdate: {
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
      creditCardType: creditCardTypeFormatted,
      isActive,
      ppcDescription,
      slug,
      pros,
      cons,
      reviewSectionText,
      badgeText,
      link,
      ctaButtonText,
    },
  });

  return res.status(200).json({
    id,
  });
});

const del = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const result = await cardsService.del({ id });

  return res.status(200).json(result);
});

const create = wrapAsyncRoute(async (req, res) => {
  const {
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
  } = req.body;

  const creditCardTypeFormatted = creditCardType.split(',').map((r) => r.trim());

  const admin = await cardsService.create({
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
    creditCardType: creditCardTypeFormatted,
    isActive,
    ppcDescription,
    reviewSectionText,
    slug,
    pros,
    cons,
    badgeText,
    link,
    ctaButtonText,
  });

  return res.status(201).json(admin);
});

module.exports = {
  list,
  get,
  update,
  del,
  create,
};
