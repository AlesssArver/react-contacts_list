import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { IRootState } from "../flux";
import { register, login } from "../flux/reducers/auth";

import { Auth } from "pages";

const AuthContainer: FC<IMapStateToProps & IMapDispatchToProps> = (props) => {
  const register = (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => props.register(name, surname, email, password);

  const login = (email: string, password: string) =>
    props.login(email, password);

  return props.loggedIn ? (
    <Redirect to="/contacts" />
  ) : (
    <Auth register={register} login={login} />
  );
};

type IMapStateToProps = {
  loggedIn: boolean;
};
type IMapDispatchToProps = {
  register: (
    name: string,
    surname: string,
    email: string,
    password: string
  ) => void;
  login: (email: string, password: string) => void;
};
const mapStateToProps = (state: IRootState): IMapStateToProps => ({
  loggedIn: state.auth.loggedIn,
});
export default connect(mapStateToProps, { register, login })(AuthContainer);
