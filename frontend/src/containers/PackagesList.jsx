import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import ClipLoader from 'react-spinners/ClipLoader';
import Button from 'react-bootstrap/Button';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useEffect, useState } from 'react';

function PackagesList(props) {
  const { packageListChanged, setPackageListChanged } = props;

  const [packagesList, setPackagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (packageListChanged) {
      fetch('/api')
        .then(data => data.json())
        .then(list => {
          console.log(list);
          setPackagesList(list);
          setLoading(false);
        })
        .catch(e => console.warn(e.message));
    }

    return () => {
      // second;
      setPackageListChanged(false);
    };
  }, [packageListChanged]);

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
          <Container className="row align-content-center">
            <Button
              onClick={e => {
                deletePackage(currentPackage.name, currentPackage.version);
              }}
            >
              Delete
            </Button>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    );

    function deletePackage(name, version) {
      console.log(name, version);
      const body = JSON.stringify({ name, version });
      console.log(body);
      fetch('/api', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
        .then(response => {
          console.log(response);
          setPackageListChanged(true);
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }
}
export default PackagesList;
