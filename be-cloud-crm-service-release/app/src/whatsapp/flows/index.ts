import { User } from 'src/models/user.model';
import {
  InteractiveType,
  IWhatsAppReplyMessage,
  MessageType,
} from '../models/whatsAppReplyMessage';
import { allMessagesMap } from './all.messages.map';
// import * as fs from 'fs';

export const endConversationMessage =
  'Thank you for contacting Maqsad. Apna khayal rakhiey ga 🙌 Allah Hafiz';

type MessageMap = Record<string, IWhatsAppReplyMessage[]>;

export const ticketSolvedStages = ['solved'].reduce(
  (dict: Record<string, boolean>, elem) => {
    dict[elem] = true;
    return dict;
  },
  {},
);

// export const requestAgentStages: { [p: string]: boolean } = Object.values(
//   chatBotMessageMap,
// )
//   .flat()
//   .reduce(
//     (val: string[], item) => {
//       val.push(
//         ...(item.interactive?.action?.sections?.[0].rows
//           .map((row) => row.id)
//           .filter((id) => !chatBotMessageMap[id]) ??
//           item.interactive?.action?.buttons
//             ?.map((button) => button.reply.id)
//             .filter((id) => !chatBotMessageMap[id]) ??
//           []),
//       );
//       return val;
//     },
//     ['agent'],
//   )
//   .reduce((dict, elem) => {
//     dict[elem] = true;
//     return dict;
//   }, {});

export const requestAgentStages = ['agent'].reduce(
  (dict: Record<string, boolean>, elem) => {
    dict[elem] = true;
    return dict;
  },
  {},
);

export const requestAgentStageMessages: MessageMap = [''].reduce(
  (dict, elem) => {
    dict[elem] = [
      {
        type: MessageType.TEXT,
        text: {
          body: `Agar aap ka koi aur Sawaal hai tou humein batayein`,
        },
      },
    ];
    return dict;
  },
  {},
);

export const theBoysNumber = [
  '923009246956',
  '923350352198',
  '923482498343',
  '923331244006',
  '923102759998',
  '923330387860',
  '923002872088',
  '923302872088',
  '923253630543',
].reduce((dict: Record<string, boolean>, elem) => {
  dict[elem] = true;
  return dict;
}, {});

export const promoBundleMessages = [
  'Maqsad Exam Bundles kya hain?',
  'Maqsad Exam Bundles ka kya fiada hai?',
  'Maqsad Exam Bundle ki price kya hai?',
].reduce((map: MessageMap, str) => {
  map[str] = [
    {
      type: MessageType.TEXT,
      text: {
        body: `Student!👋 Ab Maqsad app kay SINDH BOARD complete exam bundle kay saath aap apnay exams me top kijiye! Iss me aapko mile ga
* Unlimited DoubtSolve 📚
* Tests jisme chapter wise, model papers aur past papers bhi hain. 📝
* App mein available tamaam subjects k video lectures ka access. 📖
* Expert teachers kay guess papers 🗞
* LIVE sessions jis me humare teachers aap ko exams ki tips, tricks aur stress management kay tareeqay bhi batayeingay 👨‍🏫
Ye sab aapko apne exams preapration tak milega sirf Rs. 3000/- mein. ✌️
Please transfer RS. 3000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
03242996556 Umer Hameed Khan`,
      },
    },
  ];
  return map;
}, {});

export const mdcatInfoMacroMessage = [
  'Can I learn more about the MDCAT Bundle?',
  'Is the MDCAT bundle aligned with the latest PMC guidelines?',
  'Can I pay with EasyPaisa or JazzCash?',
  'I saw this on Facebook...',
  'Mujhe MDCAT bundle ki details jaan ni hain',
].reduce((map: MessageMap, str) => {
  map[str] = [
    {
      type: MessageType.TEXT,
      text: {
        body: `Hello! 👋 Future doctors! 👨‍⚕️Maqsad k MDCAT program ki offerings ye hain:

-ALL subjects (English, Physics, Chemistry, Biology and Logical Reasoning) 📚
-Detailed video lectures
-Complete guide for MDCAT
-Unlimited Doubt solve access
-Complete Tests feature and Grand tests preparation
              
Discounted Price: Rs. 7,000/-
Mdcat se related App mein guidance 👀: https://www.youtube.com/watch?v=obfkwdX9DC8
              
MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4
              
OR please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 03242996556 Umer Hameed Khan ✌️`,
      },
    },
    {
      delay: 1000,
      type: MessageType.TEXT,
      text: {
        body: `Aap k mazeed aur koi sawaal hain tou please humein batayein 👍`,
      },
    },
  ];
  return map;
}, {});

