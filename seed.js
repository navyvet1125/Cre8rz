var db             = require('./config/db');
var User		   = require('./models/user');
var Portfolio      = require('./models/portfolio');
var Entry          = require('./models/entry');
var Event          = require('./models/event');
var Comment        = require('./models/comment');
var Message        = require('./models/message');
var Activity        = require('./models/activity');

var truePass='Salamander';
var seedUsers;
var seedPortfolios;
var seedEntries;
var seedEvents;
var testContent= JSON.stringify([
    {
        src:'picture url 1',
        desc:'first pic'
    },
    {
        src:'picture url 2',
        desc:'second pic'
    },
    {
        src:'picture url 3',
        desc:'third pic'
    }
]);
//Clear database and reseed it with new information.
User.remove({})
    .then(function(){
        return Activity.remove();
    })
    .then(function(){
        return Event.remove();
    })
    .then(function(){
        return Portfolio.remove();
    })
    .then(function(){
        return Entry.remove();
    })
    .then(function(){
        return Comment.remove();
    })
    .then(function(){
        return Message.remove();
    })
 	.then(function(){
  		return User.create([
    		{
                name:'Evan Washington', 
                email:'enavy04@gmail.com',
                login:'defMethod82',
                type:'admin', 
                city:'Inglewood, CA',
                career:'website' ,
                password: truePass,
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            },
    		{
                name:'Milyani Rizal', 
                email:'milly_la@yahoo.com',
                login:'milly_la',
                city:'Culver City, CA', 
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            },
    		{
                name:'Indra Aris', 
                email:'indra@Aris.com',
                login:'the_artist', 
                type:'artist', 
                city:'West Hollywood, CA', 
                career:'fasion',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            }
    	]);
    })
    .then(function(users){
        seedUsers = users;
        return Portfolio.create([
            {
                creator: seedUsers[0]._id,
                name: 'Evan\'s Portfolio',
                description:'All of the work I\'ve done so far.',
                purpose:'hybrid',
                type:'website'
            }
        ]);
    })
    .then(function(portfolios){
        seedPortfolios = portfolios;
        return Portfolio.create([
            {
                creator: seedUsers[0]._id,
                name: 'Evan\'s Projects',
                description:'All of the projects I made for class',
                purpose:'assessment',
                parent: seedPortfolios[0],
                parentId: seedPortfolios[0]._id,
                type:'website'
            },
            {
                creator: seedUsers[0]._id,
                name: 'Evan\'s Sites',
                description:'All of the websites I made on my own.',
                purpose:'showcase',
                parent: seedPortfolios[0],
                parentId: seedPortfolios[0]._id,
                type:'website'
            }
        ]);
    })
    .then(function(portfolios){
        seedPortfolios = seedPortfolios.concat(portfolios)
        return Portfolio.create([
            {
                creator: seedUsers[0]._id,
                parent: seedPortfolios[1],
                parentId: seedPortfolios[1]._id,
                name: '2017 Sites',
                description:'The sites I created in 2017.'
            },
            {
                creator: seedUsers[0]._id,
                parent: seedPortfolios[2],
                parentId: seedPortfolios[2]._id,
                name: '2017 Sites',
                description:'The sites I created in 2017.'
            },
        ]);
    })
    .then(function(portfolios){
        seedPortfolios = seedPortfolios.concat(portfolios)
        return Entry.create([
            {
                title: 'evanwashington.com',
                url: 'http://www.evanwashington.com',
                description: 'Evan Washington - Holistic Health Facilitator',
                content:testContent,
                parent: seedPortfolios[3],
                likes:[seedUsers[1]._id,seedUsers[2]._id],
                approved: true
            },
            {
                title: 'Kingyo Sukui',
                url: 'http://navyvet1125.github.io/Kingyo_Sukui/',
                description: 'Get as many goldfish as you can before your scoop breaks.',
                content: testContent,
                parent: seedPortfolios[4],
                likes:[seedUsers[1]._id,seedUsers[2]._id],
                approved: true
            },

        ]);
    })
    .then(function(entries){
        seedEntries = entries;
        seedUsers[0].followers = entries[0].likes;
        return seedUsers[0].save();
    })
    .then(function(){
        seedUsers[0].name = 'Evan J. Washington';
        return seedUsers[0].save();
    })
    .then(function(){
        seedUsers[0].city = 'Los Angeles, CA';
        return seedUsers[0].save();
    })
    .then(function(){
        return seedUsers[0].save();
    })
    .then(function(){
        return Comment.create([
            {
                subject: seedEntries[0]._id,
                creator: seedUsers[1]._id,
                body: 'That is so awesome!',
            },
            {
                subject: seedEntries[0]._id,
                creator: seedUsers[2]._id,
                body: 'Amazing!!',
            } 
        ]);
    })
    .then(function () {
        return Message.create([
            {
                sender:seedUsers[0]._id,
                receiver:seedUsers[1]._id,
                subject:'Hi!',
                body:'Hey!  Wanna go get dinner?',
            },
            {
                sender:seedUsers[1]._id,
                receiver:seedUsers[0]._id,
                subject:'Hi!',
                body:'Hey!  Wanna go get dinner?',
            },
            {
                sender:seedUsers[1]._id,
                receiver:seedUsers[2]._id,
                subject:'Hi Mom!',
                body:'Hi!  How are you?',
            },
            {
                sender:seedUsers[0]._id,
                receiver:seedUsers[1]._id,
                subject:'Hi!',
                body:'Hey!  Wanna go get dinner?',
                trashed: Date.now()
            },
            {
                sender:seedUsers[1]._id,
                receiver:seedUsers[2]._id,
                subject:'Hi Mom!',
                body:'Hi!  How are you?',
                hidden: Date.now()
            },
            {
                sender:seedUsers[2]._id,
                receiver:seedUsers[1]._id,
                subject:'yo!',
                body:'Hey!  Wanna go get dinner?',
            },
            {
                sender:seedUsers[0]._id,
                receiver:seedUsers[2]._id,
                subject:'Konnichiwa!',
                body:'Hi!  How are you?',
            },
            {
                sender:seedUsers[2]._id,
                receiver:seedUsers[0]._id,
                subject:'Konnichiwa!',
                body:'Hi!  How are you?',
            },
            {
                sender:seedUsers[1]._id,
                receiver:seedUsers[2]._id,
                subject:'Mom!',
                body:'Hey!  Wanna go get dinner?',
                hidden: Date.now()
            },
            {
                sender:seedUsers[0]._id,
                receiver:seedUsers[1]._id,
                subject:'Hey Sweetie!',
                body:'Hi!  How are you?',
                hidden: Date.now()
            }
        ]);
    })
    .then(function(){
        return Event.create([
            {
                creator: seedUsers[0]._id,
                title: 'This is a test!',
                description: 'Testing to see if this works...',
                location:'Anywhere, U.S.A.',
                when: new Date("03/30/2018 21:25"),
                attendees: seedUsers.map(function(key){return key._id;}),
                likes: seedUsers.map(function(key){return key._id;}),
                approved: true
            },
            {
                creator: seedUsers[1]._id,
                title: 'Seminar practice!',
                description: 'Testing to see if this works...',
                location:'Culver City, CA',
                when: new Date("04/28/2017 19:30"),
                attendees: seedUsers.map(function(key){return key._id;}),
                likes: seedUsers.map(function(key){return key._id;}),
                approved: true
            },
        ]);
    })
    .then(function(events){
        seedEvents = events;
        return Activity.find({});
    })
    .then(function(activities){
        console.log('Database Seeded');
        return seedPortfolios[0].getArrayTree();
    })
    .catch(function(err){
        console.log(err);
    })
    .then(function(results){
        console.log(results);
        process.exit();
    });