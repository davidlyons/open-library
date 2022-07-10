const key = 'olid';
const size = 'M';

export const List = ({ heading, list }) => {
  console.log(list);
  return (
    <div className="py-4">
      <div className="container-fluid">
        <h2 className="h4 mb-4">{heading}</h2>

        <div className="d-flex align-items-end flex-wrap">
          {list.map((item, index) => {
            const value = item.work.cover_edition_key;
            if (!value) return false;
            const cover = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;
            return (
              <a
                href={`http://openlibrary.org${item.logged_edition}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cover"
              >
                <img
                  src={cover}
                  alt={item.work.title}
                  title={item.work.title}
                  key={index}
                  className="img-fluid"
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
