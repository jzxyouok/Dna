'use strict';

module.exports = {
  'GET /api/example': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: ['foo', 'bar'],
      });
    }, 500);
  },
  '/api/*': 'http://localhost:9000/', //api请求代理到服务器
};
