import React from "react"
import '../index.css';
import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import auth from './auth';
import cogoToast from 'cogo-toast';





function LogoutMenu() {



	function onClick() {

		localStorage.removeItem('typerex_username')
		localStorage.removeItem('wpm')
		localStorage.removeItem('isLoggedin')
		window.location.href = '/Typerex/';

	}

	function deleteAccount() {
		const username = localStorage.getItem('typerex_username')
		localStorage.removeItem('typerex_username')
		localStorage.removeItem('wpm')
		localStorage.removeItem('isLoggedin')
		setTimeout(function(){window.location.href = '/Typerex/'},1000)
		auth.userDelete(username)
		      .then(() => {
		      	cogoToast.warn(
	              <div>
	                <div><b>Account with {username} is deleted ☠️</b></div>
	              </div>,{ hideAfter:3},
	            );		        
		      })
		      .catch(e => {
		        console.log(e)
		    })
	}

	return (
		<Menu id='menu_id' >
        <Item onClick={onClick}>🚶Logout</Item>
        <Item onClick={deleteAccount}>⚠️ Delete Account</Item>
      </Menu>

	)
}




const Header = (props) => (
		<nav>
			<div className="nav">
				<div className='user-item'></div>
				<div className="nav-item">
					<a
						href="/Typerex/"
						style={{ textDecoration: "none", color: "white" }}
					>

						Typerex 
					</a>
				</div>
				<div className='user-item-main'>
					<div className='user-item-sub'>
					<MenuProvider id="menu_id" event="onClick">
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
