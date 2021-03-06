import React, { ComponentType, FC, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { IContact } from "../api/contacts";
import { withAuthRedirect } from "../hoc/withAuthRouter";
import { IRootState } from "../flux";
import {
  getContacts,
  createContact,
  deleteContact,
} from "../flux/reducers/contacts";

import { Contacts } from "pages";

const ContactsContainer: FC<IMapStateToProps & IMapDispatchToProps> = ({
  contacts,
  getContacts,
  createContact,
  deleteContact,
}) => {
  useEffect(() => {
    const getContactsData = () => getContacts();
    getContactsData();
  }, []);

  return (
    <Contacts
      contacts={contacts}
      createContact={createContact}
      deleteContact={deleteContact}
    />
  );
};

type IMapStateToProps = {
  contacts: Array<IContact>;
};
type IMapDispatchToProps = {
  getContacts: () => void;
  createContact: (name: string, surname: string, phone: string) => void;
  deleteContact: (_id: string) => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  contacts: state.contacts.contacts,
});

export default compose<ComponentType>(
  connect(mapStateToProps, {
    getContacts,
    createContact,
    deleteContact,
  }),
  withAuthRedirect
)(ContactsContainer);
