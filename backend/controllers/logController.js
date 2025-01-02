import Log from '../models/logModel.js';

export const storeLog = async (req, res) => {
  try {
    const { person_id, image, top_color, bottom_color, event, timestamp } = req.body;

    const newLog = new Log({
      person_id,
      image,
      top_color,
      bottom_color,
      event,
      timestamp
    });

    await newLog.save();
    return res.status(200).json({ message: "Log stored successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error storing log" });
  }
};
