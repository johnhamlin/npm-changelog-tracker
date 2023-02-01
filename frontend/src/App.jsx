import { useState } from 'react';
// import './App.css';
// React Bootstrap
import Container from 'react-bootstrap/Container';
// import Button from 'react-bootstrap/Button';

// Import Containers
import PackageList from './containers/PackagesList.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container className="align-content-center">
      <Container className="row">
        <h1 className="display-1 text-center my-4">
          Package Changelog Tracker
        </h1>

        <PackageList></PackageList>
      </Container>
    </Container>
  );
}

export default App;
