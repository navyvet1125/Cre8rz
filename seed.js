var db             = require('./config/db');
var User		   = require('./models/user');


//Clear database and reseed it with new information.
User.remove({})

 	.then(function(){
  		return User.create([
    		{
                name:'Evan Washington', 
                email:'enavy04@gmail.com', 
                type:'admin', 
                city:'Inglewood', 
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            },
    		{
                name:'Milyani Rizal', 
                email:'milly_la@yahoo.com', 
                type:'visitor', 
                city:'Culver City', 
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            },
    		{
                name:'Indra Aris', 
                email:'indra@Aris.com', 
                type:'artist', 
                city:'West Hollywood', 
                career:'fasion',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel commodo magna. Mauris sodales turpis orci, sed luctus elit consectetur ac. Morbi maximus pellentesque augue vel pharetra. In vel ligula eu nibh vulputate eleifend eu quis sapien. Donec ac vestibulum nisl. Ut aliquet at elit et venenatis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus metus felis, fringilla vel diam id, rutrum interdum nisi. Quisque ullamcorper, leo et egestas hend' 
            }
    	]);
    })
    .catch(function(err){
    	console.log(err);
    })
    .then(function(user){
    	console.log(user);
    	process.exit();
    });