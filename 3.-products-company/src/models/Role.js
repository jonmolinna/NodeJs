import mongoose from 'mongoose';

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = mongoose.Schema({
    name: String
}, {
    versionKey: false
});

export default mongoose.model('Role', roleSchema);