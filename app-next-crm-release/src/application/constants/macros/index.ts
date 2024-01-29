import { nanoid } from '@reduxjs/toolkit'
import { Macro } from '@/application/models/macro/macro.model'
import { Availability } from '@/application/constants/enums/availability'

export const MACROS = [
    {
        title: 'Doubt Asked Directly',
        response: `Students!👋 Maazrat hum apnay WhatsApp per aap k sawaal ka jawaab nahin dey payein ge. ☹️ Aap befikar rahein!

Maqsad App per class junior to 12th kay Maths, physics, biology aur chemistry kay solutions aap humaray Doubtsolve feature k zariye asaani se sawal ka jawaab haasil kar saktay hain!😊

How to use DoubtSolve👀: https://www.youtube.com/watch?v=e9L2ibqGYOI
Doubt solve feature ki Camera Screen: https://maqsad.page.link/doubtSolve`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'Delay solution',
        response: `Students!👋 Aap befikar hojaye hum abhi team say confirm karkay aap ko question ka status bata detay hai, Kindly humein apna Maqsad App per registered number share karein.

App mein registered number dekhnay ka tareeqa 👀:https://www.youtube.com/shorts/Rz4jO1lrULk`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS Solution time',
        response: `Students!👋 Doubt k solution me usually 20 min se 2 hours ka time lag sakta hai. Humari team aap k doubt ka status check kar k aap ko jald update kare gi!😊 
Kindly humein apna Maqsad App per registered number share karein.
        
App mein registered number dekhnay ka tareeqa 👀:https://www.youtube.com/shorts/Rz4jO1lrULk`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'Active/khaas doubt details',
        response: `Students!👋 Khaas doubt dhoondne k liye aap "learn screen" par click karein aur "khaas doubt" k banner par click karein.
App mein active/khaas doubt dekhne ka page: https://maqsad.page.link/activeDoubtPage
Guidance k liye aap ye video dekh sakte hain👀: https://www.youtube.com/watch?v=rzaFjwCN1rg`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS info',
        response: `Students!👋Aap doubtsolve se koi bhi Math, Physics, Chemistry ya Biology ka question pooch sakte hain.✌️https://www.youtube.com/watch?v=ElPS8Tv8Dp4
Aap Maqsad app kholein, apne sawaal ki tasweer lein, apne question ko crop karein aur "submit" par click karein. Kuch second intezar karein aur phir video solution dekhein!😊
Guidance k liye aap ye video dekh sakte hain👀:  https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS purchase',
        response: `Students!👋 Ab Maqsad App per paayein unlimited monthly doubts in just Rs. 250 per month. Pehle 3 doubts free milte hain laikin DoubtSolve khareedne se aap ko milein ge unlimited doubts per month, instant solutions, aur bohat kuch!📚
Maqsad App par Doubtsolve Khareednay Ka Tareeqa is video mai dekhein👀:https://www.youtube.com/watch?v=N0X4FvML6qA
App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs
Or, please transfer RS. 250 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 
03322447139 
Syed Tayyab Ali`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS discount',
        response: `Students!👋Apna DoubtSolve ko upgrade karne k liye aap ye payment option istemaal kar sakte hain. Aap please payment complete kar k iss number par payment ki screenshot bhej dein. Agar koi bhi issue ho aap humai pooch sakte hain. 🙂

Packages:
1 month - RS. 250

2 month - RS.350
3 months - RS. 500
6 months - RS. 1000
1 year - RS. 2000

Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.

03322447139
Syed Tayyab Ali

DoubtSolve use karne ka tariqa janne k liye ye video bhi dekh lein👀: https://www.youtube.com/watch?v=e9L2ibqGYOI

App mei DS upgrade karnay k liye ye link click karein: https://maqsad.page.link/upgradeDs`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS in Urdu',
        response: 'Students!👋Maazrat, Maqsad App mein abhi Urdu medium kay courses aur Urdu mein sawaal kay jawaab nahi diye jatay. Mazeed hum team ko inform kar detay hain jald hee App mein yeh feature bhi available hojaega. 🙂 Shukriya',
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'DS limit exceed',
        response: `Student, 👋 aap please befikar rahein!

Aap k monthly 3 free doubts ki limit khatam ho gayi hai. Aap Rs.250/- pay karkay pooray month unlimited solutions pooch saktay hain aur aap ko jald aur behtreen responses milein ge 👍`,
        tags: [
            'DoubtSolve',
        ]
    },
    {
        title: 'Report bug',
        response: `Maazrat k aap issue face kar rahe hain. Don't worry! Kindly aap apnay issue ki screen recording bhej dein aur aap ka issue jald solve ho jayega. Kindly humein apna App per registered number bhi share karein saath mein🤝Shukriya

App mein registered number dekhnay ka tareeqa 👀:https://www.youtube.com/shorts/Rz4jO1lrULk`,
        tags: [
            'Technical issues',
        ]
    },
    {
        title: 'How to restart the App',
        response: `Students!👋 Maazrat k aap App mein issue face kar rahe hain. Aap kindly App ko logout karein, background page se App ko remove karkay dubara login karein aur aap ka issue solve hojaega.✌️Shukriya 

Mazeed guidance k liye yeh video dekhein 👀: https://www.youtube.com/shorts/BST98Kg0KtY`,
        tags: [
            'Technical issues',
        ]
    },
    {
        title: 'For DS delay',
        response: 'Students!👋 Aap ko instant doubts k jawaab 3-4 seconds me mile ga aur khaas solutions mai thora time lagta hai.⏰',
        tags: [
            'Technical issues',
        ]
    },
    {
        title: 'VL details',
        response: `Students!👋Maqsad App mein class 9th, 10th, 11th aur 12th kay sindh board k detailed video lectures available hain. Mazeed aap ko punjab board k class 11th aur 12th k lectures bhi App mein mil jae gay.✌️📚

Mazeed remaining subjects pai team kaam kar rahi hai jald hee available kardiye jayengay.😊
        
Video lecture ko use karne ka tareeqa dekhein 👀 : https://www.youtube.com/watch?v=gWW0AtnHRxE
        
App mein video lecture ka page👀: https://maqsad.page.link/lectures`,
        tags: [
            'Video Lectures',
        ]
    },
    {
        title: 'How to use VL',
        response: `Students!👋 Maqsad App mein aap lectures k option mein aap apni class aur board select karein aur uske according video lectures access karein.✌️📚
Video lecture ko use karne ka tareeqa dekhein👀:https://www.youtube.com/watch?v=gWW0AtnHRxE`,
        tags: [
            'Video Lectures',
        ]
    },
    //TODO: Response Not in Notion, will add after added
    // {
    //     title: 'Sindh ya Punjab board k lectures kahan milein ge?',
    //     response:``,
    //     tags: [
    // 'Video Lectures',
    //     ]
    // },
    {
        title: 'VL subjects',
        response: `Students!👋 Maqsad App class 9th to 12th botany, zoology, chemistry, maths , biology and physics k video lectures available hain.✌️📚
Video lecture ko use karne ka tareeqa dekhein👀:https://www.youtube.com/watch?v=gWW0AtnHRxE`,
        tags: [
            'Video Lectures',
        ]
    },
    {
        title: 'VL class?',
        response: `Students!👋 Maqsad App mein class 9th, 10th, 11th aur 12th k video lectures available hain.✌️📚
Video lecture ko use karne ka tareeqa dekhein👀:https://www.youtube.com/watch?v=gWW0AtnHRxE`,
        tags: [
            'Video Lectures',
        ]
    },
    {
        title: 'VL purchase',
        response: `Students!👋 Maqsad k high quality video lectures access k liye aap video lecture mein aap ab har subject k kuch chapter k lectures bilkul free dekh saktay hain. ✌️📚

Uss ke baad aap sirf RS.1000/- pay kar k 3 months tak unlimited video lectures se studies kar saktay hain

Tou der kis baat ki abhi video lecture upgrade karo aur Maqsad se non-stop parh kar exams mein top karo.😊

Video Lectures Khareednay ka Tareeqa: https://www.youtube.com/shorts/p6rU-49qY9M

OR. please transfer RS. 1000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 
03322447139 
Syed Tayyab Ali`,
        tags: [
            'Video Lectures',
        ]
    },
    {
        title: 'Tests class and subject',
        response: `Students!👋 Maqsad app mai abhi class 9th to 12th Maths, Physics, Chemistry aur Biology k tests available hain. ✌️
Mazeed aur bhi chapters aur subjects k test bhi jald hee App mein available ho jayein gay!`,
        tags: [
            'Test',
        ]
    },
    {
        title: 'Tests details',
        response: `Students!👋 Maqsad app mai MCQs aur past papers tests available hain jis k zariye aap apni tayyari pakki kar sakte hain. Har chapter mein 3 tests shaamil hain! 😊
Aur jannay  liye ye video dekhein👀: https://www.youtube.com/watch?v=8AnnGYBUnZ8`,
        tags: [
            'Test',
        ]
    },
    {
        title: 'Tests purchase',
        response: `Students!👋 Maqsad app per 6000+ question library aur complete course k past papers ko access karein aur exams preparation ko aur bhi bhethar karein.📚👨‍🎓

Tests feature Packages:
1 month - RS. 1000
3 months - RS. 1500

Test Feature Khareednay ka Tareeqa: https://www.youtube.com/shorts/WObVRnw5Lso

Please choose the package and send amount to following JazzCash/Easypaisa & send screenshot here. We will activate your access.

03322447139
Syed Tayyab Ali`,
        tags: [
            'Test',
        ]
    },
    {
        title: 'Sikkay upgrade info for monetized User',
        response: `Student👋Maqsad say earn kiye hue sikkay aap doubt solve, past paper, video lectures, tests feature aur question bank khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯

Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
        tags: [
            'Maqsad Sikkay',
        ]
    },
    {
        title: 'Sikkay earn details',
        response: `Student👋Maqsad sikkay earn karnay k 3 tareeqay hain👀!

1️⃣“Menu” k option mei jayein aur “Edit profile” mein apni complete details fill karein. Details fill kartay hee aap ko 2500 sikkay miltay hain!

2️⃣.Aap ko doubt solve feature say solution haasil karnay per bhi sikkay milein ge!

3️⃣.Friends ko App refer karein aur 💯 sikkay haasil karein.

Sikkay earn karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE

App mein available sikkay dekhne ka link: https://maqsad.page.link/maqsadSikkayPage`,
        tags: [
            'Maqsad Sikkay',
        ]
    },
    {
        title: 'Sikkay refer to friend',
        response: `Student👋 Maqsad sikkay friend ko refer karnay k liye “Menu” k option mein jae aur “Share Maqsad” k option per click karein waha di hue instruction ko follow karkay apnay friend ko refer karien aur 💯sikkay haasil karein.🙌
Mazeed aap ko 10 friends refer karnay per influencer badge bhi milega.🏅

Friends ko refer karnay ka tareeqa dekhein👀:https://www.youtube.com/shorts/C04IZ1hCOdE`,
        tags: [
            'Maqsad Sikkay',
        ]
    },
    {
        title: 'Feature upgrade via sikkay',
        response: `Student👋Maqsad say earn kiye hue sikkay aap doubt solve, past paper, video lectures, tests feature aur question bank khareed saktay hain. Doubtsolve khareedne k baad, mazeed aap ko 1 doubt solve poochnay per 10 sikkay app mein miltay hain.💯

Aur malumaat k liye ye video dekhein👀:https://www.youtube.com/watch?v=drjAtFK36BA`,
        tags: [
            'Maqsad Sikkay',
        ]
    },
    {
        title: 'Sikkay DS purchase',
        response: `Students!👋No worries😟 Kyun k aap humare loyal user hain, aap apnay App mein available Maqsad sikkay se FREE mein doubt solve upgrade kar saktay hain bina kisi charges. Aap k paas is waqt App mein available sikkay agar 2500 hai tou aap asaani se doubt solve khareed kar pooray month unlimited solution pooch saktay hai. 🙃
Sikkay say Payment karnay ka tareeqa👀: https://www.youtube.com/watch?v=drjAtFK36BA`,
        tags: [
            'Maqsad Sikkay',
        ]
    },
    {
        title: 'Feature upgrade',
        response: `Aap ko konsa feature upgrade karna hai? 😊

1-Doubt solve
2-Tests & Past papers
3-Video lecture
4- MDCAT/ ECAT`,
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Payment kaise karte hain?',
        response: `Students!👋Maqsad app per doubt solve khareednay k liye yeh video dekhein👀: https://www.youtube.com/watch?v=N0X4FvML6qA

Agar aap ko payment say related koi issue hou tou kindly humein batayien!☺️`,
        tags: [
            'Payments',
        ]
    },
    {
        title: 'JC/EP merchant query',
        response: `Students!👋No worries😟Aap kisi bhi Easypaisa/Jazzcash ki dukaan say amount transfer kar saktein hain, aap amount transfer karkay humein screenshot bhejein aap ko access mil jaega.🙌

Please transfer RS. 250 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!

03322447139
Syed Tayyab Ali`,
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Post sale details',
        response: `Thank you for your payment! 🙌🏻

Access kai liye aap ye details share kardein:
        
1. Name
2. Class
3. City
4. Maqsad ka register number
        
Registered Number Dhundnay Ka Tareeqa:https://www.youtube.com/shorts/Rz4jO1lrULk
        
Maqsad par apni tayyari ke liye bharosa karnay ka shukriya! 😊`,
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Request for free DS',
        response: 'Students, payment ke baghair aap aik month main 3 free doubts puch saktay hain. Hum maazrat chahtay hain lekin aap ko unlimited monthly doubts Rs. 250 pay kar ke hi mil saktay hain. Hum payment iss liye rakhtay hain takeh hum apnay users ko behtareen experience de sakain Maqsad app pe. Samajhnay ke liye shukriya.',
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Request for free VL',
        response: 'Hum maazrat chahtay hain lekin aap ko video lectures ka access payment kar ke hi mil sakta hai. Hum payment iss liye rakhtay hain takeh hum apnay users ko behtareen experience de sakain Maqsad app pe. Samajhnay ke liye shukriya.',
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Bundle discount (Rs. 3000 push)',
        response: `Students!👋 Ab Maqsad app kay SINDH BOARD complete exam bundle kay saath aap apnay exams me top kijiye! Is me aapko milega

- Unlimited DoubtSolve 📚
- Tests jisme chapter wise, model papers aur past papers bhi hain. 📝
- App mein available tamaam subjects k video lectures ka access. 📖
- Hum aapko expert teachers kay guess papers. 🗞️
- Humare teachers aapko live session par exams ki tips and tricks aur stress management kay tareeqe bhi batayeingay👨‍🏫

Ye sab aapko apne exams preapration tak milega sirf Rs. 3000/- mein. ✌️

Please transfer RS. 3000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!

03322447139
Syed Tayyab Ali`,
        tags: [
            'Payments',
        ]
    },
    {
        title: 'Bundle discount (Rs. 2000 push)',
        response: `Students!👋 Ab Maqsad app kay SINDH BOARD complete exam bundle kay saath aap apnay exams me top kijiye! Is me aapko milega

- Unlimited DoubtSolve 📚
- Tests jisme chapter wise, model papers aur past papers bhi hain. 📝
- App mein available ek subjects ka complete video lectures ka access. 📖
- Expert teachers kay guess papers. 🗞️
- Humare teachers aapko live session par exams ki tips and tricks aur stress management kay tareeqe bhi batayeingay👨‍🏫

Ye sab aapko apne exams preapration tak milega sirf Rs. 2000/- mein. ✌️

Please transfer RS. 2000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!

03322447139
Syed Tayyab Ali`,
        tags: [
            'Payments',
        ]
    },
    {
        title: '9th aur 10th past papers',
        response: `Students!👋Abhi maqsad App mein class 9th aur 10th kay past available nahi hain. Humari team already is pay kaam kar rahi hai buhat jald hee App pe available hojae gay. Shukriya 

Mazeed aap humaray doubtsolve feature se exams ki tayyari kar saktay hai. 😊`,
        tags: [
            'Past Papers',
        ]
    },
    {
        title: 'Past papers payment',
        response: `Students!👋 Yeh tou bohat aasan hai.
Past papers khareednay k liye yeh video dekhain👀: https://www.youtube.com/watch?v=XYwneBf1q6c`,
        tags: [
            'Past Papers',
        ]
    },
    {
        title: 'Available boards past papers',
        response: `Students!👋 Maqsad App mein Karachi, Lahore aur Federal board kay class 11th aur 12th kay past papers available hai. 🙌
Past papers khareednay ka tareeqa iss video mai hai 👀: https://www.youtube.com/watch?v=XYwneBf1q6c`,
        tags: [
            'Past Papers',
        ]
    },
    {
        title: 'How to use',
        response: `Students!👋Maqsad App ko use karnay ka tareeqa jannay k liye aap in video ko dekhein aap ko help hogi.

How to Login and Use the Maqsad App👀:https://www.youtube.com/watch?v=CyVgjCiqPr8
Maqsad se parhai karne ka faida👀:https://www.youtube.com/watch?v=7KgL0PIcTWo

Mazeed aap k aur koi sawal hai tou aap humse pooch saktay hai.✌️`,
        tags: [
            'Other',
        ]
    },
    {
        title: 'App details',
        response: `Students!👋Maqsad ek online learning application hai jis mai aapko milte hain instant video solutions or behtreen video lectures.🙌

Download the app now📚:https://play.google.com/store/apps/details?id=io.maqsad&hl=en&gl=US&p`,
        tags: [
            'Other',
        ]
    },
    {
        title: 'Guess Papers (11 and 12)',
        response: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.

Abhi click kijiye is link per: https://bit.ly/maqsad-blog`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'Guess Papers for 9th',
        response: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.

Abhi click kijiye is link per:https://blog.maqsad.io/guess-papers/9th-class-guess-paper-2023-sindh-board/`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'Guess Papers for 10th',
        response: `Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers.

Abhi click kijiye is link per:https://blog.maqsad.io/practicals/10-class-guess-paper-2023-sindh-board/`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'WhatsApp Sindh Group ( 9-12)',
        response: `Agar aap ko guess papers aur past papers ki zarurat hai tou Maqsad ka study group join karein aur hum se resources aur parhai related guidance lein. Hum apni puri koshish karein ge ke aap ko aap ki zarurat ki help provide karein.

Group link: https://chat.whatsapp.com/EzGnzChhZ4q87I9EQjVesS`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'WhatsApp Punjab Group ( 9-12)',
        response: `Agar aap ko guess papers aur past papers ki zarurat hai tou Maqsad ka study group join karein aur hum se resources aur parhai related guidance lein. Hum apni puri koshish karein ge ke aap ko aap ki zarurat ki help provide karein.

Group link: https://chat.whatsapp.com/GRwtatibo4PKN3XZiCSQaz`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'For Karachi/ Sindh board Whatsapp group',
        response: `Maqsad whatsapp group main shaamil hojayen or paayein education se related updates, competitions or bohat si nayi cheezein! 😍📚🧑‍🎓

Link to join group: https://chat.whatsapp.com/EzGnzChhZ4q87I9EQjVesS`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'For Punjab board WhatsApp group',
        response: `Maqsad whatsapp group main shaamil hojayen or paayein education se related updates, competitions or bohat si nayi cheezein! 😍📚🧑‍🎓

Link to join group:  https://chat.whatsapp.com/GRwtatibo4PKN3XZiCSQaz`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'For live sessions',
        response: `Students!👋 Maqsad App k YouTube per live sessions join karein aur exams ki preparation se related bohot si guidance haasil karein. live session k through aap past papers, guess papers , model papers aur exams se related bohot si guidance haasil kar saktay hain.
Maqsad App ka Youtube page: https://www.youtube.com/@maqsadapp

Live session ki updates k liye WhatsApp group link: https://chat.whatsapp.com/Do4NmqKkpai9C7mUBELBy3`,
        tags: [
            'Guess paper',
        ]
    },
    {
        title: 'MDCAT ',
        response: `Hello! 👋 Future doctors! 👨‍⚕️Maqsad k MDCAT program ki offerings ye hain:

- ALL subjects (English, Physics, Chemistry, Biology and Logical Reasoning) 📚
- Detailed video lectures
- Complete guide for MDCAT
- Unlimited Doubt solve access
- Complete tests feature and Grand tests preparation access

Discounted Price: Rs. 7,000/- for 1 year
Mdcat se related App mein guidance 👀: https://www.youtube.com/watch?v=obfkwdX9DC8

MDCAT Khareednay ka Tareeqa👀: https://www.youtube.com/watch?v=yYpLsc__qT4

OR please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 
03322447139 
Syed Tayyab Ali ✌️`,
        tags: []
    },
    {
        title: 'Request for English ',
        response: 'Bohot Maazrat, 🙏 English subject App mein available nahi hai laikin inshAllah jald hee available hojaega.',
        tags: [
            'Other messages',
        ]
    },
    {
        title: 'Request for other subject',
        response: 'Maazrat, 🙏 abhi App mein requested subject/course available nahi hai. Team iss pay kaam kar rahi hai aur buhat hee jald ye App pe available hojaega! Filhal, aap Maqsad app se Maths, Physics, Chemistry aur Biology zaroor parh sakte hain! 👍🏾 Shukriya.',
        tags: [
            'Other messages',
        ]
    },
    {
        title: 'Appreciation',
        response: 'Thank you very much! 🙂Humein bohot khushi hue k Maqsad App nei aap ko studies mein help ki aap agay bhi apni exams preparation Maqsad App se kartay rahein 🙌',
        tags: [
            'Other messages',
        ]
    },
    {
        title: 'Notes',
        response: 'Maazrat, filhal notes available nahi hain laikin aap app par Maqsad k video lectures aur tests se apni tayyari pakki kar sakte hain!',
        tags: [
            'Other messages',
        ]
    },
    {
        title: 'What classes are on Maqsad?',
        response: `Students!👋 Maqsad App per class junior to 12th kay Maths, physics, biology aur chemistry kay doubt solve available hain.😊 Mazeed 9th to 12th class kay video lectures bhi available hain.

Abhi App download karein aur Maqsad say apni studies ko aur bhi interesting banayein.
Tou phir karein Maqsad App download📚: https://maqsad.io/download/

Miltay hai aapse App mein. 🙌`,
        tags: [
            'New student',
        ]
    },
    {
        title: 'Features about Maqsad?',
        response: `Students!👋 Maqsad app par mukhtlif features hain. Hamare sub se popular features hain; Doubtsolve, Video lectures, Tests aur MDCAT/ ECAT preparation ka course.
Hamare mukhtalif features k baare me aur janne k liye ye video dekhein👀: https://www.youtube.com/watch?v=7KgL0PIcTWo

Wow!😮 Sab kuch tou hai is App mein haina?📚

Agar aap k aur koi sawaal hain toh zaroor poochein aur hum aap ko jald response dein ge.😇`,
        tags: [
            'New student',
        ]
    },
    {
        title: 'What is Maqsad app?',
        response: `Students!👋 Maqsad ek online learning application hai jis mai aapko milte hain class 9th to 12th kay instant video solutions aur behtreen video lectures.😇

Tou phir apnay grades behtar banayein 🏅aur Maqsad App per ayein.😊

Maqsad k baray mein mazeed janne k liye ye video dekhein👀:

https://www.youtube.com/watch?v=7KgL0PIcTWo`,
        tags: [
            'New student',
        ]
    },
    {
        title: 'App charges info?',
        response: 'Students! 👋 Maqsad App k complete feature ko access karne k charges hai aap ko tamaam features ko access karne k liye charges pay karne hotay hain .😇',
        tags: [
            'New student',
        ]
    },
    {
        title: 'Calls follow up?',
        response: 'Hum umeed karte hai aap ko team ki taraf se guidance k liye call aa gayi hogi. 👍',
        tags: []
    },
    {
        title: 'More queries',
        response: 'Aap ko iss hawale se kuch aur poochna hai ❓',
        tags: []
    },
    {
        title: 'For calls',
        response: 'Humaari team aap ko iss baare me call kar k guide bhi kar de gi! Ya aap amount transfer kar k screenshot bhej diey ga 🙂',
        tags: []
    },
    {
        title: 'JC/EP details',
        response: `Please transfer the amount to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!

03322447139
Syed Tayyab Ali`,
        tags: []
    },
    {
        title: 'Camera access issue',
        response: `Students! 👋 Kindly aap apnay mobile ki settings mein jaye waha “App & permission” per click kar k Maqsad App select karein aur camera per click karkay “permission” ko yes karein issue solve hojaega. 📷
Uske baad aap try sample question per click karein aur solutions poochein. ✌️
        
Mazeed guidance k liye yeh video dekhein: https://www.youtube.com/watch?v=ElPS8Tv8Dp4`,
        tags: []
    }, {
        title: 'Calculator',
        response: 'Students! 👋 App mein scientific calculator ko access karne k liye “video lecture” k option mein jaye left top corner per 3 lines per click karein aur menu list mein scientific calculator select karein aur practice start karein. ➕ ➖',
        tags: []
    },
    {
        title: 'Careers',
        response: `For career related queries, kindly contact us on the following emails address : [careers@maqsad.io](mailto:careers@maqsad.io)

Best Regards,
        
Team Maqsad`,
        tags: []
    },
    {
        title: 'After khaas DS',
        response: 'Aap kindly video mein diye hue steps ko follow karkay new solution ki request submit karein team aap ko jald hee relevant solution provide kardegi. ✌️ Mazeed agar aap ka solution theek nahi ata tou please humein batayein.',
        tags: []
    },
    {
        title: 'Promo code',
        response: `Students! 👋 App mein promo code use karne ka tareeqa bohot hee asaan hai. Aap simply payment method ko follow karein aur promo code k option mein promo code apply karein aur discount haasil karein. 🙂

Promo Code use karne ka tareeqa: https://www.youtube.com/shorts/TDd9Kk3QzsU`,
        tags: []
    },
    {
        title: 'Testimonial',
        response: `Maqsad Users! 🤩Aap Maqsad ke valued users main se hain. 🙌  Abhi ye form fill karein aur humain apnay Maqsad App ke experience ke baray main batayein aur ye batayein ke aap ki kitni madad hui hai Maqsad App use kar ke! 📲 📚

Abhi ye form fill karein aur hum se share karein: https://forms.gle/JtNFKtajgipY1ANw9
Shukriya!`,
        tags: []
    },
    {
        title: 'Eidi Sikkay',
        response: 'Student 👋 Eidi paanay ke liay Eid ke dinon mein DoubtSolve, Video Lecture ya Test feature ko istamal karein, aur 28th April ko aapki 1000 Sikkon ki Eidi aap ke Maqsad wallet mein daal di jayegi! 💸🪙',
        tags: []
    },
    {
        title: 'Super Revision bundle',
        response: `Hooray! 🎉 Maqsad laaya hai SUPER REVISION BUNDLE for 1st Year Sindh Board Students! 

Ab aap bhi Maqsad k previous position holder students ki tarah A grade layein aur New syllabus ko kum time mein cover karein! 💯
        
SUPER REVISION BUNDLES mein hai: 
        
- Unlimited DoubtSolve - Koi bhi sawaal ho exam se pehle toh fouran se DoubtSolve k zariey unlimited video solutions haasil karo 📚
- New syllabus k according complete tests feature access karein jisme 6000+ chapter wise MCQs aur past papers shamil hain! Inn features se aap apni exams ki tayyari kum time mein ziada aur complete course cover kar saktay hain.📝
        
Yeh sab kuch avail karein exams k end tak in only RS.1000/-
        
Please transfer RS. 1000 to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya!
        
03322447139
Syed Tayyab Ali`,
        tags: []
    },
    {
        title: 'For wrong solution (Response 1)',
        response: `Students! 👋 Maazrat k aap ko apna solution pasand nahi aaya. Kyun k hum aap ko jald solution dene ki kohsish karte hain, hum ne aapke sawaal k hisaab se system mein sab se acha solution nikaala hai jo sawaal ka concept samjha deta hai. Iss ko "Best match" kaha jata hai.

Mazeed jannay kai liye yeh video dekhein👀:https://www.youtube.com/shorts/98O4xFrm3YQ`,
        tags: []
    },
    {
        title: 'For wrong solution (Response 2)',
        response: `Aap befikar rahein! Agar aap ko apne sawaal ka exact jawaab chahiye, same values k saath, toh humare teachers ye aap k liye bana dein ge. 😊 "Khaas solution" ka button click karein aur apni details fill kar k 100% match solution haasil karein! 📚

Guidance k liye aap ye video dekh sakte hain 👀: https://www.youtube.com/watch?v=rzaFjwCN1rg`,
        tags: []
    },
    {
        title: 'ECAT',
        response: `Hello! 👋 Future Engineers!🧑‍🔬 Maqsad k ECAT program ki offerings ye hain:

- ALL subjects access (Chemistry, Physics, English, basic Maths, Advance Maths and IQ) 📚
- Detailed video lectures
- Complete guide for ECAT
- Complete Doubt solve access
- Complete Test feature access
- University Grand tests preparation access (GIKI, FAST - NUCES , NUST, NED and UET)
        
Discounted Price: Rs. 7,000/- for 1 year
        
ECAT Khareednay ka Tareeqa 👀: https://www.youtube.com/watch?v=4fRO-wlv94E
        
ECAT se related App mein guidance 👀: https://www.youtube.com/watch?v=edXq_6ATCvg
        
OR please transfer RS. 7000/- to following JazzCash/Easypaisa or humein yahan screenshot send karein. Hum aapko access provide kardeingey. Shukriya! 
03322447139 
Syed Tayyab Ali ✌️`,
        tags: []
    },
    {
        title: 'OTP issue',
        response: `Students!👋 Maazrat k aap ko OTP nahi mila! Diye gaye steps try karein aur OTP haasil karein. 

1 - Apnay phone ka flight/airplane mode on and off karein. 📲
2 - Kindly aap kisi behtar jaga per jaein jahan signals proper aa rahay hou. 📶
3 - Apna input kiya hua number double check karlein. 🤳
4- 10-15 minutes wait karein aur dubara OTP request karein! 🕒

Aur agar in steps k baad bhi OTP nahi aye toh humein batayein.`,
        tags: []
    },
    {
        title: 'Mdcat (WhatsApp group)',
        response: `Students! 👋Maqsad ka Mdcat whatsapp group join karein aur paayein MDCAT se related guidance aur bohat si nayi updates! 😍📚🧑‍🎓

Link to join group: https://chat.whatsapp.com/L8M6kUVX8LR6Ii59c8qYWa`,
        tags: []
    },
    {
        title: 'Guess Papers for 11th',
        response: `Students 👋Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers. 🙂

Abhi click ki jiye is link per: https://blog.maqsad.io/guess-papers/guess-papers-2023-class-11-sindh-board/`,
        tags: []
    },
    {
        title: 'Guess Papers for 12th',
        response: `Students 👋Maqsad App ki taraf se banaya gaya hai ek khaas blog, jis mein aap ko mileingi Maqsad App ko use karne ki tips, parhayi se mutalliq maalumat or guess papers. 🙂 

Abhi click ki jiye is link per: https://blog.maqsad.io/guess-papers/guess-papers-2023-class-12-sindh-board/`,
        tags: []
    },
    {
        title: 'For issue',
        response: 'Maazrat, Aap ka issue relevant team ko forward kar diya hai. Aap befikar rahein jald hee issue solve hojaega.',
        tags: []
    },
    {
        title: 'Issue Follow-up',
        response: 'Jee, kindly confirm kar dein agar aap ka issue solve ho gaya hai?',
        tags: []
    },
    {
        title: 'Game Show',
        response: `Hello!👋 Thank you for participating in Game show.

Apna jeeta hua gift haasil karne ke liye neeche diye gaye form mein details fill karein taa ke hum aap ke gifts aap tak pohancha sakay!
Form link: https://docs.google.com/forms/d/1xh_dhtDuCoW7NORVHH_qRCjYgETUFcNK3a5Qc1vDbsQ/edit`,
        tags: []
    },
    {
        title: 'Orientation Session',
        response: `Students!👋 Maqsad laaya hai MDCAT aur ECAT k students k liye Free orientation session 🙂. Iss mein aap ko milegi Mdcat aur Ecat se related complete guidance humaray experienced and qualified teachers aap ko batyein ge k aap kis tarah Entry tests ki preparation kar saktay hai aur mazeed bohot si malomaat. Toh abhi form mein apni details fill karein aur Free orientation session mein participate karein. 🧑‍🔬 🧑‍⚕️
        
Form link ✌️: https://forms.gle/nwXnL4nV4JRW52NT9`,
        tags: []
    },
    {
        title: 'Tests board details',
        response: 'Students!👋 Maqsad app mai abhi Sindh board k tests available hain! Mazeed is kai ilawa different boards k test pai Maqsad team kaam kar rahi hai or bohot jald he available hojayengay. 🤝',
        tags: []
    },
    {
        title: 'For unavailable board',
        response: 'Maazrat, 🙏 abhi App mein (requested) board available nahi hai. Team iss pay kaam kar rahi hai aur bohat hee jald ye App pe available hojaega! Filhal, aap doubt solve se Maths, Physics, Chemistry aur Biology k solutions hassil kar sakte hain! 👍🏾 Shukriya.',
        tags: []
    },
    {
        title: 'For OTP off',
        response: 'Student! Aap ko call ke gaye thi lekin aap ka number powered off araha hai agar yehe number aap nai Maqsad app registration k liye enter kiya hai to code nhi aa sakay ga please active number sai registration karein.',
        tags: []
    },
].map((macro) => new Macro({ id: nanoid(), ...macro , availability: Availability.RELEASED }))