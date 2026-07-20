export type PricingRule = "weekday" | "weekend" | "holiday";

/**
 * Dates with holiday pricing. No holiday calendar endpoint exists yet —
 * add ISO ("YYYY-MM-DD") dates here (or swap this for a fetched list)
 * once one is available.
 */
export const HOLIDAY_DATES: string[] = [];

/**
 * Parse a "YYYY-MM-DD" string as a local calendar date rather than UTC
 * midnight, so day-of-week checks don't shift a day in negative-UTC zones.
 */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);

  return new Date(year, (month || 1) - 1, day || 1);
}

/**
 * Determine the pricing rule that applies to a given booking date.
 */
export function getPricingRuleForDate(dateStr: string): PricingRule {
  if (!dateStr) return "weekday";

  if (HOLIDAY_DATES.includes(dateStr)) return "holiday";

  const day = parseLocalDate(dateStr).getDay();
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

function isWithinActiveWindow(
  dateStr: string,
  activeFrom?: string | null,
  activeUntil?: string | null
) {
  if (!activeFrom && !activeUntil) return true;

  const date = parseLocalDate(dateStr).getTime();

  if (activeFrom && date < parseLocalDate(activeFrom.slice(0, 10)).getTime()) {
    return false;
  }

  if (activeUntil && date > parseLocalDate(activeUntil.slice(0, 10)).getTime()) {
    return false;
  }

  return true;
}

/**
 * Pick the single price that applies to a booking date: it must be
 * active on that date, and its pricing_rule must match the date's
 * weekday/weekend/holiday category. Returns null when nothing matches
 * so the caller can exclude the item entirely instead of guessing.
 */
export function selectPriceForDate<
  T extends {
    pricing_rule?: string | null;
    active_from?: string | null;
    active_until?: string | null;
  }
>(
  prices: T[],
  dateStr: string
): (T & { price_category: PricingRule }) | null {

  if (!prices?.length || !dateStr) return null;

  const category = getPricingRuleForDate(dateStr);

  const activeToday = prices.filter((p) =>
    isWithinActiveWindow(dateStr, p.active_from, p.active_until)
  );

  const exactMatch = activeToday.find((p) =>
    normalizeRule(p.pricing_rule || "").includes(category)
  );

  if (exactMatch) {
    return { ...exactMatch, price_category: category };
  }

  // weekday is the implicit default when a price has no explicit
  // weekend/holiday rule attached to it
  if (category === "weekday") {
    const implicitWeekday = activeToday.find((p) => {
      const rule = normalizeRule(p.pricing_rule || "");
      return !rule.includes("weekend") && !rule.includes("holiday");
    });

    if (implicitWeekday) {
      return { ...implicitWeekday, price_category: category };
    }
  }

  return null;
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
