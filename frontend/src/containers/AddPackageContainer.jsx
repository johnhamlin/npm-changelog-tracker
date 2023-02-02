import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Container from 'react-bootstrap/Container';

const blankForm = {
  name: '',
  version: '',
};

function AddPackageContainer(props) {
  const { setPackageListChanged } = props;
  const [form, setForm] = useState(blankForm);

  const setField = (field, value) => {
    setForm(currentForm => {
      return {
        ...currentForm,
        [field]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submitting!');
    const { name, version } = form;
    if (name === '' || version === '') {
      console.log('please enter a package and version!');
      return;
    }
    const body = JSON.stringify({ name, version });

    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
      .then(response => {
        console.log(response);
        setForm(blankForm);
        setPackageListChanged(true);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="container row  my-4 py-3 border-3 border-top border-bottom"
    >
      <Form.Group className="col-5" controlId="formBasicPackage">
        <Form.Label hidden>Package</Form.Label>
        <Form.Control
          type="text"
          placeholder="Package"
          onChange={e => setField('name', e.target.value)}
          value={form.name}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="col-5" controlId="formBasicVersion">
        <Form.Label hidden>Version</Form.Label>
        <Form.Control
          type="text"
          placeholder="Version"
          onChange={e => setField('version', e.target.value)}
          value={form.version}
        />
      </Form.Group>

      <Button className="col-2" variant="primary" type="submit">
        Add
      </Button>
    </Form>
  );
}

export default AddPackageContainer;
