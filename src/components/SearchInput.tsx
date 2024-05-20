// components/SearchInput.tsx
import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 600px;
  margin: 0 auto;
  background: white; 
  padding: 20px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  z-index: 1000;
`;

const Input = styled.input`
  padding: auto;
  margin:  auto;
  width: 100%;
`;

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="Search articles..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </InputContainer>
  );
};

export default SearchInput;
