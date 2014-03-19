module.exports = function bodyDisposal(key, $){
  key = key || "_delete";
  $ = $ || {};
  
  return function bodyDisposal(req, res, next) {
    for (var i in req.body){
      if (req.body[i]===''){
        delete req.body[i];
      }
    }
    
    if (!req.body || typeof req.body !== 'object' || !(key in req.body)){
      return next();
    }

    if (!(req.body[key] instanceof Array)){
      req.body[key] = [req.body[key]];
    }
    
    for (var i in req.body[key]){
      var deleteKey = req.body[key][i];
      if (req.body[deleteKey]===undefined || $.deleteData){
        req.body[deleteKey] = $.deleteValue;
      }
    }
    
    delete req.body[key];
    next();
  };
};