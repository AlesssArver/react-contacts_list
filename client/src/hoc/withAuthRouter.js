import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToPropsForRedirect = state => ({
  loggedIn: state.auth.loggedIn
})

export const withAuthRedirect = Component => {
  const RedirectComponent = props => {
    if (!props.loggedIn) return <Redirect to="/login" />
    return <Component {...props} />
  }
  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}