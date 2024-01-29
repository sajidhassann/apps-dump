// export const chatBotMessageMap: IMessageMap = {
//   '0': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Assalam-u-alaikum Student👋,
// Maqsad say rabta karnay ke liye Shukriya!😇
// Aap please inn 👇 options mai se ek option select karein, takeh aap ko behtar guidance provide ki jae.`,
//         },
//         action: {
//           button: 'Main Menu',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '0.1',
//                   title: 'Bundles & Payments',
//                   description:
//                     'Payment aur behtreen exam offers aur bundles k liye',
//                 },
//                 {
//                   id: '0.2',
//                   title: 'DoubtSolve',
//                   description: 'Doubt solve ki details k liye',
//                 },
//                 {
//                   id: '0.3',
//                   title: 'Video Lectures',
//                   description: 'Video lectures ki details k liye',
//                 },
//                 {
//                   id: '0.4',
//                   title: 'Tests',
//                   description: 'App mein tests kay hawalay se details k liye',
//                 },
//                 {
//                   id: '0.5',
//                   title: 'ECAT/MDCAT',
//                   description: 'ECAT/MDCAT ki details k liye',
//                 },
//                 {
//                   id: '0.6',
//                   title: 'Maqsad Sikkay',
//                   description: 'Sikkay kay hawalay se details k liye',
//                 },
//                 {
//                   id: '0.7',
//                   title: 'Report an issue',
//                   description: 'App mein issues k hawalay se',
//                 },
//                 {
//                   id: '0.8',
//                   title: 'Other features',
//                   description: 'App mein mazeed features ki details k liye',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.1': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Payment aur behtreen exam offers aur bundles k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Bundles & Payments',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '1.1',
//                   title: 'Feature unlock karna hai',
//                   description: 'Maqsad App k features ko upgrade karna hai',
//                 },
//                 {
//                   id: '1.2',
//                   title: 'Payment karne ka tareeqa',
//                   description: 'Maqsad App k features upgrade karne ka tareeqa',
//                 },
//                 {
//                   id: '1.3',
//                   title: 'Aur payment options',
//                   description: 'App mein payment karne k mazeed tareeqay',
//                 },
//                 {
//                   id: '1.4',
//                   title: 'Sikkay payment',
//                   description: 'Sikkay se payment karne ka tareeqa',
//                 },
//                 {
//                   id: '1.5',
//                   title: 'Promocode payment',
//                   description: 'Discount code use karnay ka tareeqa jaanein',
//                 },
//                 {
//                   id: '1.6',
//                   title: 'Other issues',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.2': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Doubt solve ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'DoubtSolve',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '2.1',
//                   title: 'Wrong Solution',
//                   description: 'Sawal ka jawaab sahi nahi aaya',
//                 },
//                 {
//                   id: '2.2',
//                   title: 'Doubtsolve issue',
//                   description: 'DoubtSolve nahi chal raha',
//                 },
//                 {
//                   id: '2.3',
//                   title: 'Doubts kaise poochoon',
//                   description: 'App mein questions kaise poochoon?',
//                 },
//                 {
//                   id: '2.4',
//                   title: 'Upgrade DoubtSolve?',
//                   description: 'App mein doubt solve kaise upgrade karein.',
//                 },
//                 {
//                   id: '2.5',
//                   title: 'Doubtsolve discount',
//                   description: 'Humare discounted offers k baaray mein jaanein',
//                 },
//                 {
//                   id: '2.6',
//                   title: 'Other issue',
//                   description:
//                     'Agar aap ka koi aur issue hai toh humein detail mein batayein',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.3': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Video lectures ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Video lectures',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '3.1',
//                   title: 'Video Lectures',
//                   description: 'App mein video lectures kiya hain?',
//                 },
//                 {
//                   id: '3.2',
//                   title: 'How to use',
//                   description: 'Video lectures istemaal karne ka tareeqa',
//                 },
//                 {
//                   id: '3.3',
//                   title: 'Lecture subjects',
//                   description: 'Video lectures mein available subjects',
//                 },
//                 {
//                   id: '3.4',
//                   title: 'Lecture classes',
//                   description: 'Video lectures mein available classes',
//                 },
//                 {
//                   id: '3.5',
//                   title: 'Lecture boards',
//                   description: 'Video lectures mein available boards',
//                 },
//                 {
//                   id: '3.6',
//                   title: 'Lecture payment',
//                   description: 'App mein video lectures khareednay ka tareeqa',
//                 },
//                 {
//                   id: '3.7',
//                   title: 'Other issue',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.4': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `App mein tests kay hawalay se details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Tests',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '4.1',
//                   title: 'Test details',
//                   description: 'Tests feature ki complete details',
//                 },
//                 {
//                   id: '4.2',
//                   title: 'Subjects and classes?',
//                   description:
//                     'App mein available Tests k subjects aur classes',
//                 },
//                 {
//                   id: '4.3',
//                   title: 'Available board?',
//                   description: 'App mein available board k tests.',
//                 },
//                 {
//                   id: '4.4',
//                   title: 'Test Payment',
//                   description: 'App mein Test feature khareednay ka tareeqa',
//                 },
//                 {
//                   id: '4.5',
//                   title: 'Other Issues',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein.',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.5': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `ECAT/MDCAT ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'ECAT/MDCAT',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '5.1',
//                   title: 'ECAT details',
//                   description: 'ECAT k hawalay se complete details',
//                 },
//                 {
//                   id: '5.2',
//                   title: 'MDCAT details',
//                   description: 'MDCAT k hawalay se complete details',
//                 },
//                 {
//                   id: '5.3',
//                   title: 'Promocode details',
//                   description: 'Promocode use karne ka tareeqa',
//                 },
//                 {
//                   id: '5.4',
//                   title: 'Other Issues',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein.',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.6': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Sikkay kay hawalay se details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Maqsad Sikkay',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '6.1',
//                   title: 'How to use Sikkay',
//                   description:
//                     'Sikkay istemaal kar k features khareedne ka tareeqa',
//                 },
//                 {
//                   id: '6.2',
//                   title: 'Mujhe aur sikkay chayye?',
//                   description: 'App mein sikkay haasil karne k tareeqay',
//                 },
//                 {
//                   id: '6.3',
//                   title: 'Sikkay referrals',
//                   description: 'Doston ko invite karein aur sikkay payein',
//                 },
//                 {
//                   id: '6.4',
//                   title: 'Other issues',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein.',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.7': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `App mein issues k hawalay se in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Report and issue',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '7.1',
//                   title: 'OTP issue',
//                   description: 'OTP nahi mil raha.',
//                 },
//                 {
//                   id: '7.2',
//                   title: 'Sikkay issue ',
//                   description: 'Sikkay deduct hogaye.',
//                 },
//                 {
//                   id: '7.3',
//                   title: 'Upgrade issue?',
//                   description: 'Feature upgrade nahi ho raha',
//                 },
//                 {
//                   id: '7.4',
//                   title: 'Other issues',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein.',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '0.8': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `App mein mazeed features ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Other Features',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '8.1',
//                   title: 'Past papers?',
//                 },
//                 {
//                   id: '8.2',
//                   title: 'Guess paper',
//                 },
//                 {
//                   id: '8.3',
//                   title: 'Maqsad app features',
//                   description: 'App mein kon se features available hain?',
//                 },
//                 {
//                   id: '8.4',
//                   title: 'App kaise use karein?',
//                   description: 'Maqsad app ko use karne ka tareeqa aur faiday',
//                 },
//                 {
//                   id: '8.5',
//                   title: 'Other issue',
//                   description:
//                     'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '1.1': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `Aap ko konsa feature upgrade karna hai? 😊`,
//         },
//         action: {
//           button: 'Feature unlock karna',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '1.1.1',
//                   title: 'Doubt solve',
//                 },
//                 {
//                   id: '1.1.2',
//                   title: 'Tests & Past papers',
//                 },
//                 {
//                   id: '1.1.3',
//                   title: 'Video lecture',
//                 },
//                 {
//                   id: '1.1.4',
//                   title: 'MDCAT/ ECAT',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '1.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app k features khareednay k liye ye video dekhein👀 : https://www.youtube.com/watch?v=N0X4FvML6qA
// Agar aap ko payment say related koi sawaal ho toh kindly humein batayein!`,
//       },
//     },
//   ],
//   '1.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app mai payment k options yeh hain:

