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
  userId,
  contacts,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
}) => {
  useEffect(() => {
    const getContactsData = () => getContacts(userId);
    getContactsData();
  }, []);

  return (
    <Contacts
      userId={userId}
      contacts={contacts}
      createContact={createContact}
      updateContact={updateContact}
      deleteContact={deleteContact}
    />
  );
};

type IMapStateToProps = {
  contacts: Array<IContact>;
  userId: string;
};
type IMapDispatchToProps = {
  getContacts: (userId: string) => void;
  createContact: (
    userId: string,
    name: string,
    surname: string,
    tel: string
  ) => void;
  updateContact: (
    id: string,
    name: string,
    surname: string,
    tel: string
  ) => void;
  deleteContact: (id: string) => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  userId: state.auth.user.id,
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
