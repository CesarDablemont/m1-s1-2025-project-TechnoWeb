import { useEffect } from 'react';
import { useAuthorProvider } from '../providers/useAuthorsProvider';
import { AuthorListItem } from './AuthorListItem';
import { CreateAuthorModal } from './CreateAuthorModal';
import type { AuthorModel } from '../AuthorModel';

export function AuthorList() {
  const { authors = [], loadAuthors, deleteAuthor, updateAuthor, createAuthor } =
    useAuthorProvider();

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  const handleCreateFromModal = (author: AuthorModel) => {
    createAuthor(author);
  };

  return (
    <>
      <CreateAuthorModal
        serverUrl="http://localhost:3000"
        onCreate={handleCreateFromModal}
      />

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {authors.length > 0 ? (
          authors.map(author => (
            <AuthorListItem
              key={author.id}
              author={author}
              onDelete={deleteAuthor}
              onUpdate={updateAuthor}
            />
          ))
        ) : (
          <li>Aucun auteur trouvé</li>
        )}
      </ul>
    </>
  );
}