// 1- Jazz cash AC# 03242996556
// AC Name: Umer Hameed Khan

// 2- Easy paisa AC# 03242996556
// AC Name: Umer Hameed Khan

// 3- Bank transfer. Bank: HBL Account Name: Maqsad private Limited IBAN:PK28HABB0025257000617803

// 4- Agar aap k paas payment kay liye account available nahi hai tou aap merchant k shop per jaa k bhi payment send kar saktay hain.
// Easypaisa/ Jazzcash AC# 03242996556
// AC Name: Umer Hameed Khan`,
//       },
//     },
//   ],
//   '1.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student👋Maqsad say earn kiye hue sikkay se aap koi bhi App mein feature discounted price pe  khareed saktay hain. 😊

// Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
//       },
//     },
//   ],
//   '1.5': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Students! 👋 App mein promo code use karne ka tareeqa bohot hee asaan hai. 😊 Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂

// Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
//       },
//     },
//   ],
//   '1.6': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '2.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.

// Mazeed jannay kai liye yeh video dekhein👀: https://www.youtube.com/shorts/yRa5COAXamo`,
//       },
//     },
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 "Ye mera jawab nahi hai" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚

// Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/shorts/iACIVrI7qL0`,
//       },
//     },
//   ],
//   '2.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student 👋 Aap please befikar rahein!

// Aap k monthly 3 free doubts ki limit khatam ho gayi hai. Aap Rs.250/- pay karkay pooray month unlimited solutions pooch saktay hain aur aap ko jald aur behtreen responses milein ge 👍

// Please transfer RS. 250 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556
// Umer Hameed Khan`,
//       },
//     },
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Aap k mazeed koi sawal hain tou humein batayein.`,
//       },
//     },
//   ],
//   '2.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Aap doubtsolve se koi bhi Math, Physics, Chemistry, Biology ya MDCAT aur ECAT k question pooch sakte hain.✌️
// Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊

// Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
//       },
//     },
//   ],
//   '2.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App par Doubtsolve Khareednay Ka Tareeqa is video mai dekhein👀:https://www.youtube.com/watch?v=N0X4FvML6qA

// App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs

// Or, please transfer RS. 250 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556
// Umer Hameed Khan`,
//       },
//     },
//   ],
//   '2.5': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Apna DoubtSolve ko upgrade karne k liye aap ye discounted packages select kar sakte hain. Aap app se payment kar sakte hain, ya payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humai pooch sakte hain. 🙂

// Discounted packages:
// 1 month - RS.250
// 2 month - RS.350
// 3 months - RS. 500
// 6 months - RS. 1000
// 1 year - RS. 2000

// Doubtsolve bundle Khareednay Ka Tareeqa is video mai dekhein👀: https://www.youtube.com/watch?v=Q-0VT0spdRU&feature=youtu.be

