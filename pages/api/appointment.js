import connectDB from "../../middleware/mongodb";
import Appointment from "../../models/appointment";
import Activity from "../../models/activities";
import User from "../../models/user";
import Schedule from "../../models/schedule";
import nodemailer from "nodemailer";
import { baseURL } from "../../env";
import axios from "axios";
// import { ZoomMtg } from "@zoomus/websdk";

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareJssdk();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testusapp12@gmail.com",
    pass: "Test@123",
  },
});

const appointment = async (req, res) => {
  if (req.method === "POST") {
    const { clientData, consultantData, status, startDate, endDate, slotId } =
      req.body;

    //console.log("Consultant Id: ", consultantData.consultantId);

    const check = await Appointment.find({
      "consultantData.consultantId": consultantData.consultantId,
      startDate,
      endDate,
    });

    //console.log("Check: ", check);
    if (check.length) {
      res.status(404).json({
        message:
          "This slot has already been booked. Please select another slot.",
      });
    } else {
      var newAppointment = new Appointment({
        clientData,
        consultantData,
        status: "Pending",
        startDate,
        endDate,
        slotId,
      });
      console.log(newAppointment, "newBookingRequest");
      let date = startDate.split("T", 1);
      let startTime = startDate.split("T").slice(1);
      let endTime = endDate.split("T").slice(1);

      var newActivity = new Activity({
        message: `${clientData.name} sent an appointment request to ${consultantData.name} on ${date}, from ${startTime} to ${endTime}`,
      });
      await newActivity.save();

      await Schedule.findByIdAndUpdate(
        slotId,
        { availability: false },
        {
          useFindAndModify: false,
        }
      );
      //Create New Appointment
      var appointmentCreated = await newAppointment.save();
      var mailClient = {
        from: "testusapp12@gmail.com",
        //to: "official.farhanbhatti@gmail.com",
        to: clientData.email,
        subject: "Thehina: Appointment",
        html: `<h1>Appointment Request</h1><p>You have requested an appointment on ${date}, from ${startTime} to ${endTime} !</p>`,
      };
      var mailConsultant = {
        from: "testusapp12@gmail.com",
        to: consultantData.email,
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Appointment",
        html: `<h1>Appointment Request</h1><p>You have an appointment request on ${date}, from ${startTime} to ${endTime} !</p>`,
        // <img src="cid:logo" alt="Logo" width="50%" height="50%"> `,
        // attachments: [
        //   {
        //     filename: "logo.png",
        //     path: "./public/logo.png",
        //     cid: "logo", //my mistake was putting "cid:logo@cid" here!
        //   },
        // ],
      };
      var mailAdmin = {
        from: "testusapp12@gmail.com",
        to: "thehinaa@gmail.com",
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Appointment",
        html: `<h1>Appointment Request</h1><p>${clientData.name} sent an appointment request to ${consultantData.name} on ${date}, from ${startTime} to ${endTime} !</p>`,
        // <img src="cid:logo" alt="Logo" width="50%" height="50%"> `,
        // attachments: [
        //   {
        //     filename: "logo.png",
        //     path: "./public/logo.png",
        //     cid: "logo", //my mistake was putting "cid:logo@cid" here!
        //   },
        // ],
      };
      transporter.sendMail(mailClient, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      transporter.sendMail(mailConsultant, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      transporter.sendMail(mailAdmin, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.status(200).json({
        Appointment: appointmentCreated,
      });
    }
  } else if (req.method === "GET") {
    const { consultantId, clientId, appointmentId } = req.query;
    let appointment;

    if (consultantId) {
      appointment = await Appointment.find({
        "consultantData.consultantId": consultantId,
      });
    } else if (clientId) {
      appointment = await Appointment.find({
        "clientData.clientId": clientId,
      });
    } else if (appointmentId) {
      // appointment = await Appointment.find({
      //   _id: appointmentId,
      // });
      appointment = await Appointment.findById(appointmentId);
    }

    res.status(200).json({
      Appointments: appointment,
    });
  } else if (req.method === "DELETE") {
    const { appointmentId, consultantId } = req.query;
    await Appointment.findByIdAndDelete(appointmentId);
    let appointment = await Appointment.find({
      "consultantData.consultantId": consultantId,
    });
    res.status(200).json({
      Appointments: appointment,
    });
  } else if (req.method === "PATCH") {
    if (!req.body) {
      return res
        .status(400)
        .json({ message: "Data to update can not be empty!" });
    }

    const id = req.query.id;
    const { status } = req.body;

    const appointment = await Appointment.findOne({ _id: id });
    console.log("Appointment: ", appointment);

    const client = await User.findOne({ _id: appointment.clientData.clientId });
    //console.log("Client: ", client);

    const consultant = await User.findOne({
      _id: appointment.consultantData.consultantId,
    });
    //console.log("Consultant: ", consultant);

    var newActivity = new Activity({
      message: `Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!`,
    });
    await newActivity.save();

    var mailAdmin = {
      from: "testusapp12@gmail.com",
      to: "thehinaa@gmail.com",
      // to: "usmanjamil047@gmail.com",
      // to: "official.farhanbhatti@gmail.com",
      subject: "Thehina: Update",
      html: `<h1>Activity</h1><p>Meeting of ${appointment.clientData.name} with ${appointment.consultantData.name} was updated!</p>
      <p>تم تحديث ${appointment.consultantData.name} مع ${appointment.clientData.name} اجتماع</p>`,
    };

    transporter.sendMail(mailAdmin, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let mailClient;
    let mailConsultant;
    //console.log("Survey Link: ", baseURL);

    if (status === "Approved") {
      const body = {
        topic: "Test",
        type: 2,
        //host_email: "official.farhanbhatti@gmail.com",
        //start_time: "30-06-2023T01:05:00",
        start_time: `${appointment.startDate}:00`,
        //start_time: "2021-25-06T10:00:00",
        duration: 30,
        //schedule_for: "official.farhanbhatti@gmail.com",
        timezone: "Asia/Tashkent",
        password: "Abc123#",
        agenda: "Test meeting",
        // recurrence: {
        //   type: 2,
        //   repeat_interval: 2,
        //   weekly_days: "6,7",
        //   monthly_day: 25,
        //   monthly_week: 4,
        //   monthly_week_day: 6,
        //   end_times: 1,
        //   // end_date_time: "string [date-time]"
        // },
        settings: {
          //host_email: "official.farhanbhatti@gmail.com",
          host_video: false,
          participant_video: true,
          cn_meeting: false,
          in_meeting: false,
          join_before_host: true,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          //registration_type: 1,
          audio: "both",
          auto_recording: "none",
          enforce_login: false,
          close_registration: true,

          // enforce_login_domains: "string",
          // alternative_hosts: "thehinaa@gmail.com",
          // global_dial_in_countries: [
          //   "Pakistan"
          // ],
          //registrants_email_notification: false,
        },
      };
      try {
        const response = await axios.post(
          "https://api.zoom.us/v2/users/thehinaa@gmail.com/meetings",
          body,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImJDVjVVclpHVGlDNlJ6ZnhEUmNWMEEiLCJleHAiOjE2NTYyNTE0NjAsImlhdCI6MTYyNDYyMzk1NH0.7dA0IdeYav2gkUawe8b1tBUunyaUaFw_A-35xkCg5T4`,
            },
          }
        );
        console.log(response.data, "data");
        mailClient = {
          from: "testusapp12@gmail.com",
          to: client.email,
          // to: "official.farhanbhatti@gmail.com",
          subject: "Thehina: Appointment",
          html: `<h1>Appointment Details</h1>
          <table style="width:100%; border: 1px solid #dddddd">
            <tr style="border: 1px solid #dddddd; background-color: #dddddd;">
              <th>Consultant Name</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
            <tr style="border: 1px solid #dddddd">
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr style="border: 1px solid #dddddd">
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
          </table> 
          <a href="${response.data.join_url}">${response.data.join_url}</a>`,
        };

        mailConsultant = {
          from: "testusapp12@gmail.com",
          to: consultant.email,
          // to: "official.farhanbhatti@gmail.com",
          subject: "Thehina: Survey",
          html: `<h1>Appointment Link</h1><a href="${response.data.join_url}">${response.data.join_url}</a>`,
        };
      } catch (e) {
        console.log(e.response, "error");
        res.send(e);
      }
    }

    if (status === "Resolved") {
      mailClient = {
        from: "testusapp12@gmail.com",
        to: client.email,
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Survey",
        html: `<h1>Survey Link</h1><a href="http://206.189.52.233:3000/survey/${appointment._id}">http://206.189.52.233:3000/survey/${appointment._id}</a>`,
        // html: `<h1>Survey Link</h1><a href="http://localhost:3000/survey/${appointment._id}">http://localhost:3000/survey/${appointment._id}</a>`,
      };

      mailConsultant = {
        from: "testusapp12@gmail.com",
        to: consultant.email,
        // to: "official.farhanbhatti@gmail.com",
        subject: "Thehina: Survey",
        html: `<h1>Survey Link</h1><a href="http://206.189.52.233:3000/consultantsurvey/${appointment._id}">http://206.189.52.233:3000/consultantsurvey/${appointment._id}</a>`,
        // html: `<h1>Survey Link</h1><a href="http://localhost:3000/survey/${appointment._id}">http://localhost:3000/survey/${appointment._id}</a>`,
      };
    }
    // else {
    //   mailClient = {
    //     from: "testusapp12@gmail.com",
    //     to: client.email,
    //     // to: "official.farhanbhatti@gmail.com",
    //     subject: "Thehina: Appointment",
    //     html: `<h1>Appointment</h1><a href=""></a>`,
    //   };

    //   mailConsultant = {
    //     from: "testusapp12@gmail.com",
    //     to: consultant.email,
    //     // to: "official.farhanbhatti@gmail.com",
    //     subject: "Thehina: Appointment",
    //     html: `<h1>Appointment</h1><p>You updated the status of your Meeting with ${appointment.clientData.name} to ${req.body.status}!</p>`,
    //   };
    // }

    transporter.sendMail(mailClient, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    transporter.sendMail(mailConsultant, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    await Appointment.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Appointment!`,
        });
      } else {
        res.send({ message: "Appointment was updated successfully!" });
      }
    });
  }
};

export default connectDB(appointment);
