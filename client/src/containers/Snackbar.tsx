import React, { FC } from "react";
import { connect } from "react-redux";
import { Snackbar } from "../components";
import { IRootState } from "../flux";
import action from "../flux/actions/snackbar";
import { ISnackbar } from "../flux/reducers/snackbar";

const SnackbarContainer: FC<ISnackbar & IMapDispatchToProps> = ({
  isSnackbar,
  snackbarType,
  text,
  closeSnackbar,
}) => (
  <Snackbar
    isSnackbar={isSnackbar}
    type={snackbarType}
    text={text}
    closeSnackbar={closeSnackbar}
  />
);

type IMapDispatchToProps = {
  closeSnackbar: () => void;
};
const mapStateToProps = (state: IRootState): ISnackbar => ({
  isSnackbar: state.snackbar.isSnackbar,
  snackbarType: state.snackbar.snackbarType,
  text: state.snackbar.text,
});
export default connect(mapStateToProps, {
  closeSnackbar: action.closeSnackbar,
})(SnackbarContainer);
