import React from "react"
import '../index.css';





class Header extends React.Component {

	constructor(){

		super()

		this.handleClick = this.handleClick.bind(this);
	}



	handleClick() {
		localStorage.removeItem('typerex_username')
		localStorage.removeItem('wpm')
		localStorage.removeItem('isLoggedin')
		window.location.href = '/Typerex/';


	}


	render() {
		return(
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
				<div className='user-item-main' onClick={this.handleClick}>
					<div className='user-item-sub'>
						<p style={{marginBottom:'0'}}><b id='username'></b></p>
						<p id='user-wpm' style={{margin:'0'}}></p>
					</div>
				 </div>
			</div>
		</nav>)
	}
}

export default Header
