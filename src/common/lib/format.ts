export function formatNPR(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-NP")}`;
}
