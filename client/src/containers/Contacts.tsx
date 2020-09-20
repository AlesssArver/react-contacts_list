import React, { ComponentType, FC, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { IContact } from "../api/contacts";
import { withAuthRedirect } from "../hoc/withAuthRouter";
import { IRootState } from "../flux";
import action from "../flux/actions/contacts";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} from "../flux/reducers/contacts";

import { Contacts } from "pages";

const ContactsContainer: FC<IMapStateToProps & IMapDispatchToProps> = ({
  contacts,
  getContacts,
  createContact,
  updateContact,
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
      updateContact={updateContact}
      deleteContact={deleteContact}
    />
  );
};

type IMapStateToProps = {
  contacts: Array<IContact>;
};
type IMapDispatchToProps = {
  getContacts: () => void;
  createContact: (name: string, surname: string, tel: string) => void;
  updateContact: (
    id: string,
    name: string,
    surname: string,
    tel: string
  ) => void;
  deleteContact: (id: string) => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  contacts: state.contacts.contacts,
});

export default compose<ComponentType>(
  connect(mapStateToProps, {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
  }),
  withAuthRedirect
)(ContactsContainer);
