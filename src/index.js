import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';



const client = new ApolloClient({
  uri: 'https://typerex.herokuapp.com/',
});


const App = () => (
  <ApolloProvider client={client}>
     <Main/>
   </ApolloProvider>
);



ReactDOM.render(
    	<App/>, 
  document.getElementById("root")
);