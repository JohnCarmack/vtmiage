var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

/*var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});
*/


var diagramme = new Schema ({
    cells : [
	{
	    type: { type: String },
	    size :{
			width : Number,
			height : Number
	    },
	    position :
	    {
			x : Number,//N
			y : Number//N
	    },

	    angle : Number,//N
	    id : String,
	    z : Number,//N
	    attrs : {
	    },
	    source: {
	    	id: String
	    },
	    target: {
	    	id: String
	    }
	   
	    //userName : { type: Schema.Types.ObjectId, ref: 'User' }
	   
	}],
	 userName : { type: Schema.Types.ObjectId, ref: 'User' },
	 diagrammeName: String
});

var User =  new Schema ({
		mail : {
		type : String,
		required : true,
		unique : true},
		password : {
		type : String,
		required : true},
		//diagramme : [{ type: Schema.Types.ObjectId, ref: 'diagramme' }]
		
});

mongoose.model('diagramme', diagramme);
mongoose.model('User', User);
//mongoose.model( 'Todo', Todo );
//mongoose.connect( 'mongodb://localhost/zzzzzzzzzzzzzzzz' );
//mongoose.connect( 'mongodb://127.0.0.1/umlDB' );
mongoose.connect( 'mongodb://localhost/umlDB');