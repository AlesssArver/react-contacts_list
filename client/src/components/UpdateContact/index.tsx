import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, TextField, Button } from "@material-ui/core";

import api from "../../api/contacts";

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(25, 25, 25, 0.76)",
  },
  card: {
    width: 250,
    boxShadow: "0 2px 5px 1px rgba(17, 17, 17, 0.10) !important",
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
    marginTop: 15,
    width: "100%",
  },
  field: {
    margin: 10,
  },
}));

const UpdateContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  tel: Yup.string().required("Tel is required"),
});

type IProps = {
  name: string;
  surname: string;
  tel: string;
};
type IFormValues = {
  name: string;
  surname: string;
  tel: string;
};

const UpdateContact: FC<IProps> = () => {
  const classes = useStyles();

  const initialValues: IFormValues = { name: "", surname: "", tel: "" };

  return (
    <div className={classes.containerWrapper}>
      <div className={classes.container}>
        <Card className={classes.card}>
          <Typography className={classes.title}>Update Contact</Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={UpdateContactSchema}
            onSubmit={(values: IFormValues, actions: any) => {}}
          >
            {(props: any) => (
              <form onSubmit={props.handleSubmit}>
                <div className={classes.field}>
                  <TextField
                    className={classes.input}
                    size="small"
                    variant="outlined"
                    name="name"
                    placeholder="Name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    className={classes.input}
                    size="small"
                    variant="outlined"
                    name="surname"
                    placeholder="Surname"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.surname}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    className={classes.input}
                    size="small"
                    variant="outlined"
                    name="tel"
                    placeholder="Tel"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.tel}
                  />
                </div>
                <div className={classes.field}>
                  <Button className={classes.button} type="submit">
                    Save
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default React.memo(UpdateContact);
