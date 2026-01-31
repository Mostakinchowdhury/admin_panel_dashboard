export function timeDifference({
  from,
  to,
}: {
  from?: string;
  to: string;
}): string {
  if (!to) {
    return 'Not sale ever';
  }
  const d1 = from ? new Date(from) : new Date();
  const d2 = new Date(to);

  const diffMs: number = Math.abs(d1.getTime() - d2.getTime());

  const minuteMs: number = 1000 * 60;
  const hourMs: number = 1000 * 60 * 60;
  const dayMs: number = 1000 * 60 * 60 * 24;

  if (diffMs >= dayMs) {
    const days: number = Math.floor(diffMs / dayMs);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffMs >= hourMs) {
    const hours: number = Math.floor(diffMs / hourMs);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const minutes: number = Math.floor(diffMs / minuteMs);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
}