// OR

// Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.
// 03242996556
// Umer Hameed Khan`,
//       },
//     },
//   ],
//   '2.6': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '3.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein class 9th, 10th, 11th aur 12th k Sindh board k detailed video lectures available hain. Mazeed aap ko Punjab board k class 11th aur 12th k lectures bhi App mein mil jayengay.✌️📚

// Mazeed remaining subjects pai team kaam kar rahi hai jald hee available kardiye jayengay.😊

// Video lecture ko use karne ka tareeqa dekhein👀https://www.youtube.com/watch?v=gWW0AtnHRxE

// App mein video lecture ka page👀: https://maqsad.page.link/lectures`,
//       },
//     },
//   ],
//   '3.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein aap lectures k option mein apni class aur board k according video lectures access karein. ✌️📚
// Mazeed details k liye ye video dekhein.👇

// Video lecture ko use karne ka tareeqa dekhein👀: https://www.youtube.com/watch?v=gWW0AtnHRxE`,
//       },
//     },
//   ],
//   '3.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein class 9th to 12th Botany, Zoology, Chemistry, Maths , Biology and physics k video lectures available hain.✌️📚

// Video lecture ko use karne ka tareeqa dekhein👀:https://www.youtube.com/watch?v=gWW0AtnHRxE`,
//       },
//     },
//   ],
//   '3.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein class 9, 10, 11, 12 aur MDCAT ECAT k video lectures available hain.✌️📚

// Video lecture ko use karne ka tareeqa dekhein👀:https://www.youtube.com/watch?v=gWW0AtnHRxE`,
//       },
//     },
//   ],
//   '3.5': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein Sindh board k class 9 to 12 k video lectures available hain. Mazeed aap ko Punjab board k class 11th aur 12th k lectures bhi App mein mil jayengay.✌️📚

// Remaining boards per team kaam kar rahi hai jald hee available hojayengay ✌️`,
//       },
//     },
//   ],
//   '3.6': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad k high quality class 9th to 12th k video lectures access k liye aap video lecture mein aap ab har subject k kuch chapter k lectures bilkul free dekh saktay hain. ✌️📚

// Uss ke baad aap sirf RS.1000/- per subject pay kar k 3 months tak unlimited video lectures se studies kar saktay hain

// NOTE: Yeh price MDCAT k video lectures k nahi hain.

// Video Lectures Khareednay ka Tareeqa: https://www.youtube.com/shorts/p6rU-49qY9M
// OR. please transfer RS. 1000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556 Umer Hameed Khan`,
//       },
//     },
//   ],
//   '3.7': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '4.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app mai abhi class 9 to 12 Maths, Physics, Chemistry aur Biology k tests available hain. Iss k ilaawa, MDCAT aur ECAT k beshamaar tests bhi available hain! Maqsad app per 15000+ question library aur complete course k past papers ko access karein aur exams preparation ko aur bhi bhethar karein! 😊📚👨‍🎓😊

// Aur jannay liye ye video dekhein👀: https://www.youtube.com/watch?v=8AnnGYBUnZ8`,
//       },
//     },
//   ],
//   '4.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app mai abhi class 9 to 12 Maths, Physics, Chemistry aur Biology k tests available hain. Iss k ilaawa, MDCAT aur ECAT k tests bhi available hain!✌️ Mazeed aur bhi chapters aur subjects k test bhi jald hee App mein available ho jayein gay!

// Aur jannay liye ye video dekhein👀: https://www.youtube.com/watch?v=8AnnGYBUnZ8`,
//       },
//     },
//   ],
//   '4.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app mai abhi Sindh board k tests available hain! Mazeed is kai ilawa different boards k test pai team kaam kar rahi hai or buhat jald he available hojayengay. 🤝`,
//       },
//     },
//   ],
//   '4.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app per class 9th to 12th k 6000+ question library aur complete course k past papers ko access karein aur exams preparation ko aur bhi bhethar karein.📚👨‍🎓

// Tests feature Packages:
// 1 month - RS. 1000
// 3 months - RS. 1500

// NOTE: Yeh price MDCAT k tests feature k nahi hain.

// Test Feature Khareednay ka Tareeqa: https://www.youtube.com/shorts/WObVRnw5Lso

// Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.
// 03242996556 Umer Hameed Khan`,
//       },
//     },
//   ],
//   '4.5': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '5.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Hello! 👋 Future Engineers!🧑‍🔬 Maqsad k ECAT program ki offerings ye hain:

// ALL subjects access (Chemistry, Physics, English, basic Maths, Advance Maths and IQ) 📚
// -Detailed video lectures
// -Complete guide for ECAT
// -Unlimited Doubt solve access
// -Complete Test feature access
// -University Grand tests preparation access (GIKI, FAST - NUCES , NUST, NED and UET)

// Discounted Price: Rs. 4,000/-

// ECAT Khareednay ka Tareeqa 👀: https://www.youtube.com/watch?v=4fRO-wlv94E

// ECAT se related App mein guidance 👀: https://www.youtube.com/watch?v=edXq_6ATCvg

// OR please transfer RS. 4000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556 Umer Hameed Khan ✌️`,
//       },
//     },
//   ],
//   '5.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Hello! 👋 Future doctors! 👨‍⚕️Maqsad k MDCAT program ki offerings ye hain:

// -ALL subjects (English, Physics, Chemistry, Biology and Logical Reasoning) 📚
// -Detailed video lectures
// -Complete guide for MDCAT
// -Unlimited Doubt solve access
// -Complete Tests feature and Grand tests preparation

