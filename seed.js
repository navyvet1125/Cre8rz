var db             = require('./config/db');
var User		   = require('./models/user');
var Portfolio          = require('./models/portfolio');
var Entry          = require('./models/entry');
var Event          = require('./models/event');
var Comment        = require('./models/comment');
var Message        = require('./models/message');

var seedUsers;
var seedPortfolios;
var seedEntries;
var seedComments;
var seedMessages;
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
                city:'Los Angeles, CA',
                career:'website' ,
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
                name: 'Evan\'s Projects',
                description:'All of the projects I made for class',
                purpose:'assessment',
                type:'website'
            },
            {
                creator: seedUsers[0]._id,
                name: 'Evan\'s Sites',
                description:'All of the websites I made on my own.',
                purpose:'assessment',
                type:'website'
            }
        ]);
    })
    .then(function(portfolios){
        seedPortfolios = portfolios;
        return Entry.create([
            {
                title: 'evanwashington.com',
                url: 'http://www.evanwashington.com',
                description: 'Evan Washington - Holistic Health Facilitator',
                content:testContent,
                portfolio: seedPortfolios[1]._id,
                likes:[seedUsers[1]._id,seedUsers[2]._id],
                approved: true
            },
            {
                title: 'Kingyo Sukui',
                url: 'http://navyvet1125.github.io/Kingyo_Sukui/',
                description: 'Get as many goldfish as you can before your scoop breaks.',
                content: testContent,
                portfolio: seedPortfolios[0]._id,
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
    .then(function(user){
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
    .catch(function(err){
    	console.log(err);
    })
    .then(function (comments) {
        seedComments = comments;
        return Message.create([
            {
                sender:seedUsers[0]._id,
                receiver:seedUsers[1]._id,
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
    .then(function(messages){
        seedMessages = messages;
        return Message.findByReceiver(seedUsers[2]._id);
    })
    .then(function(messages){
    	console.log('Database seeded!');
        console.log('-------------------------Users-----------------------------------');
        console.log(seedUsers);
        console.log('-------------------------Portfolio-------------------------------');
        console.log(seedPortfolios);
        console.log('-------------------------Entries---------------------------------');
        console.log(seedEntries);
        console.log('-------------------------Comments--------------------------------');
        console.log(seedComments);
        console.log('-------------------------Contents of the first entry-------------');
        console.log(JSON.parse(testContent));
        console.log('-------------------------Messages--------------------------------');
        console.log(seedMessages);
        console.log('-------------------------Testing---------------------------------');
        console.log('Subjects:');
        messages.forEach(function(obj){console.log(obj.subject);});

    	process.exit();
    });