var dbutils = require("./utils/dbutils");
const Sentencer = require('sentencer')
const randy = require('randy')
const Readable = require('stream').Readable
const stemplates = require('./resources/stemplates.json');
const phrases = require('./resources/phrases.json');

const { GraphQLServer } = require('graphql-yoga')

// 1


const typeDefs = `

type Mutation {
	userAdd(username:String!): UserType!
	userUpdate(username:String! wpm:String!): UserType!
	userDelete(username:String!): UserType!

}

type UserType {
	_id:String!
	username:String!
	wpm:String
    info:String
}

type Query {
  info: String!
  Users: [UserType]!
  userInfo(username:String!):UserType
  Text:String!
}

`

// 2
const resolvers = {

  Query: {

      info: () => `This is Typerex GraphQLServer`,
      Users: async () => (
        await dbutils.db('listUsers')
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on list of users'))
      ),
      userInfo: async(parent,args) => (
      	await dbutils.db('infoUser',args.username)
  		.then(data => {
  			return data;
  		})
  		.catch(e => console.log('404 on user info'))),

      Text: async() => {
      	const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)
      	const numberOfSentences = randy.randInt(8,12)
        console.log(numberOfSentences);
      	let text = {}
        var i=0
      	for(i=0;i<numberOfSentences;i++) {
      		text += generateSentenceForStream(i,numberOfSentences)

      	}
      	text = text.replace('[object Object]','');
      	return(text);


	    function generateSentenceForStream(isLastSentence,numberOfSentences) {
		  var phrase = Math.random() < 0.25 ? `${randy.choice(phrases)} ` : ""
		  const generated = Sentencer.make(randy.choice(stemplates))
		  var sentence = capitalize(phrase + generated) + "."
      sentence += (isLastSentence < numberOfSentences-1)? " " : ""
		  return sentence
		}

      }

  },

  Mutation: {

  	  userAdd: async (parent, args) => (
        await dbutils.db('addUser',args.username)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on adding new user'))
      ),

      userUpdate: async (parent,args) => (
        await dbutils.db('updateUser',args.username,args.wpm)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on updating user'))
      ),

      userDelete: async(parent,args) => (
      await dbutils.db('deleteUser',args.username)
        .then(data => {
          return data;
        })
        .catch(e => console.log('404 on deleting user'))
      )

      

  

 



  }

}


const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))