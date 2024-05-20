import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Article {
  id: string;
  title: string;
  image_url: string;
}

const useFetchArticles = (query: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.results.length) return null;
    return `https://api.spaceflightnewsapi.net/v4/articles?search=${query}&limit=10&offset=${pageIndex * 10}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    if (data) {
      const allArticles = data.reduce((acc: Article[], val: any) => acc.concat(val.results), []);
      setArticles(allArticles);
    }
  }, [data]);

  return {
    articles,
    loadMore: () => setSize(size + 1),
    isLoadingMore: !!data && typeof data[size - 1] === 'undefined' && !error,
    error,
  };
};

export default useFetchArticles;
