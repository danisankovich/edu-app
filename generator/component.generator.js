var fs = require('fs');
var path = require('path');

var args = {};
process.argv.slice(2).forEach(function(e) {
  e = e.slice(2).split('=');
  args[e[0]] = e[1];
});
var generateComponent = function(selector, componentName, fileName) {
  if(args.hasOwnProperty('fileName') && args.hasOwnProperty('componentName') && args.hasOwnProperty('selector')) {
    var content = fs.readFileSync(path.join(__dirname, 'templates', 'component.template.ejs'), 'utf8');
    content = content.replace('new-selector', selector).replace('NewComponent', componentName);
    fs.writeFile(path.join('public/javascripts/dev/', fileName + '.component.ts'), content, function(err) {
      if(err) {console.log(err);}
      else{ console.log('Component Created');}
    });
  }
  else {
    console.log('improper arguments passed. Make sure to pass in all valid flags');
    console.log('--fileName="fileName"    ',   '--selector="selectorName"   ', '--componentName="componentName"');
  }
};
generateComponent(args.selector, args.componentName, args.fileName);