export enum TRIGGER_MENU_KEYS {
  DHAMAKAYDAR_OFFER_KEY = '1.7',
  MEC_FEE_INFO_KEY = '1.6.1',
  MEC_EARLY_BIRD_INFO_KEY = '1.6.5',
  MEC_FRIENDS_REFERRAL_INFO_KEY = '1.6.6',
}
export const CXxSALES = 'b97069c4-cac8-459a-bcbc-17339c67fd39';

export const menuMessageTriggerKeys = [
  {
    message: 'Dhamakaydaar offer ko kaise avail karein?',
    key: TRIGGER_MENU_KEYS.DHAMAKAYDAR_OFFER_KEY,
  },
  { message: '', key: undefined },
].reduce((map: Record<string, string | undefined>, val) => {
  map[val.message] = val.key;
  return map;
}, {});

export const ecatInfoMacroMessage = [
  'How can I cover NED Entry Test syllabus in 30 days?',
  'What does the NED Entry Test Bundle include?',
  `How can I buy Maqsad's NED Entry Test Bundle?`,
].reduce((map: MessageMap, str) => {
  map[str] = [
    {
      type: MessageType.TEXT,
      text: {
        body: `Hello! 👋 Future Engineers!🧑‍🔬 Maqsad k super limited time discounted offer se ECAT bundle se preparation kar k apni seat pakki karo engineering university mein:

Maqsad k discounted ECAT program ki offerings ye hain:
        
- ALL subjects access (Chemistry, Physics, English, Maths and IQ) 📚
- Detailed video lectures
- Complete guide for ECAT
- Complete Doubt solve access
- Complete Test feature access
- University Grand tests preparation access (GIKI, FAST - NUCES , NUST, NED and UET)
        
Discounted Price: Rs. 7,000/- for (1 Year)
        
ECAT Khareednay ka Tareeqa 👀: https://www.youtube.com/watch?v=4fRO-wlv94E
        
ECAT se related App mein guidance 👀: https://www.youtube.com/watch?v=edXq_6ATCvg
        
OR 
        
please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
03242996556
Umer Hameed Khan ✌️`,
      },
    },
    {
      delay: 1000,
      type: MessageType.TEXT,
      text: {
        body: `Aap k mazeed aur koi sawaal hain tou please humein batayein 👍`,
      },
    },
  ];
  return map;
}, {});

export const revisionOfferMessages = [
  'Revision Bundle se jaldi tayyari complete kese karoon?',
  'Revision Bundle se A grade kese aayega?',
  'Revision Bundle kiun zaroori hain?',
  'I saw this on Facebook…',
  'I saw this on Instagram…',
].reduce((map: MessageMap, str) => {
  map[str] = [
    {
      type: MessageType.TEXT,
      text: {
        body: `Hooray! 🎉 Maqsad laaya hai SUPER REVISION BUNDLE for 1st Year Sindh Board Students! 

Ab aap bhi Maqsad k previous position holder students ki tarah A grade layein aur New syllabus ko kum time mein cover karein! 💯

SUPER REVISION BUNDLES mein hai: 

- Unlimited DoubtSolve - Koi bhi sawaal ho exam se pehle toh fouran se DoubtSolve k zariey unlimited video solutions haasil karo 📚
- New syllabus k according complete tests feature access karein jisme 6000+ chapter wise MCQs aur past papers shamil hain! Inn features se aap apni exams ki tayyari kum time mein ziada aur complete course cover kar saktay hain.📝

Yeh sab kuch avail karein exams k end tak in only RS.1000/-

Please transfer RS. 1000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!

03242996556
Umer Hameed Khan`,
      },
    },
  ];
  return map;
}, {});

export const offWorkingHourMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `Maazrat hum abhi available nahi hai. 👍 Hum Monday se Sunday subah 10:30 baje se shaam 9:30 baje tak aapki help k liye mojood hain. Hamaari team InshAllah jald hee aap se raabta kare gi! ✌️

Lekin aap befikar rahein aap maqsad App se kisi bhi time apni studies kar saktay hain. 🙂`,
  },
};

