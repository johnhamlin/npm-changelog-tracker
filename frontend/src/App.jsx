import { useState } from 'react';
// import './App.css';
// React Bootstrap
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

// Import Containers
import PackageList from './containers/PackagesList.jsx';
import AddPackageContainer from './containers/AddPackageContainer.jsx';

function App() {
  const [packageListChanged, setPackageListChanged] = useState(true);

  return (
    <Container className="align-content-center">
      <Container className="row">
        <h1 className="display-4 text-center my-4">
          John's 🔥🔥🔥 Package Changelog Tracker
        </h1>
        <Container className="mb-2 row align-content-center">
          <AddPackageContainer
            setPackageListChanged={setPackageListChanged}
            className="mb-5"
          />
        </Container>
        <PackageList
          packageListChanged={packageListChanged}
          setPackageListChanged={setPackageListChanged}
        />
      </Container>
    </Container>
  );
}

export default App;
