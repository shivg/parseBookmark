// Usage : node parseBookmark.js data-file

if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
 }
var fs = require('fs')
  , filename = process.argv[2], toWrite;

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('Reading file, OK: ' + filename);
  toWrite = makeBookmarkPage(data);
  fs.writeFile(filename+"-bookmarks.html", toWrite , function(err) {
  if (err)
    console.log("Failed to write file:", err);
  else
    console.log("\nFile written:  "+ filename + "-bookmarks.html");
});
});


// Make the html page from json

function makeBookmarkPage(txt){
  var obj = (JSON.parse(txt));
  var urls = obj.tabs.reduce(function (p,n) {
  	return p+"<a href='"+n.url+"'>"+n.url+"</a><p>\n";
  },"<p>Bookmarks\n</p><br>");
  return urls;
}




