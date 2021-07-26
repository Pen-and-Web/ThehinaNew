import fs from "fs";

export const removeFile = async (fileName) => {
  try {
    fs.unlinkSync(`./public/uploads/${fileName}`);

    return true;
    //file removed
  } catch (err) {
    console.error(err);
    return false;
  }
};
