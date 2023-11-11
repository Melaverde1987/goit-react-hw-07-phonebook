import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FormContainer } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { nanoid } from 'nanoid';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.number().min(2, 'Too Short!').required('Required'),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactName = useSelector(state => state.contacts.contacts);

  const onAdd = (newContact, contactName) => {
    const normalizedName = newContact.name.toLowerCase();
    let duplicatedName = contactName.some(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (duplicatedName) {
      alert(`${newContact.name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ ...newContact, id: nanoid() }));
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          onAdd(values, contactName);
          actions.resetForm();
        }}
      >
        <Form>
          <div className="container">
            <label htmlFor="name">Name</label>
            <Field id="name" name="name" placeholder="Jane" />
            <ErrorMessage name="name" />
          </div>
          <div className="container">
            <label htmlFor="number">Number</label>
            <Field
              type="tel"
              id="number"
              name="number"
              placeholder="459-12-56XXX"
            />
            <ErrorMessage name="number" />
          </div>

          <button type="submit" className="btn btn-primary">
            Add contact
          </button>
        </Form>
      </Formik>
    </FormContainer>
  );
};
