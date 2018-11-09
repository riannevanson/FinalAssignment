import { totalmem } from "os";

const numberTicketsAuthor = tickets.userId.length;

const numberTicketsAuthorRisk = numberTicketsAuthor => {
  if (numberTicketsAuthor > 1) {
    return 10;
  } else {
    return 0;
  }
};

const AveragePriceTicket =
  ticket.price.reducereduce((total, score) => total + score) / scores.length;

const ticketPrice = ticket.price;

const averagePriceRisk = (AveragePriceTicket, ticketPrice) => {
  if (AveragePriceTicket > ticketPrice) {
    return ticketPrice - AveragePriceTicket;
  } else {
    return ticketPrice - AveragePriceTicket;
  }
};
const time = ticket.timestamp + 2;

const timeAddedRisk = time => {
  if (time > 0900 && time > 1700) {
    return -10;
  } else {
    return 10;
  }
};

const numberOfComments = tickets.comments.length;

const commentRisk = numberOfComments => {
  if (numberOfComments > 3) {
    return 5;
  } else {
    return 0;
  }
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
  if (countedRisk > 95) {
    return 95;
  } else if (countedRisk < 5) {
    return 5;
  } else {
    return countedRisk;
  }
};
