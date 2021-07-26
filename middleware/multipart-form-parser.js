import formidable from "formidable";

// const form = formidable({ multiples: true });
const form = new formidable.IncomingForm();

export default async function parseMultipartForm(req, res, next) {
  const contentType = req.headers["content-type"];
  //console.log("REq.body: ", req.body);
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    console.log("REq.body1111: ");
    form.parse(req, (err, fields, files) => {
      console.log("error: ", err);
      if (!err) {
        console.log("REq.body: ppp", req.body);
        req.body = fields;
        req.files = files;
      }
    });
    next();
  } else {
    console.log("REq.body:3243324 ", req.body);
    next();
  }
}
