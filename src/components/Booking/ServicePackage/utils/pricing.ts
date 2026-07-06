export type PricingRule = "weekday" | "weekend" | "holiday";

/**
 * Detect current pricing rule from real date
 */
export function getCurrentPricingRule(): PricingRule {
  const day = new Date().getDay();
  // 0 = Sunday, 6 = Saturday

  if (day === 0 || day === 6) return "weekend";

  return "weekday";
}

/**
 * Normalize backend string
 */
export function normalizeRule(value: string): string {
  return value.toLowerCase().replace(/\s/g, "");
}

/**
 * Get active prices based on rule
 */
export function getActivePrices(prices: any[], rule: PricingRule) {
  const normalizedRule = rule.toLowerCase();

  const matched = prices.filter((p) =>
    normalizeRule(p.pricing_rule || "").includes(normalizedRule)
  );

  return matched.length > 0 ? matched : prices;
}

/**
 * Extract min/max price
 */
export function getPriceRange(prices: any[]) {
  if (!prices.length) {
    return { min: null, max: null };
  }

  const values = prices.map((p) => Number(p.price));

  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}