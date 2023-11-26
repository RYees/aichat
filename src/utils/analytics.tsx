import Analytics from "analytics";
// const analytics = Analytics({
//   app: 'my-app-name',
//   plugins: [
//     mixpanelPlugin({
//       token: 'YOUR_MIXPANEL_TOKEN'
//     })
//   ]
// });

// @ts-ignore

import mixpanelPlugin from "@analytics/mixpanel";
import customerIOServer from "@analytics/customerio";
const CustomerApiKey = process.env.NEXT_PUBLIC_CUSTOMER_IO_API_KEY;

let analytics: any;
const IS_BROWSER = typeof window !== "undefined";

const plugins = [
  mixpanelPlugin({
    token: "dbe08fc5ace4d511e89c4adf55f31f9e",
  }),
  customerIOServer({
    siteId: "6ef21ccde354a2f6f126",
    apiKey: CustomerApiKey,
  }),
  //... plugins
];

// if (typeof window !== 'undefined') {
// Code is running in a browser environment

analytics = Analytics({
  app: "inchy",
  plugins: [...(IS_BROWSER ? plugins : [])],
});

/* Track a page view */
// analytics.page();

/* Track a custom event */
// analytics.track("Page_Viewed", {
//   item: "pink socks",
//   price: 20,
// });

interface Payload {
  event: string;
  // other properties...
}

analytics.on("track:completed", ({ payload }: { payload: any }) => {
  if (payload.event === "Signed_In") {
    analytics.track("Signed_In", {
      category: "User",
      label: "Signed In",
    });
  } else if (payload.event === "New_Regestration") {
    analytics.track("New_Regestration", {
      category: "User",
      label: "New Registration",
    });
  } else {
    analytics.track(payload.event, {
      category: "Character",
      label: "Character Viewed",
    });
  }
});

const userData = analytics.user();

// Get user id
const userId = analytics.user("userId");

/* Identify a visitor */
// analytics.identify(userId, {
//   firstName: "bill",
//   lastName: "murray",
// });

// }

// window.Analytics = analytics;

/* export analytics for usage through the app */
export default analytics;
