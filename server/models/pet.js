'use strict'

const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const PetSchema = Schema({
    name: String,
    description: String,
    place: String,
    image: String,
    userId: String,
    status: String,
});
// 1: Centro, 2: Sur, 3: Norte

module.exports = mongoose.model('Pet', PetSchema);

// pets = [
//   {
//     'name': 'Manchitas',
//     'image': 'https://images.unsplash.com/photo-1537732281245-d71d59bdc271?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
//   },
//   {
//     'name': 'Arturo',
//     'image': 'https://images.unsplash.com/photo-1544136442-e0fe8b89c26a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80'
//   },
//   {
//     'name': 'Tomi',
//     'image': 'https://images.unsplash.com/photo-1519134991647-f069322dfe22?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
//   },
//   {
//     'name': 'Pelusa',
//     'image': 'https://images.unsplash.com/photo-1478029973231-f42d99fe5c20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80'
//   }
// ];
