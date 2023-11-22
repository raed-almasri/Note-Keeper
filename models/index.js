 
import token from './tokenTable.model.js'; 
import author from './author.model.js';
import note from './note.model.js'; 
 
//! author has one to many token device 
author.hasMany(token, {
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
});
token.belongsTo(author);


//! author has one to many note 
author.hasMany(note, {
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
});
note.belongsTo(author);
 
export { 
    token, 
    author,
    note, 
};
