import React from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  display: flex; 
`;

const ArticleImage = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px; 
`;

interface Article {
  id: string;
  title: string;
  image_url: string;
}

interface ResultsListProps {
  articles: Article[];
}

const ResultsList: React.FC<ResultsListProps> = ({ articles }) => {
  return (
    <List>
      {articles.map((article) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <ListItem>
            <ArticleImage src={article.image_url} alt={article.title} />
            <div>
              <h3>{article.title}</h3>
            </div>
          </ListItem>
        </motion.div>
      ))}
    </List>
  );
};

export default ResultsList;