export const holidayMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `Eid Mubarak student! 🫂 🐂 Umeed karte hai aap apni Eid enjoy kar rahay hain, Lekin Maazrat, Maqsad ki team aur teachers EID per available nahi. Aap befikar rahein hum EID k 3rd day aap ki help k liye available ho jaeinge. 🙂

Happy Meaty EID to Maqsad students. 🫂 🐄 🥩`,
  },
};

export const underMaintenanceMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `
    Student!👋 Maazrat abhi hum is number par kuch time k liye available nahi hain😔 Lekin pareshani ki koye baat nahi hai! Aap humein iss number 03039368219 (https://wa.me/03039368219) par whatsapp message kar saktay hain aur hum aap ko jald jawaab de dein ge!☺️`,
  },
};

export const muharramMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `Maazrat, Maqsad ki team 9th aur 10th muharram ko aap ki help k liye available nahi hogi. Lekin aap befikar rahein aap humaari App se solution kisi bhi time haasil kar k studies kar saktay hain.

Doubt solve se question poochnay ka tareeqa: https://www.youtube.com/watch?v=e9L2ibqGYOI`,
  },
};

export const EidMiladMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `Maazrat, Maqsad ki team Eid Milad un-Nabi k din aap ki help k liye available nahi hogi. Lekin aap befikar rahein aap humaari App se solution kisi bhi time haasil kar k studies kar saktay hain. Shukriya

Doubt solve se question poochnay ka tareeqa: https://www.youtube.com/watch?v=e9L2ibqGYOI`,
  },
};

export const ExperienceCenterOffMessage: IWhatsAppReplyMessage = {
  type: MessageType.TEXT,
  text: {
    body: `Maazrat, Maqsad ki team Experience centre launch k event mein busy hai is liye Sunday k din aap ki help k liye available nahi hogi. Lekin aap befikar rahein aap humaari App se solution kisi bhi time haasil kar k studies kar saktay hain. Shukriya
Doubt solve se question poochnay ka tareeqa: https://www.youtube.com/watch?v=e9L2ibqGYOI`,
  },
};

export const getOTPMessage = (otp: string): IWhatsAppReplyMessage => ({
  type: MessageType.TEXT,
  text: {
    body: `Hello !👋 Aap ka OTP ${otp} hai. kindly ye code App mein enter kar k apni App use karna shuru karein.

NOTE: Diya gaya OTP 30 minutes tak valid hai.`,
  },
});

