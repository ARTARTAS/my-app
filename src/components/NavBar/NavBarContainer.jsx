import { connect } from "react-redux";
import NavBar from "./NavBar";

let mapStateToProps = (state) => ({
  id: state.auth.id
})

const NavBarContainer = connect(mapStateToProps)(NavBar)

export default NavBarContainer;
