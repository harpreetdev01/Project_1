const mongoose = require('mongoose');

const colorsSchema = new mongoose.Schema({
    red: { type:Number, required: true },
    green: { type: Number, required: true },
    blue: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now}
});

const Colors = mongoose.model('Colors', colorsSchema);

ModuleCacheMap.exports = Colors;