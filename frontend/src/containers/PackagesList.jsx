import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import ClipLoader from 'react-spinners/ClipLoader';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useEffect, useState } from 'react';

function PackagesList(props) {
  const [packagesList, setPackagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api')
      .then(data => data.json())
      .then(({ list }) => {
        console.log(list);
        setPackagesList(list);
        setLoading(false);
      })
      .catch(e => console.warn(e.message));

    return () => {
      // second;
    };
  }, []);

  if (loading) {
    return (
      <Container className="column align-content-center text-center">
        <ClipLoader size={60}></ClipLoader>
      </Container>
    );
  }

  const packagesListAccordionItems = packagesList.map(
    buildAccordionItemFromPackage
  );

  return (
    <Accordion defaultActiveKey="">{packagesListAccordionItems}</Accordion>
  );
}

function buildAccordionItemFromPackage(currentPackage, index) {
  return (
    <Accordion.Item key={index} eventKey={index}>
      <Accordion.Header>{`${currentPackage.name} @ ${currentPackage.version}`}</Accordion.Header>
      <Accordion.Body>
        {currentPackage.changes.changelog.map(current => (
          <>
            <h2>{current.version}</h2>
            <ReactMarkdown>{current.body}</ReactMarkdown>
          </>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default PackagesList;