// Discounted Price: Rs. 7,000/-
// Mdcat se related App mein guidance 👀: https://www.youtube.com/watch?v=obfkwdX9DC8

// MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4

// OR please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556 Umer Hameed Khan ✌️`,
//       },
//     },
//   ],
//   '5.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Students! 👋 App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂

// Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
//       },
//     },
//   ],
//   '5.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '6.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student👋Maqsad say earn kiye hue sikkay aap doubt solve, past paper, video lectures, tests feature, MDCAT/ECAT aur question bank khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯

// Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
//       },
//     },
//   ],
//   '6.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student👋Maqsad sikkay earn karnay k 3 tareeqay hain! 👀

// 1️⃣“Menu” k option mei jayein aur “Edit profile” mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!

// 2️⃣Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!

// 3️⃣Friends ko App refer karein aur 💯 sikkay haasil karein.

// Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE

// App mein available sikkay dekhne ka link: https://maqsad.page.link/maqsadSikkayPage`,
//       },
//     },
//   ],
//   '6.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student👋 Maqsad sikkay friend ko refer karnay k liye “Menu” k option mein jaein aur “Share Maqsad” k option per click karein. Wahan di hue instruction ko follow kar k apnay friend ko refer karein aur 💯sikkay haasil karein.🙌 Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅

// Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
//       },
//     },
//   ],
//   '6.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '7.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maazrat k aap ko OTP nahi mila! Diye gaye steps try karen aur OTP haasil karein.

// 1 - Apnay phone ka flight/airplane mode on and off karein. 📲
// 2 - Kindly aap kisi behtar jaga per jaein jahan signals proper aa rahay hou. 📶
// 3 - Apna input kiya hua number double check karlein. 🤳
// 4- 10-15 minutes wait karein aur dubara OTP request karein! 🕒

// Aur agar in steps k baad bhi OTP nahi aye toh humein batayen.`,
//       },
//     },
//   ],
//   '7.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly ap 10 to 15 minutes wait karein aur app restart kar kai dekhein agar is kai baad bhe sikkay refund nhi ho to aap screen/video recording or Maqsad app per register number share kardein. 🤝

// App mein registered number dekhnay ka tareeqa 👀:https://www.youtube.com/shorts/Rz4jO1lrULk`,
//       },
//     },
//   ],
//   '7.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya

// App mein registered number dekhnay ka tareeqa 👀:https://www.youtube.com/shorts/Rz4jO1lrULk`,
//       },
//     },
//   ],
//   '7.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '8.1': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `App mein mazeed features ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Other Features',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '8.1.1',
//                   title: '9 aur 10 k past papers?',
//                   description: 'App mein class 9 aur 10 k past papers',
//                 },
//                 {
//                   id: '8.1.2',
//                   title: 'Past papers purchase?',
//                   description: 'App mein past papers khareednay ka tareeqa',
//                 },
//                 {
//                   id: '8.1.3',
//                   title: 'Available boards',
//                   description:
//                     'App mein kon se board k past papers available hain?',
//                 },
//                 {
//                   id: '8.1.4',
//                   title: 'Available subjects',
//                   description:
//                     'App mein kon se subject k past papers available hain?',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '8.2': [
//     {
//       type: MessageType.INTERACTIVE,
//       interactive: {
//         type: InteractiveType.LIST,
//         body: {
//           text: `App mein mazeed features ki details k liye in options mein se select karein! 👇`,
//         },
//         action: {
//           button: 'Other Features',
//           sections: [
//             {
//               title: 'Ek option select karain',
//               rows: [
//                 {
//                   id: '8.2.1',
//                   title: 'Class 11th guess paper?',
//                   description:
//                     'Maqsad mein available class 11th k guess papers',
//                 },
//                 {
//                   id: '8.2.2',
//                   title: 'Class 12th guess paper?',
//                   description:
//                     'Maqsad mein available class 12th k guess papers',
//                 },
//                 {
//                   id: '8.2.3',
//                   title: 'Class 9th guess paper?',
//                   description: 'Maqsad mein available class 9th k guess papers',
//                 },
//                 {
//                   id: '8.2.4',
//                   title: 'Class 10th guess paper?',
//                   description:
//                     'Maqsad mein available class 10th k guess papers',
//                 },
//               ],
//             },
//           ],
//         },
//       },
//     },
//   ],
//   '8.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad app mai ye features available hain:😊

// 1-DoubtSolve
// 2-Video Lectures
// 3-Tests
// 4-Mdcat/Ecat bundle
// 5-Past Papers
// 6-Scientific Calculator`,
//       },
//     },
//   ],
//   '8.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App ko use karnay ka tareeqa jannay k liye aap in videos ko dekhein aap ko help hogi.😊

// How to Login and Use the Maqsad App👀:https://www.youtube.com/watch?v=CyVgjCiqPr8

// Maqsad se parhai karne ka faida👀:https://www.youtube.com/watch?v=7KgL0PIcTWo

// Mazeed aap k aur koi sawal hai tou aap humse pooch saktay hai.✌️`,
//       },
//     },
//   ],
//   '8.5': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Kindly apna issue batayein😊`,
//       },
//     },
//   ],
//   '8.1.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Abhi maqsad App mein class 9th aur 10th kay past available nahi hain. Humari team already is pay kaam kar rahi hai buhat jald hee App pe available hojae gay. 🤝 Shukriya

// Mazeed aap humaray doubtsolve feature se exams ki tayyari kar saktay hai. 😊`,
//       },
//     },
//   ],
//   '8.1.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Yeh tou bohat aasan hai. 😊

