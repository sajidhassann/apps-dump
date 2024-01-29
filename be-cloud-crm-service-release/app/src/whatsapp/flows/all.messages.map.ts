import {
  InteractiveType,
  IWhatsAppReplyMessage,
  MessageType,
} from '../models/whatsAppReplyMessage';

const updateButtonText = (
  message: IWhatsAppReplyMessage,
  button: string,
): IWhatsAppReplyMessage =>
  ({
    ...message,
    interactive: {
      ...message.interactive,
      action: {
        ...message.interactive?.action,
        button,
      },
    },
  } as IWhatsAppReplyMessage);

const B: IWhatsAppReplyMessage = {
  type: MessageType.INTERACTIVE,
  interactive: {
    type: InteractiveType.LIST,
    body: {
      text: `Student, inn options mein se select karein. `,
    },
    action: {
      button: 'Class 1-8',
      sections: [
        {
          title: 'Ek option select karain',
          rows: [
            {
              id: '',
              title: 'DoubtSolve 📚',
              description: 'DoubtSolve k hawalay se details k liye',
            },
            {
              id: '',
              title: 'Maqsad sikkay🙌',
              description: 'Sikkay k hawalay se details k liye',
            },
            {
              id: '',
              title: 'Available Subjects📖',
              description: 'Available subject k hawalay se details k liye',
            },
            {
              id: '',
              title: 'Report an issue🐛',
              description: 'App mein issues k hawalay se',
            },
            {
              id: '',
              title: 'Other',
              description: 'Koi aur issue k hawalay se',
            },
          ],
        },
      ],
    },
  },
};
export const allMessagesMap: Record<string, IWhatsAppReplyMessage> = {
  A: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Assalam-u-alaikum Student👋,
Maqsad say rabta karnay ke liye Shukriya!😇 
Aap please apni class k according inn 👇 options mai se ek number select karein, takeh aap ko behtar guidance provide ki jae.`,
      },
      action: {
        button: 'Main Menu',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Class 1-8',
                description: 'Class 1-8 k hawalay se complete details',
              },
              {
                id: '',
                title: 'Class 9-12',
                description: 'Class 9-12 k hawalay se complete details',
              },
              {
                id: '',
                title: 'MDCAT/ECAT',
                description: 'ECAT/MDCAT k hawalay se complete details',
              },
              // {
              //   id: '',
              //   title: 'MDCAT Re-take Offer',
              //   description:
              //     'MDCAT Re-take bundle course k hawalay se complete details🩺',
              // },
              {
                id: '',
                title: 'BCAT - IBA/LUMS',
                description:
                  'BCAT ki details k liye in options mein se select karein!',
              },
              {
                id: '',
                title: 'Experience Centre (KHI)',
                description: 'Experience Centre k hawalay se details🏫',
              },
              // {
              //   id: '',
              //   title: 'Dhamakaydaar Offer',
              //   description: 'Dhamakaydaar offer k hawalay se details',
              // },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  B,
  C: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Kindly apna board confirm karein. 👇`,
      },
      action: {
        button: 'Class 9-12',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Sindh',
                description: 'Sindh Board k hawalay se complete details',
              },
              {
                id: '',
                title: 'Punjab',
                description: 'Punjab Board k hawalay se complete details',
              },
              {
                id: '',
                title: 'Balochistan',
                description: 'Balochistan Board k hawalay se complete details',
              },
              {
                id: '',
                title: 'Federal',
                description: 'Federal Board k hawalay se complete details',
              },
              {
                id: '',
                title: 'KPK',
                description: 'KPK Board k hawalay se complete details',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  D: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `ECAT/MDCAT ki details k liye in options mein se select karein! 👇`,
      },
      action: {
        button: 'MDCAT/ECAT',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'ECAT details?',
                description: 'ECAT course k hawalay se complete details👇',
              },
              {
                id: '',
                title: 'MDCAT details 2024',
                description:
                  'MDCAT bundle 2024 course k hawalay se complete details🩺',
              },
              {
                id: '',
                title: 'Promocode details',
                description: 'Promocode use karne ka tareeqa',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  E: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Student, inn options mein se select karein. 👇`,
      },
      action: {
        button: 'Other',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'App kaise use karein?',
                description: 'Maqsad app ko use karne ka tareeqa aur faiday🎓',
              },
              {
                id: '',
                title: 'Maqsad app features',
                description: 'App mein kon se features available hain?🙌',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  F: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Doubt solve ki details k liye inn options mein se select karein! 👇`,
      },
      action: {
        button: 'DoubtSolve',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Doubt kaise poochoon?',
                description: 'App mein question kaise poochoon?🔍',
              },
              {
                id: '',
                title: 'Upgrade DoubtSolve',
                description: 'App mein doubt solve kaise upgrade karein?📚',
              },
              {
                id: '',
                title: 'Wrong solution',
                description: 'Sawal ka jawaab sahi nahi aaya😟',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  G: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Sikkay kay hawalay se details k liye inn options mein se select karein! 👇`,
      },
      action: {
        button: 'Maqsad sikkay🙌',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'How to use sikkay',
                description:
                  'Sikkay istemaal kar k feature khareednay ka tareeqa🙌',
              },
              {
                id: '',
                title: 'Mujhay aur sikkay chaiye',
                description: 'App mein sikkay haasil karne ka tareeqa🙌',
              },
              {
                id: '',
                title: 'Sikkay referral',
                description: 'Doston ko invite karein aur sikkay payein👥',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  H: {
    type: MessageType.TEXT,
    text: {
      body: `Students!👋Aap doubtsolve se koi bhi Math ka question pooch sakte hain.✌️

Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊

Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
    },
  },
  I: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `App mein issues k hawalay se inn options mein se select karein! 👇`,
      },
      action: {
        button: 'Report an issue🐛',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'OTP issue',
                description: 'Mujhe OTP nahi mil raha📵',
              },
              {
                id: '',
                title: 'Doubt solve nai chal rha',
                description: 'Main app mai doubt q nahi pooch paa raha🤔',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  J: {
    type: MessageType.TEXT,
    text: {
      body: `Aap doubtsolve se koi bhi Math, Physics, Chemistry ya Biology ka question pooch sakte hain.✌️

Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊

Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
    },
  },
  K: {
    type: MessageType.TEXT,
    text: {
      body: `Apne DoubtSolve ko upgrade karne k liye aap ye payment option istemaal kar sakte hain. Aap please payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humein pooch sakte hain.😊

Packages:
1 month - RS. 750
3 months - RS. 1500
6 months - RS. 3000

Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.

03242996556
Umer Hameed Khan

Doubtsolve bundle Khareednay Ka tareeqa is video mein dekhein👀: https://www.youtube.com/watch?v=MdQ9WyWtyqI`,
    },
  },
  L: {
    type: MessageType.TEXT,
    text: {
      body: `Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.

Mazeed jannay kai liye yeh video dekhein👀: https://www.youtube.com/shorts/yRa5COAXamo`,
    },
  },
  M: {
    type: MessageType.TEXT,
    text: {
      body: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 Aap "Ye mera jawab nahi hai" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚

Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/shorts/iACIVrI7qL0`,
    },
  },
  N: updateButtonText(B, 'Punjab'),
  O: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad say earn kiye hue sikkay aap doubt solve aur Maqsad course khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯

Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
    },
  },
  P: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad sikkay earn karnay k 3 tareeqay hain👀!

1️⃣“Menu” k option mei jayein aur “Edit profile” mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!

2️⃣.Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!

3️⃣.Friends ko App refer karein aur 💯 sikkay haasil karein.

Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
    },
  },
  Q: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad sikkay friend ko refer karnay k liye “Menu” k option mein jae aur “Share Maqsad” k option per click karein wahan di hue instruction ko follow karkay apnay friend ko refer karein aur 💯sikkay haasil karein.🙌
Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅

Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
    },
  },
  R: {
    type: MessageType.TEXT,
    text: {
      body: `Maazrat aap ka App per registered number aur WhatsApp number same nahi hai is liye aap diye gaye steps try karein aur OTP haasil karein.

1 - Apnay phone ka flight/airplane mode on and off karein. 📲
2 - Kindly aap kisi behtar jaga per jaein jahan signals proper aa rahay hou. 📶
3 - Apna input kiya hua number double check karlein. 🤳
4 - 10-15 minutes wait karein aur dubara OTP request karein! 🕒

Aur agar in steps k baad bhi OTP nahi aye toh humein batayein.`,
    },
  },
  OTP: {
    type: MessageType.TEXT,
    text: {
      body: `Maazrat aap ka App per registered number aur WhatsApp number same nahi hai is liye aap diye gaye steps try karein aur OTP haasil karein.

1 - Apnay phone ka flight/airplane mode on and off karein. 📲
2 - Kindly aap kisi behtar jaga per jaein jahan signals proper aa rahay hou. 📶
3 - Apna input kiya hua number double check karlein. 🤳
4 - 10-15 minutes wait karein aur dubara OTP request karein! 🕒

Aur agar in steps k baad bhi OTP nahi aye toh humein batayein.`,
    },
  },
  S: {
    type: MessageType.TEXT,
    text: {
      body: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya

App mein registered number dekhnay ka tareeqa 👀: https://www.youtube.com/shorts/Rz4jO1lrULk`,
    },
  },
  T: {
    type: MessageType.TEXT,
    text: {
      body: `Agar aap ka koi aur Sawaal hai tou humein batayein😊`,
    },
  },
  U: {
    type: MessageType.TEXT,
    text: {
      body: `Student, Maqsad app se aap yeh subjects parh saktay hain:
1. Maths
2. Physics
3. Chemistry
4. Biology`,
    },
  },
  V: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Student, inn options mein se select karein. 👇`,
      },
      action: {
        button: 'Sindh',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Course Details📖',
                description: 'App mein course k hawalay se complete detail!',
              },
              {
                id: '',
                title: 'DoubtSolve',
                description: 'DoubtSolve kay hawalay se details k liye',
              },
              {
                id: '',
                title: 'Maqsad sikkay🙌',
                description: 'Sikkay kay hawalay se details k liye',
              },
              {
                id: '',
                title: 'Available Subjects📖',
                description: 'Available subject kay hawalay se details k liye',
              },
              {
                id: '',
                title: 'Report an issue🐛',
                description: 'App mein issues k hawalay se',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  W: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Student, inn options mein se select karein. `,
      },
      action: {
        button: 'Course Details📖',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Course details 9-10',
                description: 'Class 9 aur 10 ki course ki detail📚',
              },
              {
                id: '',
                title: 'Course details 11-12',
                description: 'Class 11 aur 12 ki course ki detail📚',
              },
              {
                id: '',
                title: 'Course Upgrade',
                description: 'Maqsad App ka course upgrade karne ka tareeqa📚',
              },
            ],
          },
        ],
      },
    },
  },
  X: {
    type: MessageType.TEXT,
    text: {
      body: `Course bundle ki offerings yeh hain: 😊
1.  Weekly live sessions
2.  Detailed video lectures
3.  Tests (MCQs)
4.  Past papers
5.  Notes
6.  Doubt solve
7.  Whatsapp Groups with 1:1 teacher guidance
Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I
Packages available:
Single Subject till end of board exams - Rs. 3000
All Subjects till end of board exams - Rs. 6000
Course bundle Khareednay ka Tareeqa👀: https://youtu.be/U3tAZ8UHe50`,
    },
  },
  Y: {
    type: MessageType.TEXT,
    text: {
      body: `Course bundle ki offerings yeh hain: 😊
1. Weekly live sessions
2.  Detailed video lectures
3.  Tests (MCQs)
4.  Past papers
5.  Notes
6.  Doubt solve
7.  Whatsapp Groups with 1:1 teacher guidance
Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I
Packages available:
Single Subject till end of board exams - Rs. 3000
All Subjects till end of board exams - Rs. 6000
Course bundle Khareednay ka Tareeqa👀: https://youtu.be/U3tAZ8UHe50`,
    },
  },
  Z: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad app k course bundle ko khareednay k liye ye video dekhein 👀https://youtu.be/U3tAZ8UHe50
