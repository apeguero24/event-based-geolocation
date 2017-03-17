var configSettings = require('./config');

module.exports = {
    
    //connection mongo URI string 
    getDbConnectionString: function() {
        return `mongodb://${configSettings.username}:${configSettings.pwd}@ds029595.mlab.com:29595/nodetodolistsample`;
    }
}