// Past papers khareednay k liye yeh video dekhain👀: https://www.youtube.com/watch?v=XYwneBf1q6c`,
//       },
//     },
//   ],
//   '8.1.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein Karachi, Lahore aur Federal board kay class 11th aur 12th kay past papers available hai. 🙌

// Past papers khareednay ka tareeqa iss video mai hai 👀: https://www.youtube.com/watch?v=XYwneBf1q6c`,
//       },
//     },
//   ],
//   '8.1.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App mein Maths, physics, chemistry aur biology k class 11th aur 12th k past papers available hai. 😊

// Past papers khareednay ka tareeqa 👀:https://www.youtube.com/watch?v=XYwneBf1q6c`,
//       },
//     },
//   ],
//   '8.2.1': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.😊

// Abhi click ki jiye is link per: https://blog.maqsad.io/guess-papers/guess-papers-2023-class-11-sindh-board/`,
//       },
//     },
//   ],
//   '8.2.2': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.😊

// Abhi click ki jiye is link per: https://blog.maqsad.io/guess-papers/guess-papers-2023-class-12-sindh-board/`,
//       },
//     },
//   ],
//   '8.2.3': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers. 😊

// Abhi click ki jiye is link per:https://blog.maqsad.io/guess-papers/9th-class-guess-paper-2023-sindh-board/`,
//       },
//     },
//   ],
//   '8.2.4': [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.😊

// Abhi click ki jiye is link per:https://blog.maqsad.io/practicals/10-class-guess-paper-2023-sindh-board/`,
//       },
//     },
//   ],
//   solved: [
//     {
//       type: MessageType.TEXT,
//       text: {
//         body: `Student, aap ki studies mai dobara help karnay mai khushi hogi😊📚
// Maqsad se rabta karnay ka shukriya🙏Apna khayal rakhein. Allah hafiz!😊`,
//       },
//     },
//   ],
// };

