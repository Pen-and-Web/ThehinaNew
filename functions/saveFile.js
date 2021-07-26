import fs from "fs";

let uniqueFileName = null;

export const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  uniqueFileName = `${Date.now()}-${file.name}`;
  //   console.log(uniqueFileName, "NAME FILE");
  fs.writeFileSync(`./public/uploads/${uniqueFileName}`, data);
  await fs.unlinkSync(file.path);
  return uniqueFileName;
};
