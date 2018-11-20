let axios = require('axios');

exports.getJobs = (req, res) => {
  axios.get('http://api.indeed.com/ads/apisearch?publisher=1388736040132108', {
            params: {
                v: 2,
                format: 'json',
                userip: req.ip,
                useragent: req.get('user-agent'),
                q: req.query.q,
                l: req.query.l,
                sort: req.query.sort,
                radius: req.query.radius,
                fromage: req.query.fromage,
                highlight: 0,
                limit: 8
            }
        })

        .then(response => {
            res.json(response.data)
        })
        .catch(err => {
            res.send(err);
        });
};