// CJ Temp
// export const chatBotMessageMap: IMessageMap = {
//     '0': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Assalam-u-alaikum Student👋,
// Maqsad say rabta karnay ke liye Shukriya!😇
// Aap please apni class k according inn 👇 options mai se ek number select karein, takeh aap ko behtar guidance provide ki jae.`,
//                 },
//                 action: {
//                     button: 'Main Menu',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '0.1',
//                                     title: 'Class 1-8',
//                                 },
//                                 {
//                                     id: '0.2',
//                                     title: 'Class 9-10',
//                                 },
//                                 {
//                                     id: '0.3',
//                                     title: 'Class 11-12',
//                                 },
//                                 {
//                                     id: '0.4',
//                                     title: 'MDCAT/ECAT',
//                                 },
//                                 {
//                                     id: '0.5',
//                                     title: 'Other',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '0.1': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Student, inn options mein se select karein. 👇`,
//                 },
//                 action: {
//                     button: 'Class 1-8',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '1.1',
//                                     title: 'Doubt Solve',
//                                     description: 'Doubt solve ki details k liye',
//                                 },
//                                 {
//                                     id: '1.2',
//                                     title: 'Maqsad sikkay',
//                                     description: 'Sikkay kay hawalay se details k liye',
//                                 },
//                                 {
//                                     id: '1.3',
//                                     title: 'Available Subjects',
//                                     description:
//                                         'Available subject kay hawalay se details k liye',
//                                 },
//                                 {
//                                     id: '1.4',
//                                     title: 'Report an issue',
//                                     description: 'App mein issues k hawalay se',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '0.2': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Student, inn options mein se select karein. 👇`,
//                 },
//                 action: {
//                     button: 'Class 9-10',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '2.1',
//                                     title: 'Doubt Solve',
//                                     description: 'Doubt solve ki details k liye',
//                                 },
//                                 {
//                                     id: '2.2',
//                                     title: 'Maqsad sikkay',
//                                     description: 'Sikkay kay hawalay se details k liye',
//                                 },
//                                 {
//                                     id: '2.3',
//                                     title: 'Maqsad Course',
//                                     description:
//                                         'App mein course k hawalay se complete detail! 👇',
//                                 },
//                                 {
//                                     id: '2.4',
//                                     title: 'Report an issue',
//                                     description: 'App mein issues k hawalay se',
//                                 },
//                                 {
//                                     id: '2.5',
//                                     title: 'Others',
//                                     description: 'Koi aur issue k hawalay se',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '0.3': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Student, inn options mein se select karein. 👇`,
//                 },
//                 action: {
//                     button: 'Class 11-12',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '3.1',
//                                     title: 'Doubt Solve',
//                                     description: 'Doubt solve ki details k liye',
//                                 },
//                                 {
//                                     id: '3.2',
//                                     title: 'Maqsad sikkay',
//                                     description: 'Sikkay kay hawalay se details k liye',
//                                 },
//                                 {
//                                     id: '3.3',
//                                     title: 'Maqsad Course',
//                                     description:
//                                         'App mein course k hawalay se complete detail! 👇',
//                                 },
//                                 {
//                                     id: '3.4',
//                                     title: 'Report an issue',
//                                     description: 'App mein issues k hawalay se',
//                                 },
//                                 {
//                                     id: '3.5',
//                                     title: 'Others',
//                                     description: 'Koi aur issue k hawalay se',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '0.4': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `ECAT/MDCAT ki details k liye in options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'MDCAT/ECAT',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '4.1',
//                                     title: 'ECAT details?',
//                                     description: 'ECAT k hawalay se complete details',
//                                 },
//                                 {
//                                     id: '4.2',
//                                     title: 'MDCAT details?',
//                                     description: 'MDCAT k hawalay se complete details',
//                                 },
//                                 {
//                                     id: '4.3',
//                                     title: 'Promocode details',
//                                     description: 'Promocode use karne ka tareeqa',
//                                 },
//                                 {
//                                     id: '4.4',
//                                     title: 'Other issues',
//                                     description:
//                                         'Agar aap ka koi aur issue hai toh humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '0.5': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Student, inn options mein se select karein. 👇`,
//                 },
//                 action: {
//                     button: 'Other',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '5.1',
//                                     title: 'App kaise use karein?',
//                                     description: 'Maqsad app ko use karne ka tareeqa aur faiday',
//                                 },
//                                 {
//                                     id: '5.2',
//                                     title: 'Maqsad app features',
//                                     description: 'App mein kon se features available hain?',
//                                 },
//                                 {
//                                     id: '5.3',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '1.1': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Doubt solve ki details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Doubt Solve',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '1.1.1',
//                                     title: 'Doubt kaise poochoon?',
//                                     description: 'App mein question kaise poochoon?',
//                                 },
//                                 {
//                                     id: '1.1.2',
//                                     title: 'Upgrade DoubtSolve',
//                                     description: 'App mein doubt solve kaise upgrade karein?',
//                                 },
//                                 {
//                                     id: '1.1.3',
//                                     title: 'Wrong solution',
//                                     description: 'Sawal ka jawaab sahi nahi aaya',
//                                 },
//                                 {
//                                     id: '1.1.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '1.2': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Sikkay kay hawalay se details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Maqsad sikkay',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '1.2.1',
//                                     title: 'How to use sikkay',
//                                     description:
//                                         'Sikkay istemaal kar k feature khareednay ka tareeqa',
//                                 },
//                                 {
//                                     id: '1.2.2',
//                                     title: 'Mujhay aur sikkay chaiye',
//                                     description: 'App mein sikkay haasil karne ka tareeqa',
//                                 },
//                                 {
//                                     id: '1.2.3',
//                                     title: 'Sikkay referral',
//                                     description: 'Doston ko invite karein aur sikkay payein',
//                                 },
//                                 {
//                                     id: '1.2.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '1.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Student, Maqsad app se aap yeh subjects parhna saktay hain:
// 1. Maths
// 2. Physics
// 3. Chemistry
// 4. Biology`,
//             },
//         },
//     ],
//
//     '1.4': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `App mein issues k hawalay se inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Report an issue',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '1.4.1',
//                                     title: 'OTP issue',
//                                     description: 'Mujhe OTP nahi mil raha',
//                                 },
//                                 {
//                                     id: '1.4.2',
//                                     title: 'Doubt solve nai chal rha',
//                                     description: 'Main app mai doubt q nahi pooch paa raha',
//                                 },
//                                 {
//                                     id: '1.4.3',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//
//     '2.1': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Doubt solve ki details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Doubt Solve',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '2.1.1',
//                                     title: 'Doubt kaise poochoon?',
//                                     description: 'App mein question kaise poochoon?',
//                                 },
//                                 {
//                                     id: '2.1.2',
//                                     title: 'Upgrade DoubtSolve',
//                                     description: 'App mein doubt solve kaise upgrade karein?',
//                                 },
//                                 {
//                                     id: '2.1.3',
//                                     title: 'Wrong solution',
//                                     description: 'Sawal ka jawaab sahi nahi aaya',
//                                 },
//                                 {
//                                     id: '2.1.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '2.2': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Sikkay kay hawalay se details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Maqsad sikkay',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '2.2.1',
//                                     title: 'How to use sikkay',
//                                     description:
//                                         'Sikkay istemaal kar k feature khareednay ka tareeqa',
//                                 },
//                                 {
//                                     id: '2.2.2',
//                                     title: 'Mujhay aur sikkay chaiye',
//                                     description: 'App mein sikkay haasil karne ka tareeqa',
//                                 },
//                                 {
//                                     id: '2.2.3',
//                                     title: 'Sikkay referral',
//                                     description: 'Doston ko invite karein aur sikkay payein',
//                                 },
//                                 {
//                                     id: '2.2.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '2.4': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `App mein issues k hawalay se inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Report an issue',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '2.4.1',
//                                     title: 'OTP issue',
//                                     description: 'Mujhe OTP nahi mil raha',
//                                 },
//                                 {
//                                     id: '2.4.2',
//                                     title: 'Doubt solve nai chal rha',
//                                     description: 'Main app mai doubt q nahi pooch paa raha',
//                                 },
//                                 {
//                                     id: '2.4.3',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '2.5': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     '3.1': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Doubt solve ki details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Doubt Solve',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '3.1.1',
//                                     title: 'Doubt kaise poochoon?',
//                                     description: 'App mein question kaise poochoon?',
//                                 },
//                                 {
//                                     id: '3.1.2',
//                                     title: 'Upgrade DoubtSolve',
//                                     description: 'App mein doubt solve kaise upgrade karein?',
//                                 },
//                                 {
//                                     id: '3.1.3',
//                                     title: 'Wrong solution',
//                                     description: 'Sawal ka jawaab sahi nahi aaya',
//                                 },
//                                 {
//                                     id: '3.1.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '3.2': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `Sikkay kay hawalay se details k liye inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Maqsad sikkay',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '3.2.1',
//                                     title: 'How to use sikkay',
//                                     description:
//                                         'Sikkay istemaal kar k feature khareednay ka tareeqa',
//                                 },
//                                 {
//                                     id: '3.2.2',
//                                     title: 'Mujhay aur sikkay chaiye',
//                                     description: 'App mein sikkay haasil karne ka tareeqa',
//                                 },
//                                 {
//                                     id: '3.2.3',
//                                     title: 'Sikkay referral',
//                                     description: 'Doston ko invite karein aur sikkay payein',
//                                 },
//                                 {
//                                     id: '3.2.4',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '3.4': [
//         {
//             type: MessageType.INTERACTIVE,
//             interactive: {
//                 type: InteractiveType.LIST,
//                 body: {
//                     text: `App mein issues k hawalay se inn options mein se select karein! 👇`,
//                 },
//                 action: {
//                     button: 'Report an issue',
//                     sections: [
//                         {
//                             title: 'Ek option select karain',
//                             rows: [
//                                 {
//                                     id: '3.4.1',
//                                     title: 'OTP issue',
//                                     description: 'Mujhe OTP nahi mil raha',
//                                 },
//                                 {
//                                     id: '3.4.2',
//                                     title: 'Doubt solve nai chal rha',
//                                     description: 'Main app mai doubt q nahi pooch paa raha',
//                                 },
//                                 {
//                                     id: '3.4.3',
//                                     title: 'Other issue',
//                                     description:
//                                         'Agar aap ka koi aur issue hai tou humein detail mein batayein',
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             },
//         },
//     ],
//     '3.5': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '4.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Hello! 👋 Future Engineers!🧑‍🔬 Maqsad k ECAT program ki offerings ye hain:
//
//
// ALL subjects access (Chemistry, Physics, English, basic Maths, Advance Maths and IQ) 📚
// -Detailed video lectures
// -Complete guide for ECAT
// -Unlimited Doubt solve access
// -Complete Test feature access
// -University Grand tests preparation access (GIKI, FAST - NUCES , NUST, NED and UET)
//
// Discounted Price: Rs. 7,000/- (1 Year)
//
// ECAT Khareednay ka Tareeqa 👀: https://www.youtube.com/watch?v=4fRO-wlv94E
//
// ECAT se related App mein guidance 👀: https://www.youtube.com/watch?v=edXq_6ATCvg
//
// OR
// please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556
// Umer Hameed Khan ✌️`,
//             },
//         },
//     ],
//     '4.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Hello! 👋 Future doctors! 👨‍⚕️Maqsad k MDCAT program ki offerings ye hain:
//
//
// ALL subjects (English, Physics, Chemistry, Biology and Logical Reasoning) 📚
// -Detailed video lectures
// -Complete guide for MDCAT
// -Unlimited Doubt solve access
// -Complete Tests feature and Grand tests preparation
//
// Discounted Price: Rs. 7,000/-
//
// Mdcat se related App mein guidance 👀: https://www.youtube.com/watch?v=obfkwdX9DC8
// MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4
//
// OR
//
// please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
//
// 03242996556
// Umer Hameed Khan ✌️`,
//             },
//         },
//     ],
//     '4.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂
//
// Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
//             },
//         },
//     ],
//     '4.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     '5.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad App ko use karnay ka tareeqa jannay k liye aap in video ko dekhein aap ko help hogi.
//
// How to Login and Use the Maqsad App👀:https://www.youtube.com/watch?v=CyVgjCiqPr8
// Maqsad se parhai karne ka faida👀:https://www.youtube.com/watch?v=7KgL0PIcTWo
//
// Mazeed aap k aur koi sawal hai tou aap humse pooch saktay hai.✌️`,
//             },
//         },
//     ],
//     '5.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad app mai ye features available hain:😊
//
// 1- Course bundle
// 2- DoubtSolve
// 3- MDCAT/ECAT
// 4- Scientific calculator`,
//             },
//         },
//     ],
//     '5.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     '1.1.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap doubtsolve se koi bhi Math, Physics, Chemistry ya Biology ka question pooch sakte hain.✌️
//
// Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊
//
// Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
//             },
//         },
//     ],
//     '1.1.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Apne DoubtSolve ko upgrade karne k liye aap ye payment option istemaal kar sakte hain. Aap please payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humein pooch sakte hain.🙂
//
// Packages:
// 1 month - RS. 250
// 3 months - RS. 500
// 6 months - RS. 1000
//
// Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.
//
// 03242996556
// Umer Hameed Khan
//
// Doubtsolve bundle Khareednay Ka tareeqa is video mein dekhein👀: https://www.youtube.com/watch?v=Q-0VT0spdRU&feature=youtu.be
//
// App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs`,
//             },
//         },
//     ],
//     '1.1.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.
//
// Mazeed jannay kai liye yeh video dekhein👀: https://www.youtube.com/shorts/yRa5COAXamo`,
//             },
//         },
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 Aap "Ye mera jawab nahi hai" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚
//
// Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/shorts/iACIVrI7qL0`,
//             },
//         },
//     ],
//     '1.1.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '1.2.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad say earn kiye hue sikkay aap doubt solve aur course khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯
//
// Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
//             },
//         },
//     ],
//     '1.2.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay earn karnay k 3 tareeqay hain👀!
//
// 1️⃣"Menu" k option mei jayein aur "Edit profile" mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!
//
// 2️⃣.Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!
//
// 3️⃣.Friends ko App refer karein aur 💯 sikkay haasil karein.
//
// Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE
//
// App mein available sikkay dekhne ka link: https://maqsad.page.link/maqsadSikkayPage`,
//             },
//         },
//     ],
//     '1.2.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay friend ko refer karnay k liye "Menu" k option mein jae aur "Share Maqsad" k option per click karein wahan di hue instruction ko follow karkay apnay friend ko refer karein aur 💯sikkay haasil karein.🙌
// Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅
//
// Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
//             },
//         },
//     ],
//     '1.2.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '1.4.1': [],
//
//     '1.4.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya
//
// App mein registered number dekhnay ka tareeqa 👀: https://www.youtube.com/shorts/Rz4jO1lrULk`,
//             },
//         },
//     ],
//
//     '1.4.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     '2.1.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap doubtsolve se koi bhi Math, Physics, Chemistry ya Biology ka question pooch sakte hain.✌️
//
// Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊
//
// Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
//             },
//         },
//     ],
//     '2.1.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Apne DoubtSolve ko upgrade karne k liye aap ye payment option istemaal kar sakte hain. Aap please payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humein pooch sakte hain.🙂
//
// Packages:
// 1 month - RS. 250
// 3 months - RS. 500
// 6 months - RS. 1000
//
// Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.
//
// 03242996556
// Umer Hameed Khan
//
// Doubtsolve bundle Khareednay Ka tareeqa is video mein dekhein👀: https://www.youtube.com/watch?v=Q-0VT0spdRU&feature=youtu.be
//
// App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs`,
//             },
//         },
//     ],
//     '2.1.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.
//
// Mazeed jannay kai liye yeh video dekhein👀: https://www.youtube.com/shorts/yRa5COAXamo`,
//             },
//         },
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 Aap "Ye mera jawab nahi hai" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚
//
// Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/shorts/iACIVrI7qL0`,
//             },
//         },
//     ],
//     '2.1.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '2.2.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad say earn kiye hue sikkay aap doubt solve aur course khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯
//
// Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
//             },
//         },
//     ],
//     '2.2.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay earn karnay k 3 tareeqay hain👀!
//
// 1️⃣"Menu" k option mei jayein aur "Edit profile" mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!
//
// 2️⃣.Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!
//
// 3️⃣.Friends ko App refer karein aur 💯 sikkay haasil karein.
//
// Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE
//
// App mein available sikkay dekhne ka link: https://maqsad.page.link/maqsadSikkayPage`,
//             },
//         },
//     ],
//     '2.2.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay friend ko refer karnay k liye "Menu" k option mein jae aur "Share Maqsad" k option per click karein wahan di hue instruction ko follow karkay apnay friend ko refer karein aur 💯sikkay haasil karein.🙌
// Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅
//
// Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
//             },
//         },
//     ],
//     '2.2.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '2.4.1': [],
//
//     '2.4.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya
//
// App mein registered number dekhnay ka tareeqa 👀: https://www.youtube.com/shorts/Rz4jO1lrULk`,
//             },
//         },
//     ],
//
//     '2.4.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     '3.1.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap doubtsolve se koi bhi Math, Physics, Chemistry ya Biology ka question pooch sakte hain.✌️
//
// Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊
//
// Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
//             },
//         },
//     ],
//     '3.1.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Apne DoubtSolve ko upgrade karne k liye aap ye payment option istemaal kar sakte hain. Aap please payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humein pooch sakte hain.🙂
//
// Packages:
// 1 month - RS. 250
// 3 months - RS. 500
// 6 months - RS. 1000
//
// Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.
//
// 03242996556
// Umer Hameed Khan
//
// Doubtsolve bundle Khareednay Ka tareeqa is video mein dekhein👀: https://www.youtube.com/watch?v=Q-0VT0spdRU&feature=youtu.be
//
// App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs`,
//             },
//         },
//     ],
//     '3.1.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.
//
// Mazeed jannay kai liye yeh video dekhein👀: https://www.youtube.com/shorts/yRa5COAXamo`,
//             },
//         },
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 Aap "Ye mera jawab nahi hai" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚
//
// Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/shorts/iACIVrI7qL0`,
//             },
//         },
//     ],
//     '3.1.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '3.2.1': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad say earn kiye hue sikkay aap doubt solve aur course khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯
//
// Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
//             },
//         },
//     ],
//     '3.2.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay earn karnay k 3 tareeqay hain👀!
//
// 1️⃣"Menu" k option mei jayein aur "Edit profile" mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!
//
// 2️⃣.Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!
//
// 3️⃣.Friends ko App refer karein aur 💯 sikkay haasil karein.
//
// Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE
//
// App mein available sikkay dekhne ka link: https://maqsad.page.link/maqsadSikkayPage`,
//             },
//         },
//     ],
//     '3.2.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maqsad sikkay friend ko refer karnay k liye "Menu" k option mein jae aur "Share Maqsad" k option per click karein wahan di hue instruction ko follow karkay apnay friend ko refer karein aur 💯sikkay haasil karein.🙌
// Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅
//
// Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
//             },
//         },
//     ],
//     '3.2.4': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//     '3.4.1': [],
//
//     '3.4.2': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya
//
// App mein registered number dekhnay ka tareeqa 👀: https://www.youtube.com/shorts/Rz4jO1lrULk`,
//             },
//         },
//     ],
//
//     '3.4.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Kindly apna issue batayein`,
//             },
//         },
//     ],
//
//     solved: [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Student, aap ki studies mai dobara help karnay mai khushi hogi😊📚
// Maqsad se rabta karnay ka shukriya🙏Apna khayal rakhein. Allah hafiz!😊`,
//             },
//         },
//     ],
// };

// export const requestAgentStageMessages: MessageMap = {
//     '2.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Please wait, aap ki details verify karke aapko jald guide kar rahay hain`,
//             },
//         },
//     ],
//     '3.3': [
//         {
//             type: MessageType.TEXT,
//             text: {
//                 body: `Please wait, aap ki details verify karke aapko jald guide kar rahay hain`,
//             },
//         },
//     ],
// };
