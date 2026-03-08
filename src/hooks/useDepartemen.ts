import { useState, useEffect } from 'react';
import { fetcher } from '@/lib/fetcher';
import { Departemen } from '@/types/departemen.types';

export const useDepartemen = () => {
  const [data, setData] = useState<Departemen[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetcher<Departemen[]>('/api/departemen');
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, refetch: fetchData };
};
