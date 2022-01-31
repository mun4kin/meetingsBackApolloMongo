import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
const meetingsSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Number,
    required: true
  },
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  ]
});

const Meetings = mongoose.model('Meetings', meetingsSchema);
export default Meetings;
