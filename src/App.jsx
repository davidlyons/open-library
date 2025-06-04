import { useState, useEffect } from 'react';
import { InputGroup, InputGroupText, Input, Button } from 'reactstrap';
import { List } from './List';
import useQueryString from './queryString/useQueryString';

function App() {
  // const [user, setUser] = useState('davidlyons4415');
  // https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f
  const [user, setUser] = useQueryString('u', 'davidlyons4415');

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

    document.title = `Open Library Reading Lists - ${user}`;
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestData(list, set) {
    const response = await fetch(`https://openlibrary.org/people/${user}/books/${list}.json`);
    const json = await response.json();
    set(json.reading_log_entries || []);
  }

  return (
    <>
      <div className="py-4 border-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 col-lg-6 col-xl-5">
              {/* <Label for="input-user">Open Library User ID</Label> */}
              {/* <Input id="input-user" value={user} onChange={changeUser} className="mb-2" /> */}
              {/* <a href={`https://openlibrary.org/people/${user}`}>View Profile</a> */}
              <InputGroup size="sm">
                <InputGroupText>Open Library ID</InputGroupText>
                <Input id="input-user" value={user} onChange={changeUser} />
                <Button
                  color="primary"
                  outline
                  href={`https://openlibrary.org/people/${user}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Profile
                </Button>
              </InputGroup>
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
