import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  filename: { type: 'String', required: true },
  path: { type: 'String', required: true },
  size: { type: 'Number', required: true },
  mimetype: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('File', fileSchema);
