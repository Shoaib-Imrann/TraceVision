import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  person_id: { type: String, required: true },
  image: { type: String, required: true },
  top_color: { type: String, required: true },
  bottom_color: { type: String, required: true },
  event: { type: String, required: true },
  timestamp: { type: String, required: true },  
});


const Log = mongoose.model('Log', logSchema);

export default Log;