OR
Please transfer the amount to given bank details or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! Bank: HBL Account Name: Maqsad private Limited IBAN:PK28HABB0025257000617803
Agar aap ko payment say related koi sawaal ho toh kindly humein batayein! 😊`,
    },
  },
  AA: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Student, inn options mein se select karein. `,
      },
      action: {
        button: 'Class 9-12',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Course Journey',
                description: 'App mein course k hawalay se complete detail! ',
              },
              {
                id: '',
                title: 'Course Upgrade📚',
                description: 'Maqsad App ka course upgrade karne ka tareeqa',
              },
              {
                id: '',
                title: 'DoubtSolve',
                description: 'DoubtSolve kay hawalay se details k liye',
              },
              {
                id: '',
                title: 'Maqsad sikkay🙌',
                description: 'Sikkay kay hawalay se details k liye',
              },
              {
                id: '',
                title: 'Report an issue🐛',
                description: 'App mein issues k hawalay se',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  AB: {
    type: MessageType.TEXT,
    text: {
      body: `Hello! 👋 Future Engineers!🧑‍🔬 Maqsad k ECAT program ki offerings ye hain:


ALL subjects access (Chemistry, Physics, English, basic Maths, Advance Maths and IQ) 📚
-Detailed video lectures
-Complete guide for ECAT
-Unlimited Doubt solve access
-Complete Test feature access
-University Grand tests preparation access (GIKI, FAST - NUCES , NUST, NED and UET)

Discounted Price: Rs. 7,000/- (1 Year)

ECAT Khareednay ka Tareeqa 👀: https://www.youtube.com/watch?v=4fRO-wlv94E

ECAT se related App mein guidance 👀: https://www.youtube.com/watch?v=edXq_6ATCvg

OR
please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556
Umer Hameed Khan ✌️`,
    },
  },
  AC: {
    type: MessageType.TEXT,
    text: {
      body: `Hello! 👋 Future doctors! 👨‍⚕️Maqsad k MDCAT program ki offerings ye hain:

-ALL subjects (English, Physics, Chemistry, Biology and Logical Reasoning) 📚
-Detailed video lectures
-Complete guide for MDCAT
-Unlimited Doubt solve access
-Complete Tests feature and Grand tests preparation
      
Discounted Price: Rs. 10,000/- (Till end of 2024 Exams)
      
Mdcat se related App mein guidance 👀: https://www.youtube.com/watch?v=obfkwdX9DC8
      
MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4
      
OR
Please transfer the amount to given bank details or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
Bank: HBL
Account Name: Maqsad private Limited
IBAN:PK28HABB0025257000617803`,
    },
  },
  AD: {
    type: MessageType.TEXT,
    text: {
      body: `App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂

Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
    },
  },
  AE: updateButtonText(B, 'Class 9-12'),
  AF: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad App ko use karnay ka tareeqa jannay k liye aap in video ko dekhein aap ko help hogi.

How to Login and Use the Maqsad App👀:https://www.youtube.com/watch?v=CyVgjCiqPr8
Maqsad se parhai karne ka faida👀:https://www.youtube.com/watch?v=7KgL0PIcTWo

Mazeed aap k aur koi sawal hai tou aap humse pooch saktay hai.✌️`,
    },
  },
  AG: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad app mai ye features available hain:😊

1- Course bundle
2- DoubtSolve
3- MDCAT/ECAT
4- Scientific calculator`,
    },
  },
  AH: updateButtonText(B, 'Balochistan'),
  AI: updateButtonText(B, 'Federal'),
  AJ: updateButtonText(B, 'KPK'),
  AK: updateButtonText(B, 'Other'),
  AL: {
    type: MessageType.TEXT,
    text: {
      body: `Student, Maqsad app se aap yeh subjects parh saktay hain:

1. Maths
2. Physics
3. Chemistry
4. Biology
5. All subjects
6. Compulsory subjects`,
    },
  },
  AM: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad app k course bundle ko khareednay k liye ye video dekhein 👀https://youtu.be/U3tAZ8UHe50
OR
Please transfer the amount to given bank details or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! Bank: HBL Account Name: Maqsad private Limited IBAN:PK28HABB0025257000617803
Agar aap ko payment say related koi sawaal ho toh kindly humein batayein! 😊`,
    },
  },
  AN: {
    type: MessageType.TEXT,
    text: {
      body: `Course bundle ki offerings yeh hain: 😊
1.  Weekly live sessions
2.  Detailed video lectures
3.  Tests (MCQs)
4.  Past papers
5.  Notes
6.  Doubt solve
7.  Whatsapp Groups with 1:1 teacher guidance
Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I
Packages available:
Single Subject till end of board exams - Rs. 3000
All Subjects till end of board exams - Rs. 6000
Course bundle Khareednay ka Tareeqa👀: https://youtu.be/U3tAZ8UHe50`,
    },
  },
  AO: {
    type: MessageType.TEXT,
    text: {
      body: `Course bundle ki offerings yeh hain: 😊
1.  Weekly live sessions
2.  Detailed video lectures
3.  Tests (MCQs)
4.  Past papers
5.  Notes
6.  Doubt solve
7.  Whatsapp Groups with 1:1 teacher guidance
Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I
Packages available:
Single Subject till end of board exams - Rs. 3000
All Subjects till end of board exams - Rs. 6000
Course bundle Khareednay ka Tareeqa👀: https://youtu.be/U3tAZ8UHe50`,
    },
  },
  AP: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `MDCAT Re-take bundle course k hawalay se complete details🩺`,
      },
      action: {
        button: 'MDCAT Re-take Offer',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'MDCAT Re-take bundle',
                description:
                  'MDCAT Re-take bundle course k hawalay se complete details🩺',
              },
              {
                id: '',
                title: 'Promocode details',
                description: 'Promocode use karne ka tareeqa',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  AQ: {
    type: MessageType.TEXT,
    text: {
      body: `Assalam-o-alaikum,
Aapke time ke liye bohot shukriya!
      
Maqsad MDCAT Reconduct Bundle se faida uthaein aur apne test ki mukammal revision karein⭐
      
Iss bundle mein apko milega:
✅15 day reconduct revision plan
✅10k+ MCQs to practice
✅Live past paper sessions with expert teachers
✅Video lectures for all subjects
✅Unlimited DoubtSolve
      
Maqsad ke 92% students apne MDCAT exam mein successful hogaye hain tou aap bhi kaamiyab hone ke liye abhi payment karke apni seat secure karein.💯
      
Tou abhi form fill kar k khud ko registered karein yaad rahay k seats bohot limited hai.
      
Registration form: https://forms.gle/ZBsiBLHWphJRHtEi8
      
Premium offer Rs-5000/- only
      
MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4

Registration kay liye humarey is account par payment kar kay screenshot share karen. yaad rahey ye offer sirf limited slots kay liye hai.
Bank: Habib Bank limited
Account title: Maqsad Private limited
IBAN: PK28HABB0025257000617803`,
    },
  },
  AR: {
    type: MessageType.TEXT,
    text: {
      body: `App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂

Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
    },
  },
  AS: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Experience Centre k hawalay se details🏫`,
      },
      action: {
        button: 'Experience Centre KH',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Fees/admission ki detail',
                description:
                  'Maqsad Experience Centre ki fees aur admission k hawalay se details? 💡',
              },
              {
                id: '',
                title: 'Exp Centre ki location',
                description:
                  'Maqsad Experience Centre ki location aur address? 📍',
              },
              {
                id: '',
                title: 'Admission details',
                description:
                  'Maqsad Exp Centre mein konsi classes k liye admission le saktay hain? 🏫',
              },
              {
                id: '',
                title: 'Centre timings',
                description:
                  'Maqsad Experience Centre ki timings kiya hain? ⏱️',
              },
              {
                id: '',
                title: 'Early bird offer',
                description:
                  'Early bird discount for Class 9th to 12th and ECAT/MDCAT students. 🙌',
              },
              {
                id: '',
                title: 'Friends Referral',
                description:
                  'Maqsad Exp Centre mein friends ko refer kar k discount haasil karein. 👥',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  AT: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad Experience Centre mein admission k baare mai poochnay ka Shukriya!

Maqsad laya hai students k liye behtreen Experience Center, jaha aap Maqsad k highly qualified teachers se classes le sakengay.

Jis mein included hain:

-Monthly tests aur mock Exams 📝
-Monthly performance reports 📰
-Past-paper practice 📜
-1:1 teacher support 👨‍🏫
-100% syllabus completion 💯
-Career counselling 💼

Aap ko jald he Maqsad team ki taraf se call receive hogi jis mai aap ko complete details admission and fee ki details k related guidance di jaye gi.`,
    },
  },
  AU: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad experience center ki location Karachi k area Gulshan-e-Iqbal mai hai.

📍Address: Plot C-7 Gulshan-e-Iqbal Block-7, Karachi

📍Google location: https://maps.app.goo.gl/ChCenHky5FRY3iwEA`,
    },
  },
  AV: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad laya hai matric and intermediate students k liye behtreen experience center jis mein class 9-12 and Mdcat/Ecat k students admission le saktay hain. 📖

Form link for admission: https://forms.gle/qiqsjeh3jfjuonpY8`,
    },
  },
  AW: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad Experience centre ki timing 3pm to 9pm hai jou different classes k according slots mein available hogi.⏱️

