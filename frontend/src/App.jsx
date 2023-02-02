import { useState } from 'react';
// import './App.css';
// React Bootstrap
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

// Import Containers
import PackageList from './containers/PackagesList.jsx';
import AddPackageContainer from './containers/AddPackageContainer.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container className="align-content-center">
      <Container className="row">
        <h1 className="display-1 text-center my-4">
          Package Changelog Tracker
        </h1>
        <Container className="mb-5 row align-content-center">
          <AddPackageContainer className="mb-5" />
        </Container>
        <PackageList />
      </Container>
    </Container>
  );
}

export default App;
