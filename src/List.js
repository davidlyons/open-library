export const key = 'olid';
export const size = 'M';

export const List = ({ heading, list }) => (
  <div className="py-4">
    <div className="container">
      <h2 className="h3 mb-4">{heading}</h2>

      {list.map((item, index) => {
        const value = item.work.cover_edition_key;
        if (!value) return false;
        const cover = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;
        return (
          <img
            src={cover}
            alt={item.work.title}
            title={item.work.title}
            key={index}
            className="cover"
          />
        );
      })}
    </div>
  </div>
);
