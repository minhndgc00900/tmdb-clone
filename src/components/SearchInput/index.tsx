import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/hooks/store';
import { searchMovies } from 'slices/movies';
import styles from './styles.module.scss';

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const suggestionsRef = useRef<HTMLUListElement>(null);
  const [suggestions, setSuggestions] = useState<
    {
      title: string;
      id: string;
    }[]
  >([]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const { searchResult = [] } = useAppSelector((state) => state.movies);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); //

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  useEffect(() => {
    if (searchResult) {
      setIsHovering(true);
      setSuggestions(
        searchResult.map((it) => ({
          title: it.title,
          id: it.id,
        }))
      );
    }
  }, [searchResult]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery) {
        dispatch(
          searchMovies({
            offset: 1,
            query: debouncedQuery,
          })
        );
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    // setIsHovering(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setIsHovering(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.search__container}>
      <input
        className={styles.search__input}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <ul
        className={styles.list__suggestions}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={suggestionsRef}
        style={{ display: isHovering ? 'block' : 'none' }} // Toggle display based on showSuggestions state
      >
        {suggestions.slice(0, 9).map((item, index) => (
          <li
            className={styles.list__item}
            key={index}
            onClick={() => {
              setIsHovering(false);
              window.location.pathname = `/movies/${item.id}`;
              // navigate(`/movies/${item.id}`, {
              //   replace: false,
              // });
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInput;
