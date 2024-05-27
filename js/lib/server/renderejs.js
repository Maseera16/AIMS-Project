function renderejs(paramRender, ejsFilePath){
	const ejs = require('ejs');
	const fs = require('fs');
	
	// Object of parameters that you want to render
	const param = paramRender; 
	
	// String of .ejs file path as
	let ejsFile = ejsFilePath;

	// pharse file content to String
	const fileContents = fs.readFileSync(ejsFile, 'utf8');
	
	let html= ejs.render(fileContents,param);
	return html;
}

exports.renderejs = renderejs;
