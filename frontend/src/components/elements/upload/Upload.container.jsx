import { connect } from "react-redux";
import { DigitToastActions } from "@cthit/react-digit-components";
import Upload from "./Upload.jsx";

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = dispatch => ({
  toastOpen: props => dispatch(DigitToastActions.digitToastOpen(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
