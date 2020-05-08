import React from "react"
import '../index.css';
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';


const onClick = ({ props }) => {

	localStorage.removeItem('typerex_username')
	localStorage.removeItem('wpm')
	localStorage.removeItem('isLoggedin')
	window.location.href = '/Typerex/';
};


const LogoutMenu = () => (
    <Menu id='menu_id' >
       <Item onClick={onClick}>Logout</Item>
   </Menu>
);



const Header = (props) => (
		<nav>
			<div className="nav">
				<div className='user-item'></div>
				<div className="nav-item">
					<a
						href="/Typerex/"
						style={{ textDecoration: "none", color: "white" }}
					>

						typerex
					</a>
				</div>
				<div className='user-item-main'>
					<div className='user-item-sub'>
					<MenuProvider id="menu_id">
						<>
						<p style={{marginBottom:'0'}}><b id='username'></b></p>
						<p id='user-wpm' style={{margin:'0'}}></p>
						<LogoutMenu />
						</>
					</MenuProvider>
					</div>
				 </div>
			</div>
		</nav>



	)

// class Header extends React.Component {

// 	// constructor(){

// 	// 	super()

// 	// 	this.handleClick = this.handleClick.bind(this);
// 	// }



// 	// handleClick() {



// 	// }


// 	render() {
// 		return(
// 		)
// 	}
// }

export default Header
