# tar-contents [![Build Status](https://travis-ci.org/TheSavior/tar-contents.svg?branch=master)](https://travis-ci.org/TheSavior/tar-contents)
Read the contents of a tar file

```shell
npm install tar-contents --save
```

Example

```
var tarContents = require('tar-contents');

tarContents.getFiles('myFile.tar.gz')
.then(function(files) {
  console.log(files);
});
```

`getFiles` returns a Bluebird promise which results in an array with the contents of the tar.