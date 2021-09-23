const environment = require('./environment');
const fs = require('fs');
const path =require('path');
module.exports = (app) =>{
// we are creating a global function in the app's locals
    app.locals.assetPath = function(filePath){
        if(environment.name == 'development'){
            return filePath;
        }

        // rev manifest does not have a slash in its key or value so we prepend a slash
        return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath];

    }
}