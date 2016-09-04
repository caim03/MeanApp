exports.render = function(req, res) {
    if(req.session.lastVisit) {
        /* POSSO USARE LA SESSIONE PER REGISTRARE L'UTENTE CORRENTE */
        console.log(req.session.lastVisit);
    }
    
    req.session.lastVisit = new Date();
    
    res.render('index');
}