import { gql } from 'apollo-boost';
import ApolloClient from 'apollo-boost';




const client = new ApolloClient({
  uri: 'https://typerex.herokuapp.com/',
});





class Auth {

	constructor(){

		this.authenticated = false;
	}



	async userUpdate(username,wpm) {
		const result = await client 
			.mutate({
				mutation:gql`
				mutation {
				  userUpdate(username:"${username}" wpm:"${wpm}"){
				  	username
				    wpm
					}
				}
				`
			})
			.then(function(result){
				return result;
			})
			.catch(e => console.log(e))

			if(result) {
				this.authenticated = true;
				localStorage.setItem('isLoggedin',true)
			}
			return result;

	}

	async login(username) {
		const result = await client
		  .mutate({
		  	mutation:gql`
		  	mutation {
				  userAdd(username:"${username}"){
				    username
				    wpm
					}
				}
		  	`
		  })
		  .then(function(result){
		  	return result;
		  })
		  .catch(e => console.log(e))
		  if (result) {
			this.authenticated = true;
			localStorage.setItem('isLoggedin',true)
		  }
   		  return result;
	}

	async userInfo(username) {
		const result = await client
		  .query({
		    query: gql`
		     {
			  userInfo(username:"${username}"){
			    username
			    wpm
			  }
			 }
		    `
		  })
		  .then(function(result) {
		  	return result
		  });

		if (result) {
			this.authenticated = true;
			localStorage.setItem('isLoggedin',true)
		}
		return result;
	}

	async Text() {
		const result = await client
		  .query({
			query:gql`
			{
				Text
			}`
		})
		.then(function (result){
			console.log(result)
			return result;
		})
		.catch ( e => {
			return e;
		} )
		
	  return result;
	}


	logout(cb) {
		this.authenticated = false;
		cb()
	}

	async userDelete(username) {
		const result = await client
		  .mutate({
		  	mutation:gql`
		  	mutation {
				  userDelete(username:"${username}"){
				    username

					}
				}
		  	`
		  })
		  .then(function(result){
		  	return result;
		  })
		  .catch(e => console.log(e))
   		  return result;
	}
	



	isAuthenticated() {

		return (localStorage.getItem('isLoggedin') ? localStorage.getItem('isLoggedin') : this.authenticated);
	}


}


// const USERINFO = gql`
// {
//   userInfo(username:"amalsan"){
//     username
//     wpm
//   }
// }`


// // const USERUPDATE;


// // const USERDELETE; 


// // const USERADD;


// // const USERLIST;


export default new Auth();