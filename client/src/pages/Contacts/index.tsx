import React, { FC, useEffect } from "react";
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
}));

type IProps = {
  contacts: Array<IContact>;
  createContact: (name: string, surname: string, tel: string) => void;
  updateContact: (
    id: string,
    name: string,
    surname: string,
    tel: string
  ) => void;
  deleteContact: (id: string) => void;
};

const Contacts: FC<IProps> = ({
  contacts,
  createContact,
  updateContact,
  deleteContact,
}) => {
  const classes = useStyles();

  const onSubmit = (data: { name: string; surname: string; tel: string }) => {
    createContact(data.name, data.surname, data.tel);
  };

  return (
    <Card className={classes.contacts}>
      <CardContent>
        <div className={classes.cardHeader}>
          <Typography className={classes.title}>Contacts</Typography>
        </div>
        <AddContact onSubmit={onSubmit} />
        <div className={classes.contactsWrapper}>
          {contacts.map(({ _id, name, surname, tel }) => (
            <Contact
              id={_id}
              name={name}
              surname={surname}
              tel={tel}
              key={_id}
              deleteContact={deleteContact}
            ></Contact>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(Contacts);
