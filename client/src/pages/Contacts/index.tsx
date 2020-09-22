import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";

import { IContact } from "../../api/contacts";
import { AddContact, Contact } from "components";

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 250,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
  },
  cardHeader: {
    marginBottom: 15,
    display: "flex",
    justifyContent: "space-between",
  },
  contacts: {
    boxShadow: "0 2px 5px 1px rgba(17, 17, 17, 0.10) !important",
  },
  contactsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 20,
  },
  noContacts: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

type IProps = {
  contacts: Array<IContact>;
  createContact: (name: string, surname: string, phone: string) => void;
  deleteContact: (id: string) => void;
};

const Contacts: FC<IProps> = ({ contacts, createContact, deleteContact }) => {
  const classes = useStyles();

  const getContacts = contacts.map(({ _id, name, surname, phone }) => (
    <Contact
      _id={_id}
      name={name}
      surname={surname}
      phone={phone}
      key={_id}
      deleteContact={deleteContact}
    ></Contact>
  ));

  const onSubmit = (data: { name: string; surname: string; phone: string }) => {
    createContact(data.name, data.surname, data.phone);
  };
  return (
    <Card className={classes.contacts}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography className={classes.title}>Contacts</Typography>
        </div>
        <AddContact onSubmit={onSubmit} />
        {contacts.length ? (
          <div className={classes.contactsWrapper}>{getContacts}</div>
        ) : (
          <Typography className={classes.noContacts}>No contacts</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(Contacts);
