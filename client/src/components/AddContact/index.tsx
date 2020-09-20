import React, { FC } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import { IContact } from "../../api/contacts";

const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },
  title: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  field: {
    margin: 10,
    height: 35,
  },
}));

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  tel: Yup.string().required("Tel is required"),
});

type IProps = {
  onSubmit: (data: { name: string; surname: string; tel: string }) => void;
};

const AddContactForm: FC<IProps> = ({ onSubmit }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{ name: "", surname: "", tel: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.field}>
            <TextField
              className={classes.input}
              size="small"
              variant="outlined"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.input}
              size="small"
              variant="outlined"
              name="surname"
              placeholder="Surname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.input}
              size="small"
              variant="outlined"
              name="tel"
              placeholder="Tel"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tel}
            />
          </div>
          <div className={classes.field}>
            <Button className={classes.button} type="submit">
              Add Contact
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default React.memo(AddContactForm);
