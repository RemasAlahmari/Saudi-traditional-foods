import { useState, useEffect } from 'react';

/**
 * Generic data-fetching hook.
 * @param {Function} fetcher - async function that returns data
 * @param {Array}    deps    - dependency array (re-runs when changed)
 */
export function useFetch(fetcher, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetcher()
      .then(d  => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message || 'Something went wrong'); setLoading(false); } });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
