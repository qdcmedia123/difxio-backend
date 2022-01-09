const errs = [{message: 'genre price date must be valid', field: 'genre'},
{message: 'genre price date must be valid', field: 'something'}];
const newErr = {};

const normolize = errs.forEach(err => {
newErr[err.field] = err.message;
})

console.log(newErr)