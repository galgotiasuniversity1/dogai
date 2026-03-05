// const { MailtrapClient } = require("mailtrap");

// const TOKEN = "85ff60ef00a978c56bc6f141966f8fb6";

// const client = new MailtrapClient({
//     token: TOKEN,
// });

// const sender = {
//     email: "hello@demomailtrap.co",
//     name: "Mailtrap Test",
// };
// const recipients = [
//     {
//         email: "kaushlyabasnal@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);

// console.log("Email sent! Check your Mailtrap inbox.");




const { MailtrapClient } = require("mailtrap");

const TOKEN = "85ff60ef00a978c56bc6f141966f8fb6";

const client = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@dogai.in",
    name: "Mailtrap Test",
};
const recipients = [
    {
        email: "kaushlyabasnal@gmail.com",
    }
];

client
    .send({
        from: sender,
        to: recipients,
        subject: "You are awesome!",
        text: "Congrats for sending test email with Mailtrap!",
        category: "Integration Test",
    })
    .then(console.log, console.error);