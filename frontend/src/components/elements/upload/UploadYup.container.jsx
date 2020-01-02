import { connect } from "react-redux";
import { DigitToastActions } from "@cthit/react-digit-components";
import UploadYup from "./UploadYup";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  toastOpen: props => dispatch(DigitToastActions.digitToastOpen(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadYup);
