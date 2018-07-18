const numberTicketsAuthor = tickets.userId.length;

const numberTicketsAuthorRisk = numberTicketsAuthor => {
  if (numberTicketsAuthor < 2) {
    return 10;
  } else {
    return 0;
  }
};

const averagePriceTicket =
  prices.reduce((total, score) => total + score) / scores.length;

const ticketPrice = ticket.price;

const averagePriceRisk = (averagePriceTicket, ticketPrice) => {
  if (averagePriceTicket > ticketPrice)
    return 100 - (ticketPrice / averagePriceTicket) * 100;

  const expensivePrice = ticketPrice - averagePriceTicket; // todo: fixme
  return expensivePrice > 10 ? 10 : expensivePrice;
};

//const timestampHour = ticket.timestamp + 2uur;

const timeAddedRisk = timestampHour => {
  return timestampHour > 9 && timestampHour < 17 ? -10 : 10;
};

const numberOfComments = tickets.comments.length;

const commentRisk = numberOfComments => {
  return numberOfComments > 3 ? 5 : 0;
};

const countedRisk = (
  numberTicketsAuthorRisk,
  averagePriceRisk,
  timeAddedRisk,
  commentRisk
) => {
  return (
    numberTicketsAuthorRisk + averagePriceRisk + timeAddedRisk + commentRisk
  );
};

const finalRisk = countedRisk => {
  if (countedRisk > 95) return 95;
  if (countedRisk < 5) return 5;

  return countedRisk;
};
