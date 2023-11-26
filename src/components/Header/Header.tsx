/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

import NavBar from "./NavBar";

function Header(props) {
  return <NavBar openModal={props.openModal} />;
}

export default Header;
