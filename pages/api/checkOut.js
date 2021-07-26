import connectDB from "../../middleware/mongodb";
import { baseURL } from "../../env";
import CheckOut from "../../models/checkOut";
import axios from "axios";
import { done } from "nprogress";

const checkOut = async (req, resTop) => {
  if (req.method === "POST") {
    const {
      clientId,
      consultantId,
      name,
      cardNumber,
      month,
      year,
      cvc,
      country,
      city,
      street,
      addressLine1,
      avenue,
      price,
    } = req.body;

    try {
      let checkoutId;

      var newCheckOut = new CheckOut({
        clientId,
        consultantId,
        name,
        cardNumber,
        month,
        year,
        cvc,
        country,
        city,
        street,
        addressLine1,
        avenue,
        price,
      });
      const saveCheckout = await newCheckOut.save();
      checkoutId = saveCheckout._id;
      console.log("checkoutId: ", checkoutId);
      const body = {
        card: {
          number: cardNumber,
          exp_month: month,
          exp_year: year,
          cvc: cvc,
          name: name,
          address: {
            country: country,
            line1: addressLine1,
            city: city,
            street: street,
            avenue: avenue,
          },
        },
      };
      // secret key for testing purpose
      // sk_test_XKokBfNWv6FIYuTMg5sLPjhJ

      const config = {
        headers: { Authorization: `Bearer sk_test_XKokBfNWv6FIYuTMg5sLPjhJ` },
      };

      axios
        .post(`https://api.tap.company/v2/tokens/`, body, config)
        .then((res) => {
          //console.log(res.data, "Token Response");

          //charge request body
          const body = {
            amount: price,
            currency: "SAR",
            threeDSecure: true,
            save_card: false,
            description: "",
            statement_descriptor: "",
            metadata: {
              udf1: "",
              udf2: "",
            },
            reference: {
              transaction: "",
              order: "",
            },
            receipt: {
              email: false,
              sms: true,
            },
            customer: {
              first_name: name,
              middle_name: "",
              last_name: "",
              email: "",
              phone: {
                country_code: "965",
                number: "50000000",
              },
            },
            merchant: {
              id: "",
            },
            source: {
              id: res.data.id,
            },
            post: {
              url: "http://localhost:3000/thehina",
            },
            redirect: {
              url: "http://localhost:3000/thehina",
            },
          };
          axios
            .post(`https://api.tap.company/v2/charges`, body, config)
            .then(async (res) => {
              //console.log("charge request response", res.data);
              await CheckOut.findByIdAndUpdate(
                checkoutId,
                { chargeId: res.data.id },
                {
                  useFindAndModify: false,
                }
              ).then(async (response) => {
                resTop.status(200).json(await CheckOut.findById(checkoutId));
              });

              //console.log("ABC: ", updatedCheckout);
            })

            .catch((err) => console.log("charge req error", err));
        })

        .catch((err) => console.log(err));

      // resTop.end();

      // done();
      // const updatedCheckout = await CheckOut.findById(checkoutId);
      //console.log("updatedCheckout: ", updatedCheckout);
      // res.status(200).json({ updatedCheckout });
      // console.log("newCheckOut :", newCheckOut);
    } catch (err) {
      console.log(err);
    }
  }
};
export default connectDB(checkOut);
