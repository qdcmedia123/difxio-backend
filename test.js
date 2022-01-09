const errors = [{message: 'this is message', field: 'password'},
{message: 'this is message', field: 'password'}];


// Get the password error

const errorToString = errors.map(error => {
	return error.message;
}).join('\r\n');

console.log(errorToString)