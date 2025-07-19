// Simple utility for className merging (shadcn/ui style)
export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
