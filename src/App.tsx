import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import SearchInput from './components/SearchInput';
import ResultsList from './components/ResultsList';
import useFetchArticles from './hooks/useFetchArticles';
import { motion } from "framer-motion";

const Container = styled.div`
  padding: 60px 20px 20px 20px; 
  max-width: 600px;
  margin: 0 auto;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #3498db; 
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const { articles, loadMore, isLoadingMore, error } = useFetchArticles(query);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 &&
      !isLoadingMore
    ) {
      loadMore();
    }
  }, [isLoadingMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (error) return <div>Error loading articles.</div>;
  return (
    <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}>
    <Container>
      <SearchInput onSearch={setQuery} />
      <ResultsList articles={articles} />
      {isLoadingMore && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Container>
    </motion.div>
  );
};

export default App;
