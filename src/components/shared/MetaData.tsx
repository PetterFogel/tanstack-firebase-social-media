interface Props {
  title: string | undefined;
  description?: string;
  keywords?: string;
  authors?: string;
}

const MetaData = ({ title, description, authors, keywords }: Props) => {
  return (
    <>
      <title>{`${title} | StoryClub`}</title>
      <meta name="title" content={title} />
      <meta name="author" content={authors || "Petter Fogel"} />
      <meta
        name="description"
        content={
          description ||
          "StoryClub is a social media platform for book enthusiasts to connect, share, and discover new reads. Create your bookshelf, follow other users, and explore what your friends are reading. Join our community today!"
        }
      />
      <meta
        name="keywords"
        content={
          keywords ||
          "books, reading, book club, book recommendations, bookshelf, reader community"
        }
      />
    </>
  );
};

export default MetaData;