Mazeed aap ko class ke according guide kiya jayega.`,
    },
  },
  AX: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad Experience Centre ka early bird discount class 9 to 12 aur Mdcat/Ecat k students k liye hai. 😊

Aap ko jald he Maqsad team ki taraf se call receive hogi jis mai aap ko complete details batayi jaegi Early bird discount se related.`,
    },
  },
  AY: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad Experience centre students ko discount offer kar raha admission k liye jis mein aap apne friends ko experience Centre ka refer kar k admission k liye layein aur discounted price mein experience centre mein studies karein.😊

Friends referral ki complete guidance k liye aap ko humaari team ki taraf se jald hee call aa jaegi.`,
    },
  },
  AZ: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `Dhamakaydaar offer k hawalay se details`,
      },
      action: {
        button: 'Dhamakaydaar Offer',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'Dhamaaka offer for 9-10',
                description: 'Class 9-10 ki Dhamaaka offer ki details🙌',
              },
              {
                id: '',
                title: 'Dhamaaka offer for 11-12',
                description: 'Class 11-12 ki Dhamaaka offer ki details🙌',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  BA: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad App k dhamaka offer bundle ko aaj hee discounted price mein khareedein aur early bird discount avail karein! ✌️

Course bundle ki offerings yeh hai: 😊
1- Detailed video lectures
2- Tests (MCQs)
3- Weekly Youtube Live Sessions
4- Past papers
5- Notes
6- Unlimited Doubt solve

Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I

Early bird discounted price for complete bundle till exams: Rs.6,000/-`,
    },
  },
  BB: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad App k dhamaka offer bundle ko aaj hee discounted price mein khareedein aur early bird discount avail karein! ✌️

