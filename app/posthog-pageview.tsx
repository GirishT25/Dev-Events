'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview', {
        pathname,
        search: searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
