import React, { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { compose } from "redux";

import { IContact } from "../api/contacts";
import { withAuthRedirect } from "../hoc/withAuthRouter";
import { IRootState } from "../flux";
import {
  getContact,
  updateContact,
  deleteContact,
} from "../flux/reducers/contacts";

import { ShowContact } from "components";

type IParams = { _id: string };

type IProps = IMapStateToProps &
  IMapDispatchToProps &
  RouteComponentProps<IParams>;

class ShowContactContainer extends React.PureComponent<IProps> {
  getContactData = () => {
    let _id: string = this.props.match.params._id;
    if (!_id && !this.props.loggedIn) this.props.history.push("/");
    this.props.getContact(_id);
  };

  redirect = () => this.props.history.push("/contacts");

  componentDidMount() {
    this.getContactData();
  }

  componentDidUpdate(prevProps: IProps, prevState: IProps) {
    if (this.props.match.params._id !== prevProps.match.params._id)
      this.getContactData();
  }

  render() {
    return (
      <ShowContact
        {...this.props.contact}
        redirect={this.redirect}
        updateContact={this.props.updateContact}
        deleteContact={this.props.deleteContact}
      />
    );
  }
}

type IMapStateToProps = {
  loggedIn: boolean;
  contact: IContact;
};
type IMapDispatchToProps = {
  getContact: (_id: string) => void;
  updateContact: (
    _id: string,
    name: string,
    surname: string,
    phone: string
  ) => void;
  deleteContact: (_id: string) => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loggedIn: state.auth.loggedIn,
  contact: state.contacts.contact,
});

export default compose<ComponentType>(
  connect(mapStateToProps, {
    getContact,
    updateContact,
    deleteContact,
  }),
  withAuthRedirect
)(ShowContactContainer);
