import { Package } from "../types/types";


export const calculatePackageTotal = (
  pkg: Package,
  quantity: number,
  guests: number
) => {

  const price = Number(
    pkg.prices?.[0]?.price ?? 0
  );


  switch (pkg.pricing_mode) {

    case "fixed":
      return price * quantity;


    case "per_person":
      return price * guests * quantity;


    default:
      return price * quantity;

  }

};