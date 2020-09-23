import React, { FC, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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

type IShowContactModal = {
  _id: string;
  name: string;
  surname: string;
  phone: string;
  redirect: () => void;
  updateContact: (
    _id: string,
    name: string,
    surname: string,
    phone: string
  ) => void;
  deleteContact: (_id: string) => void;
};
type IFormValues = {
  name: string;
  surname: string;
  phone: string;
};

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  phone: Yup.string().required("Phone is required"),
});

const ShowContactModal: FC<IShowContactModal> = ({
  _id,
  name,
  surname,
  phone,
  redirect,
  updateContact,
  deleteContact,
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleOpen = () => {};

  const handleClose = () => {
    setOpen(false);
    redirect();
  };

  const onDelete = () => {
    deleteContact(_id);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={true}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Formik
            initialValues={{ name, surname, phone }}
            validationSchema={ContactSchema}
            onSubmit={(values: IFormValues, { resetForm }: any) => {
              updateContact(_id, name, surname, phone);
              resetForm();
              handleClose();
            }}
          >
            {(props: any) => {
              const onHandleChangeName = (e: any) =>
                props.setFieldValue("name", e.target.value, false);
              const onHandleChangeSurame = (e: any) =>
                props.setFieldValue("surname", e.target.value, false);
              const onHandleChangePhone = (e: any) =>
                props.setFieldValue("phone", e.target.value, false);

              return (
                <form onSubmit={props.handleSubmit}>
                  <div className={classes.field}>
                    <TextField
                      className={classes.input}
                      size="small"
                      variant="outlined"
                      name="name"
                      placeholder="Name"
                      onChange={onHandleChangeName}
                      value={props.values.name}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <div className={classes.field}>
                    <TextField
                      className={classes.input}
                      size="small"
                      variant="outlined"
                      name="surname"
                      placeholder="surname"
                      onChange={onHandleChangeSurame}
                      value={props.values.surname}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <div className={classes.field}>
                    <TextField
                      className={classes.input}
                      size="small"
                      variant="outlined"
                      name="phone"
                      placeholder="Phone"
                      onChange={onHandleChangePhone}
                      value={props.values.phone}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  <div className={classes.field}>
                    <Button className={classes.button} type="submit">
                      Save
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
          <Button onClick={onDelete} className={classes.button}>
            Delete
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};
export default React.memo(ShowContactModal);
