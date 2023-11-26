import axios from "axios";

const CustomerApiKey = process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY;

const sendWelcomEmailCreator = async (userEmail: string, userName: string) => {
  const data = {
    transactional_message_id: "5", // replace with your actual transactional_message_id
    to: userEmail,
    identifiers: {
      email: userEmail,
    },
    message_data: {
      name: userName,
      url: `https://inchy.ai/${userName}`, // Construct the inchy.ai URL
      // ... other data for your email ...
    },
  };

  try {
    const response = await axios.post(
      "https://api.customer.io/v1/send/email",
      data,
      {
        headers: {
          Authorization: `Bearer ${CustomerApiKey}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Email sent successfully from email service");
    } else {
      console.log("Failed to send email");
    }
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

const SendStripeKycEmail = async (
  userEmail: string,
  firstName: string,
  accountLinkUrl: string
) => {
  const data = {
    transactional_message_id: "4",
    to: userEmail,
    identifiers: {
      email: userEmail,
    },
    message_data: {
      name: firstName,
      url: accountLinkUrl,
      // ... other data for your email ...
    },
  };

  console.log("Sending email with data:", data); // Log the request data

  try {
    const response = await axios.post(
      "https://api.customer.io/v1/send/email",
      data,
      {
        headers: {
          Authorization: `Bearer ${CustomerApiKey}`,
        },
      }
    );

    console.log("Response from Customer.io:", response); // Log the response data

    if (response.status === 200) {
      console.log("Email sent successfully");
    } else {
      console.log("Failed to send email");
    }
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

// const sendEvent = async (eventName: string, userEmail: string, eventData: any) => {
//     try {
//       const response = await axios.post(`https://track.customer.io/api/v1/customers/${userEmail}/events`, {
//         name: eventName,
//         data: eventData,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${CustomerApiKey}`
//         }
//       });

//       if (response.status === 200) {
//         console.log('Event sent successfully');
//       } else {
//         console.log('Failed to send event');
//       }
//     } catch (error) {
//       console.error('An error occurred while sending the event:', error);
//     }
//   }

export { sendWelcomEmailCreator, SendStripeKycEmail };