const chatBotMessageKeyMap: Record<string, string[]> = {
  '1': ['A'],
  '1.1': ['B'],
  '1.1.1': ['F'],
  '1.1.1.1': ['J'],
  '1.1.1.2': ['K'],
  '1.1.1.3': ['L', 'M'],
  '1.1.1.4': ['T'],
  '1.1.2': ['G'],
  '1.1.2.1': ['O'],
  '1.1.2.2': ['P'],
  '1.1.2.3': ['Q'],
  '1.1.2.4': ['T'],
  '1.1.3': ['H'],
  '1.1.4': ['I'],
  '1.1.4.1': ['OTP'],
  '1.1.4.2': ['S'],
  '1.1.4.3': ['T'],
  '1.1.5': ['T'],
  '1.3': ['D'],
  '1.3.1': ['AB'],
  '1.3.2': ['AC'],
  '1.3.3': ['AD'],
  '1.3.4': ['T'],
  '1.4': ['BC'],
  '1.4.1': ['BD', 'BE'],
  '1.4.2': ['BF'],
  '1.4.3': ['BG'],
  '1.4.4': ['T'],
  '1.5': ['AS'],
  '1.5.1': ['AT'],
  '1.5.2': ['AU'],
  '1.5.3': ['AV'],
  '1.5.4': ['AW'],
  '1.5.5': ['AX'],
  '1.5.6': ['AY'],
  '1.5.7': ['T'],
  '1.6': ['E'],
  '1.6.1': ['AF'],
  '1.6.2': ['AG'],
  '1.6.3': ['T'],
  '1.7': ['AZ'],
  '1.7.1': ['BA'],
  '1.7.2': ['BB'],
  '1.7.3': ['T'],
  '1.2.NonUser': ['C'],
  '1.2.NonUser.1': ['V'],
  '1.2.NonUser.1.1': ['W'],
  '1.2.NonUser.1.1.1': ['X'],
  '1.2.NonUser.1.1.2': ['Y'],
  '1.2.NonUser.1.1.3': ['Z'],
  '1.2.NonUser.1.2': ['F'],
  '1.2.NonUser.1.2.1': ['J'],
  '1.2.NonUser.1.2.2': ['K'],
  '1.2.NonUser.1.2.3': ['L', 'M'],
  '1.2.NonUser.1.2.4': ['T'],
  '1.2.NonUser.1.3': ['G'],
  '1.2.NonUser.1.3.1': ['O'],
  '1.2.NonUser.1.3.2': ['P'],
  '1.2.NonUser.1.3.3': ['Q'],
  '1.2.NonUser.1.3.4': ['T'],
  '1.2.NonUser.1.4': ['AL'],
  '1.2.NonUser.1.5': ['I'],
  '1.2.NonUser.1.5.1': ['OTP'],
  '1.2.NonUser.1.5.2': ['S'],
  '1.2.NonUser.1.5.3': ['T'],
  '1.2.NonUser.1.6': ['T'],
  '1.2.NonUser.2': ['N'],
  '1.2.NonUser.2.1': ['F'],
  '1.2.NonUser.2.1.1': ['J'],
  '1.2.NonUser.2.1.2': ['K'],
  '1.2.NonUser.2.1.3': ['L', 'M'],
  '1.2.NonUser.2.1.4': ['T'],
  '1.2.NonUser.2.2': ['G'],
  '1.2.NonUser.2.2.1': ['O'],
  '1.2.NonUser.2.2.2': ['P'],
  '1.2.NonUser.2.2.3': ['Q'],
  '1.2.NonUser.2.2.4': ['T'],
  '1.2.NonUser.2.3': ['U'],
  '1.2.NonUser.2.4': ['I'],
  '1.2.NonUser.2.4.1': ['OTP'],
  '1.2.NonUser.2.4.2': ['S'],
  '1.2.NonUser.2.4.3': ['T'],
  '1.2.NonUser.2.5': ['T'],
  '1.2.NonUser.3': ['AH'],
  '1.2.NonUser.3.1': ['F'],
  '1.2.NonUser.3.1.1': ['J'],
  '1.2.NonUser.3.1.2': ['K'],
  '1.2.NonUser.3.1.3': ['L', 'M'],
  '1.2.NonUser.3.1.4': ['T'],
  '1.2.NonUser.3.2': ['G'],
  '1.2.NonUser.3.2.1': ['O'],
  '1.2.NonUser.3.2.2': ['P'],
  '1.2.NonUser.3.2.3': ['Q'],
  '1.2.NonUser.3.2.4': ['T'],
  '1.2.NonUser.3.3': ['U'],
  '1.2.NonUser.3.4': ['I'],
  '1.2.NonUser.3.4.1': ['OTP'],
  '1.2.NonUser.3.4.2': ['S'],
  '1.2.NonUser.3.4.3': ['T'],
  '1.2.NonUser.3.5': ['T'],
  '1.2.NonUser.4': ['AI'],
  '1.2.NonUser.4.1': ['F'],
  '1.2.NonUser.4.1.1': ['J'],
  '1.2.NonUser.4.1.2': ['K'],
  '1.2.NonUser.4.1.3': ['L', 'M'],
  '1.2.NonUser.4.1.4': ['T'],
  '1.2.NonUser.4.2': ['G'],
  '1.2.NonUser.4.2.1': ['O'],
  '1.2.NonUser.4.2.2': ['P'],
  '1.2.NonUser.4.2.3': ['Q'],
  '1.2.NonUser.4.2.4': ['T'],
  '1.2.NonUser.4.3': ['U'],
  '1.2.NonUser.4.4': ['I'],
  '1.2.NonUser.4.4.1': ['OTP'],
  '1.2.NonUser.4.4.2': ['S'],
  '1.2.NonUser.4.4.3': ['T'],
  '1.2.NonUser.4.5': ['T'],
  '1.2.NonUser.5': ['AJ'],
  '1.2.NonUser.5.1': ['F'],
  '1.2.NonUser.5.1.1': ['J'],
  '1.2.NonUser.5.1.2': ['K'],
  '1.2.NonUser.5.1.3': ['L', 'M'],
  '1.2.NonUser.5.1.4': ['T'],
  '1.2.NonUser.5.2': ['G'],
  '1.2.NonUser.5.2.1': ['O'],
  '1.2.NonUser.5.2.2': ['P'],
  '1.2.NonUser.5.2.3': ['Q'],
  '1.2.NonUser.5.2.4': ['T'],
  '1.2.NonUser.5.3': ['U'],
  '1.2.NonUser.5.4': ['I'],
  '1.2.NonUser.5.4.1': ['OTP'],
  '1.2.NonUser.5.4.2': ['S'],
  '1.2.NonUser.5.4.3': ['T'],
  '1.2.NonUser.5.5': ['T'],
  '1.2.NonUser.6': ['AK'],
  '1.2.NonUser.6.1': ['F'],
  '1.2.NonUser.6.1.1': ['J'],
  '1.2.NonUser.6.1.2': ['K'],
  '1.2.NonUser.6.1.3': ['L', 'M'],
  '1.2.NonUser.6.1.4': ['T'],
  '1.2.NonUser.6.2': ['G'],
  '1.2.NonUser.6.2.1': ['O'],
  '1.2.NonUser.6.2.2': ['P'],
  '1.2.NonUser.6.2.3': ['Q'],
  '1.2.NonUser.6.2.4': ['T'],
  '1.2.NonUser.6.3': ['U'],
  '1.2.NonUser.6.4': ['I'],
  '1.2.NonUser.6.4.1': ['OTP'],
  '1.2.NonUser.6.4.2': ['S'],
  '1.2.NonUser.6.4.3': ['T'],
  '1.2.NonUser.6.5': ['T'],
  '1.2.User.OtherBoard': ['AE'],
  '1.2.User.OtherBoard.1': ['F'],
  '1.2.User.OtherBoard.1.1': ['J'],
  '1.2.User.OtherBoard.1.2': ['K'],
  '1.2.User.OtherBoard.1.3': ['L', 'M'],
  '1.2.User.OtherBoard.1.4': ['T'],
  '1.2.User.OtherBoard.2': ['G'],
  '1.2.User.OtherBoard.2.1': ['O'],
  '1.2.User.OtherBoard.2.2': ['P'],
  '1.2.User.OtherBoard.2.3': ['Q'],
  '1.2.User.OtherBoard.2.4': ['T'],
  '1.2.User.OtherBoard.3': ['U'],
  '1.2.User.OtherBoard.4': ['I'],
  '1.2.User.OtherBoard.4.1': ['OTP'],
  '1.2.User.OtherBoard.4.2': ['S'],
  '1.2.User.OtherBoard.4.3': ['T'],
  '1.2.User.OtherBoard.5': ['T'],
  '1.2.User.SindhBoard': ['AA'],
  '1.2.User.SindhBoard.1.UnknownClass': ['W'],
  '1.2.User.SindhBoard.1.Class.9': ['AN'],
  '1.2.User.SindhBoard.1.Class.10': ['AN'],
  '1.2.User.SindhBoard.1.Class.11': ['AN'],
  '1.2.User.SindhBoard.1.Class.12': ['AN'],
  '1.2.User.SindhBoard.2': ['Z'],
  '1.2.User.SindhBoard.3': ['F'],
  '1.2.User.SindhBoard.3.1': ['J'],
  '1.2.User.SindhBoard.3.2': ['K'],
  '1.2.User.SindhBoard.3.3': ['L', 'M'],
  '1.2.User.SindhBoard.3.4': ['T'],
  '1.2.User.SindhBoard.4': ['G'],
  '1.2.User.SindhBoard.4.1': ['O'],
  '1.2.User.SindhBoard.4.2': ['P'],
  '1.2.User.SindhBoard.4.3': ['Q'],
  '1.2.User.SindhBoard.4.4': ['T'],
  '1.2.User.SindhBoard.5': ['I'],
  '1.2.User.SindhBoard.5.1': ['OTP'],
  '1.2.User.SindhBoard.5.2': ['S'],
  '1.2.User.SindhBoard.5.3': ['T'],
  '1.2.User.SindhBoard.6': ['T'],
  solved: ['solved'],
};

