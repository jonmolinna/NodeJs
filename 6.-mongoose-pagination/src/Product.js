import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productoSchema = mongoose.Schema({
    name: String,
    price: Number,
}, {
    timestamps: true
});

productoSchema.plugin(mongoosePaginate);

export default mongoose.model('Product', productoSchema);