Course bundle ki offerings yeh hai: 😊
1- Detailed video lectures
2- Tests (MCQs)
3- Weekly Youtube Live Sessions
4- Past papers
5- Notes
6- Unlimited Doubt solve

Complete course ki guidance 👀:https://www.youtube.com/watch?v=GXyXMD4yM0I

Early bird discounted price for complete bundle till exams: Rs.6,000/-`,
    },
  },
  BC: {
    type: MessageType.INTERACTIVE,
    interactive: {
      type: InteractiveType.LIST,
      body: {
        text: `BCAT ki details k liye in options mein se select karein!`,
      },
      action: {
        button: 'BCAT Details',
        sections: [
          {
            title: 'Ek option select karain',
            rows: [
              {
                id: '',
                title: 'BCAT details?',
                description: 'BCAT course k hawalay se complete details 👨‍💼',
              },
              {
                id: '',
                title: 'Promocode details',
                description: 'Promocode use karne ka tareeqa 😊',
              },
              {
                id: '',
                title: 'University test info ',
                description: 'BCAT bundle kis university k liye hai? 🏛️',
              },
              {
                id: '',
                title: 'Other',
                description: 'Koi aur issue k hawalay se',
              },
            ],
          },
        ],
      },
    },
  },
  BD: {
    type: MessageType.TEXT,
    text: {
      body: `Hello! 👋 Future Entrepreneur!👨‍💼
