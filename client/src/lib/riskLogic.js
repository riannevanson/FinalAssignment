export const numberTicketsAuthorRisk = numberTicketsAuthor => {
  if (numberTicketsAuthor < 2) {
    return 10;
  } else {
    return 0;
  }
};

export const averagePriceRisk = (averagePriceTicket, currentTicketPrice) => {
  if (averagePriceTicket > currentTicketPrice)
    return 100 - (currentTicketPrice / averagePriceTicket) * 100;

  const expensivePrice = 100 - (averagePriceTicket / currentTicketPrice) * 100;

  return expensivePrice > 10 ? -10 : -expensivePrice;
};

export const timeAddedRisk = timestampHour => {
  return timestampHour > 9 && timestampHour < 17 ? -10 : 10;
};

export const commentRisk = numberOfComments => {
  return numberOfComments > 3 ? 5 : 0;
};

export const countedRisk = (
  numberTicketsAuthorRisk,
  averagePriceRisk,
  timeAddedRisk,
  commentRisk
) => {
  return (
    numberTicketsAuthorRisk + averagePriceRisk + timeAddedRisk + commentRisk
  );
};

export const finalRisk = countedRisk => {
  if (countedRisk > 95) return 95;
  if (countedRisk < 5) return 5;

  return countedRisk;
};
