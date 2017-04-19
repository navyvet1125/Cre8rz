var db             = require('./config/db');
var User		   = require('./models/user');
var Entry          = require('./models/entry');
var Event          = require('./models/event');
var Comment        = require('./models/comment');

var seedUser;
var seedEntry;
//Clear database and reseed it with new information.
User.remove({})
    .then(function(){
        return Entry.remove();
    })
    .then(function(){
        return Comment.remove();
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
        seedUser = users[0];
        return Entry.create([
            {
                title: 'evanwashington.com',
                url: 'http://www.evanwashington.com',
                description: 'Evan Washington - Holistic Health Facilitator',
                content: ['picture url 1','picture url 2', 'picture url 3'],
                creator: seedUser._id,
                createdAt: new Date(),
                likes:[users[1]._id,users[2]._id],
                approved: true
            },
            {
                title: 'Kingyo Sukui',
                url: 'http://navyvet1125.github.io/Kingyo_Sukui/',
                description: 'Get as many goldfish as you can before your scoop breaks.',
                content: ['picture url 1','picture url 2', 'picture url 3'],
                creator: seedUser._id,
                createdAt: new Date(),
                likes:[users[1]._id,users[2]._id],
                approved: true
            },

        ]);
    })
    .then(function(entries){
        seedEntry = entries[0];
        seedUser.followers = entries[0].likes;
        return seedUser.save();
    })
    .then(function(user){
        return Comment.create([
            {
                subject: seedEntry._id,
                creator: user.followers[0]._id,
                body: 'That is so awesome!',
            },
            {
                subject: seedEntry._id,
                creator: user.followers[1]._id,
                body: 'Amazing!!',
            } 
        ]);
    })
    .catch(function(err){
    	console.log(err);
    })
    .then(function(results){
    	console.log('Database seeded!');
    	process.exit();
    });