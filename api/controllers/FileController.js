/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="image" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },

  upload: function  (req, res) {
    var thumbnail = req.file('thumbnail');

    thumbnail.upload({
      adapter: require('skipper-s3'),
      key: sails.config.project.s3.key,
      secret: sails.config.project.s3.secret,
      bucket: sails.config.project.s3.bucket
    }, function (err, files) {
      if (err) return res.serverError(err);

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};