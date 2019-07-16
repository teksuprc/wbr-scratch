
const graphQL = require('graphql');
const fs = require('fs-extra');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLID } = graphQL;
const { Author, Book, Frame } = require('../models/models');

const Data = fs.readJsonSync('./src/test.json');
const frameData = Data.frames;
const bookData = Data.books;
const authorData = Data.authors;

//========================================================================
// DATA TYPES
//========================================================================
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {type: AuthorType, resolve: (parent, args) => authorData.find(a => a.id === parent.authorId) }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: { type: GraphQLList(BookType), resolve(parent, args) { return bookData.filter(b => b.authorId === parent.id); } }
    })
});

const FrameType = new GraphQLObjectType({
    name: "Frame",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        rating: {type: GraphQLString}
    })
});

//========================================================================
// QUERIES
//========================================================================
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // { frame(id:"1"){ id name rating } }
        frame: {
            type: FrameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { return frameData.find(f => f.id === args.id); }
        },
        // { frames }
        frames: {
            type: GraphQLList(FrameType),
            resolve() { return frameData; }
        },
        // { book(id:"1"){ id name genre } }
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            // we have access to args.id, bc it was defined in the line above
            // get data from db/other source
            resolve(parent, args) { return bookData.find(b => b.id === args.id); }
        },
        // { books{ id name genre } }
        books: {
            type: GraphQLList(BookType),
            resolve() { return bookData; }
        },
        // { genre(genre:"Fantasy") { id name genre } }
        genre: {
            type: GraphQLList(BookType),
            args: { genre: { type: GraphQLString } },
            resolve(parent, args) { return bookData.filter(b => b.genre === args.genre); }
        },
        // { genres { genre } }
        genres: {
            type: GraphQLList(GraphQLString),
            resolve() { return [...new Set(bookData.map(b => b.genre))]; }
        },
        // { author(id:"1"){ id name age } }
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) { return authorData.find(a => a.id === args.id); }
        },
        // { authors{ id name age } }
        authors: {
            type: GraphQLList(AuthorType),
            resolve() { return authorData; }
        },
        // { hello }
        hello: {
            type: GraphQLString,
            resolve() {
                return 'Hello World!'
            }
        }
    }
});

//========================================================================
// MUTATIONS
//========================================================================
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { 
                name: { type: GraphQLString},
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                //let author = new Author(args.name, args.age);
                // db.newAuthor(author);
                // or author.save();  // if this is a db model
                let author = {
                    id: authorData.length,
                    name: args.name, 
                    age: args.age
                };
                authorData.push(author);
                return author;
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                //let book = new Book(args.name, args.age);
                // db.newBook(author);
                // or book.save();  // if this is a db model
                let book = {
                    id: bookData.length,
                    name: args.name, 
                    genre: args.genre,
                    authorId: args.authorId
                };
                bookData.push(book);
                return book;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

