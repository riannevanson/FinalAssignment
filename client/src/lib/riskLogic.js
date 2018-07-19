export const numberTicketsAuthorRisk = numberTicketsAuthor => {
  if (numberTicketsAuthor < 2) {
    return 10;
  } else {
    return 0;
  }
};

// export const averagePriceTicket =
//   prices.reduce((total, score) => total + score) / scores.length;

// export const ticketPrice = ticket.price;

export const averagePriceRisk = (averagePriceTicket, ticketPrice) => {
  if (averagePriceTicket > ticketPrice)
    return 100 - (ticketPrice / averagePriceTicket) * 100;

  const expensivePrice = ticketPrice - averagePriceTicket; // todo: fixme
  return expensivePrice > 10 ? 10 : expensivePrice;
};

//export const timestampHour = ticket.timestamp + 2uur;

export const timeAddedRisk = timestampHour => {
  return timestampHour > 9 && timestampHour < 17 ? -10 : 10;
};

//export const numberOfComments = tickets.comments.length;

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
