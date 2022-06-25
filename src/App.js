import { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import { List } from './List';

function App() {
  const [user, setUser] = useState('davidlyons4415');

  const [alreadyRead, setAlreadyRead] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wantToRead, setWantToRead] = useState([]);

  const changeUser = (e) => {
    setUser(e.target.value);
  };

  useEffect(() => {
    requestData('already-read', setAlreadyRead);
    requestData('currently-reading', setCurrentlyReading);
    requestData('want-to-read', setWantToRead);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestData(list, set) {
    const response = await fetch(`https://openlibrary.org/people/${user}/books/${list}.json`);
    const json = await response.json();
    set(json.reading_log_entries || []);
  }

  return (
    <>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Input placeholder="Open Library User ID" value={user} onChange={changeUser} />
            </div>
          </div>
        </div>
      </div>

      <List heading="Currently Reading" list={currentlyReading} />
      <List heading="Already Read" list={alreadyRead} />
      <List heading="Want to Read" list={wantToRead} />
    </>
  );
}

export default App;