const getOTPMessageKeys = Object.entries(chatBotMessageKeyMap)
  .map(([key, messageKeys]) => (messageKeys.includes('OTP') ? key : undefined))
  .filter(Boolean) as string[];

export const OTPIssueMessages = [
  'Mujhe OTP ka sms receive nahi horaha',
  ...getOTPMessageKeys,
].reduce((map: MessageMap, str) => {
  map[str] = [
    allMessagesMap['OTP'],
    {
      delay: 5 * 60 * 1000,
      type: MessageType.TEXT,
      text: {
        body: `Student, message mai diye gaye steps zaroor follow karein 👍 Agar in steps k baad bhi OTP nahi aye toh humein batayein.`,
      },
    },
    {
      delay: 5 * 60 * 1000 + 1000,
      type: MessageType.INTERACTIVE,
      interactive: {
        type: InteractiveType.BUTTON,
        body: {
          text: `Aap ko OTP receive hogaya hai?`,
        },
        action: {
          buttons: [
            {
              type: 'reply',
              reply: {
                id: 'solved',
                title: 'Yes',
              },
            },
            {
              type: 'reply',
              reply: {
                id: 'agent',
                title: 'No',
              },
            },
          ],
        },
      },
    },
  ];
  return map;
}, {});

const boardRouter: Record<string, string> = {
  '': '1.2.NonUser',
  'Sindh Board': '1.2.User.SindhBoard',
};

