import type { BookingItem } from "../index";

export function calculateItemTotal(item: BookingItem): number {

  const servicePrice =
    item.service?.prices?.[0];

  const packagePrice =
    item.package?.prices?.[0];


  const priceInfo =
    servicePrice ??
    packagePrice;


  const price = Number(
    priceInfo?.price ?? 0
  );


  const priceMode =
    servicePrice?.price_mode ??
    item.package?.pricing_mode ??
    "fixed";


  switch (priceMode) {

    case "per_person":

      return (
        price *
        (item.participants ?? 0) *
        (item.quantity ?? 1)
      );


    case "per_adult_child":

      return (
        price *
        (
          (item.adults ?? 0) +
          (item.children ?? 0)
        ) *
        (item.quantity ?? 1)
      );


    case "fixed":

    default:

      return (
        price *
        (item.quantity ?? 1)
      );
  }
}