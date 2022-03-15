let index = await import('./index.js');

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql connected');
    db.query('example');
})
app.get('/createDB', function (req, res) {
    let sql = 'Create DATABASE nodeMySql';
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send('DB created')
    })
});


function search(req, res, next) {
    //user search for a term
    var searchFor = req.query.search
    // users select a category
    var category = req.query.category

    let query = 'SELECT * FROM Posting';
    if (searchFor, category != '') {
        query = `SELECT * FROM Posting WHERE Category = '` + category + `' AND 
        ( Name LIKE '%` + searchFor + `%' OR Comment LIKE '%` + searchFor + `%')`;
    }
    else if (searchFor, category != '') {
        query = `SELECT * FROM Posting WHERE Name LIKE '%` + searchFor + `%' OR 
        Comment LIKE '%` + searchFor + `%')`;
    }
    else if (searchFor, category != '') {
        query = `SELECT * FROM Posting WHERE Category = '` + category + `'`;
    }
    db.query(query, function (err, result) {
        if (err) {
            req.searchResult = ""
            req.searchFor = ""
            req.category = ""
            next()
        }
        req.searchResult = result
        req.searchFor = searchFor
        req.category = ""

        next()
    })
}


app.get('/example', search, function (req, res,) {

    var searchResult = req.searchResult;
    res.render('pages/example', {
        results: searchResult.length,
        searchFor: req.searchFor,
        searchResult: searchResult,
        category: req.category
    })
})