const classRouter: Record<string, string> = {
  '': '1.2.User.SindhBoard.1.UnknownClass',
  'Class 9': '1.2.User.SindhBoard.1.Class.9',
  'Class 10': '1.2.User.SindhBoard.1.Class.10',
  '1st Year': '1.2.User.SindhBoard.1.Class.11',
  '2nd Year': '1.2.User.SindhBoard.1.Class.12',
};

type MessageRouter = (user: User) => string;
export const messageRouterMap: Record<string, MessageRouter | undefined> = {
  '1.2': (user) => {
    return boardRouter[user.boardName ?? ''] ?? '1.2.User.OtherBoard';
  },
  '1.2.User.SindhBoard.1': (user) => {
    return (
      classRouter[user.gradeName ?? ''] ?? '1.2.User.SindhBoard.1.UnknownClass'
    );
  },
  '': undefined,
};

const populateMessages = (key: string, messageKeys: string[]) =>
  messageKeys.map((messageKey): IWhatsAppReplyMessage => {
    const message = allMessagesMap[messageKey];

    if (message.type !== MessageType.INTERACTIVE) return message;

    const rows = message.interactive?.action?.sections?.[0]?.rows?.map?.(
      (row, i) => ({ ...row, id: `${key}.${i + 1}` }),
    );

    return {
      ...message,
      interactive: {
        ...message.interactive,
        action: {
          ...message.interactive?.action,
          sections: [
            {
              title: message.interactive?.action.sections?.[0]?.title,
              rows,
            },
          ],
        },
      },
    } as IWhatsAppReplyMessage;
  });

export const chatBotMessageMap: MessageMap = Object.entries(
  chatBotMessageKeyMap,
).reduce((map: Record<string, IWhatsAppReplyMessage[]>, [key, messageKeys]) => {
  map[key] = populateMessages(key, messageKeys);
  return map;
}, {});

// const getMessageKey = (search: string): string[] => {
//   const regEx = new RegExp(search, 'i');
//   return Object.entries(allMessagesMap)
//     .filter(([, item]) => {
//       return regEx.test(
//         item.interactive?.action?.button ?? (item?.text?.body as string),
//       );
//     })
//     .reduce((arr: string[], [key]) => {
//       arr.push(key);
//       return arr;
//     }, [])
//     .map((key) => `Key:${key} ` + JSON.stringify(allMessagesMap[key]));
// };

// fs.writeFile(
//   'map.json',
//   JSON.stringify(Object.entries(chatBotMessageMap)),
//   (err) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log('written');
//     // file written successfully
//   },
// );
//
// console.log(JSON.stringify(chatBotMessageMap));

// const allUsedKeys = [
//   ...new Set(
//     Object.values(chatBotMessageKeyMap).flat(),
//     // .concat(
//     //   Object.values(multipleRoutesMessagesKeyMap)
//     //     .map((val) => Object.values(val))
//     //     .flat(2),
//     // ),
//   ),
// ];

// console.log(
//   Object.keys(allMessagesMap)
//     .filter((key) => !allUsedKeys.includes(key))
//     .map((key) => `Key:${key} ` + JSON.stringify(allMessagesMap[key])),
// );

// console.log(getMessageKey(process.argv.slice(2).join(' ')));

// console.log(
//   JSON.stringify(allMessagesMap['D']) === JSON.stringify(allMessagesMap['AB']),
// );
