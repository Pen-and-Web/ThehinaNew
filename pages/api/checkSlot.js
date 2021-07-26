import connectDB from "../../middleware/mongodb";
import Schedule from "../../models/schedule";

const checkSlot = async (req, res) => {
  if (req.method === "POST") {
    const { slotId } = req.query;

    var check = await Schedule.findById({ _id: slotId });

    console.log("Check: ", check);

    if (check?.availability) {
      res.status(200).json({ message: "Appointment slot is available!" });
    } else {
      res.status(404).json({ message: "Appointment slot is NOT available!" });
    }
  }
};

export default connectDB(checkSlot);