Maqsad k BCAT program ki offerings ye hain:

-English and Maths Subject complete learning 📚
-Detailed Guided series for BCAT
-Weekly lives classes with expert teachers 📔
-Unlimited Doubt solve access for MATHS
-Complete diagnostic and topical test feature access for learning
-University Grand tests preparation access (IBA and LUMS)

Tou abhi form fill kar k Maqsad BCAT 2024 batch me register karein: https://forms.gle/wWb1o7PyRRWsULzL6

Discounted Price: Rs.7000 for 1 Year

BCAT se related App mein guidance 👀: https://links.maqsad.io/qm77jpa94pe`,
    },
  },
  BE: {
    type: MessageType.TEXT,
    text: {
      body: `BCAT Khareednay ka Tareeqa 👀: https://www.youtube.com/shorts/CgNtESI4Y5g

OR

Please transfer RS.7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
0324-2996556
Umer hameed khan ✌️`,
    },
  },
  BF: {
    type: MessageType.TEXT,
    text: {
      body: `App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂
Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
    },
  },
  BG: {
    type: MessageType.TEXT,
    text: {
      body: `Maqsad BCAT bundle IBA aur LUMS k entry tests ki preparation k liye hai.`,
    },
  },

  solved: {
    type: MessageType.TEXT,
    text: {
      body: `Student, aap ki studies mai dobara help karnay mai khushi hogi😊📚
Maqsad se rabta karnay ka shukriya🙏Apna khayal rakhein. Allah hafiz!😊`,
    },
  },
};
