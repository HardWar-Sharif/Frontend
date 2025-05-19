import { Box } from "@chakra-ui/react";
import { MarkdownViewer } from "../QuestionsPage";
import { useLanguageStore } from "@/stores/language";

const persianMarkdown = `
# به هفتمین دوره‌ی مسابقه‌ی «هاردوار» خوش آمدید!

شرکت در این مسابقه به منزله‌ی پذیرش کامل شرایط و قوانین زیر است. لطفاً بخش‌های زیر را با دقت مطالعه بفرمایید.

## ۱. شرایط کلی شرکت در مسابقه

 **۱.۱.** شرکت در مسابقه برای تمامی علاقه‌مندان به مباحث اینترنت اشیاء، امنیت و مهندسی معکوس سخت‌افزار آزاد است.  
 **۲.۱.** شرکت‌کنندگان تنها می‌توانند به‌صورت گروهی با تیم‌هایی متشکل از ۳ نفر در مسابقه شرکت نمایند.  
 **۳.۱.** هر شرکت‌کننده فقط می‌تواند عضو یک تیم باشد. استفاده از هویت‌های جعلی یا عضویت در چند تیم منجر به رد صلاحیت در تمامی تیم‌ها خواهد شد.

## ۲. نحوه‌ی برگزاری مسابقه

 **۱.۲.** مسابقه به‌صورت حضوری برگزار می‌شود و امکان شرکت به صورت مجازی وجود ندارد.  
 **۲.۲.** به هر تیم یک یا چند دستگاه سخت‌افزاری (مانند میکروکنترلر، بوردهای توسعه یا مدارهای خاص) به‌همراه مستندات داده خواهد شد. تیم‌ها موظف هستند که تا جای امکان از این سخت‌‌‌افزارها به خوبی مراقبت کنند.  
 **۳.۲.** اهداف کلی این مسابقه، نوشتن کدهایی منجر به عملکرد مطلوب مانند اجرای بازی، استخراج فلگ‌ها یا اجرای سناریوهای مشخص شده در چارچوب قوانین مسابقه شود، است.

## ۳. محدودیت‌ها و ممنوعیت‌ها

 **۱.۳.** استفاده از حملات DOS (منع سرویس) یا آسیب به زیرساخت مسابقه ممنوع است.  
 **۲.۳.** آسیب فیزیکی عمدی به تجهیزات مسابقه باعث رد صلاحیت خواهد شد و مستلزم پرداخت خسارت خواهد بود.  
 **۳.۳.** استفاده از ابزارها و اسکریپت‌های مخرب که به سایر تیم‌ها یا سامانه‌ی داوری آسیب بزند، ممنوع است.  
 **۴.۳.** هرگونه همکاری، تبادل فلگ یا جواب بین تیم‌ها ممنوع است و برای هر دو تیم تخلف محسوب می‌شود. این تخلف نمره‌ی مربوطه برای هر دو گروه را صفر خواهد کرد.

## ۴. نحوه‌ی امتیازدهی

 **۱.۴.** به هر چالش، امتیازی مشخص بر اساس تعداد حل‌های آن تعلق می‌گیرد.  
 **۲.۴.** سیستم امتیازدهی، به‌صورت داینامیک است و امتیاز حل هر سوال با رابطه‌ی مشخصی محاسبه خواهد شد.  

$$
\\left\\lfloor19 + \\frac{981}{1+(\\frac{\\max\\{0, \\#S - 1\\}}{11.92})^{1.21}}\\right\\rfloor
$$

 **۳.۴.** زمان ثبت هر پاسخ یا فلگ و مجموع امتیازات تیم، جایگاه نهایی را مشخص می‌کند.  
 **۴.۴.** با توجه به این‌که کیفیت خروجی تحویلی در چالش‌هایی که نمره‌دهی دستی دارند حائز اهمیت است، نمره‌ی مربوط به این بخش توسط داوران تیم علمی می‌تواند به صورت دستی تغییر پیدا کند.  
 **۵.۴.** تحویل چالش‌هایی که فلگ ندارند، توسط برگزارکنندگان ضبط خواهد شد و نسخه‌ی ضبطی، مستند مورد استفاده برای بررسی اعتراض‌ها خواهد بود.

## ۵. مالکیت و استفاده از داده‌ها

 **۱.۵.** کلیه‌ی کدها، گزارش‌ها و مستنداتی که توسط شرکت‌کنندگان تولید می‌شود، صرفاً برای ارزیابی و توسعه‌ی مسابقه استفاده شده و حقوق معنوی آن متعلق به تولیدکننده است.  
 **۲.۵.** برگزارکنندگان حق دارند داده‌های آماری، نتایج و تصاویر مسابقه را برای اهداف تبلیغاتی یا آموزشی استفاده کنند.

## ۶. موارد داوری و تصمیم‌گیری

 **۱.۶.** تمامی اعتراض‌ها و موارد خاص باید حداکثر تا یک ساعت پس از پایان مسابقه اعلام شوند.  
 **۲.۶.** تصمیم نهایی در خصوص امتیازدهی، تخلفات، یا شرایط پیش‌بینی‌نشده در اختیار تیم داوری خواهد بود.  
 **۳.۶.** تیم داوری حق دارد در صورت مشاهده‌ی هرگونه تقلب یا رفتار غیرحرفه‌ای، تیم را از مسابقه حذف کند.

## ۷. پشتیبانی و سوالات

 **۱.۷.** در طول مسابقه، کانال رسمی پشتیبانی جهت پاسخ‌گویی به سوالات فنی در دسترس خواهد بود.  
 **۲.۷.** پرسش‌ها باید به‌صورت عمومی و از طریق کانال رسمی مطرح شوند، مگر در موارد خاص.

`;

const englishMarkdown = `
# Welcome to the 7th edition of the “Hardware” competition!

Participation in this competition implies full acceptance of the following terms and conditions. Please read the sections below carefully.

## 1. General Conditions of Participation

 **1.2.** Participants may only compete in teams, each consisting of 3 members. \n
 **1.1.** Participation is open to all enthusiasts interested in the topics of the Internet of Things (IoT), security, and hardware reverse engineering. \n
 **1.3.** Each participant may only be a member of one team. Using fake identities or joining multiple teams will result in disqualification from all involved teams.

## 2. Competition Format

 **2.1.** The competition will be held in-person; remote participation is not allowed. \n
 **2.2.** Each team will be provided with one or more hardware devices (such as microcontrollers, development boards, or specific circuits) along with documentation. Teams are responsible for taking proper care of the hardware to the best of their ability. \n
 **2.3.** The general goals of the competition include writing code that results in desired functionality, such as running a game, extracting flags, or executing defined scenarios within the rules of the competition.

## 3. Limitations and Prohibitions

 **3.1.** Denial-of-Service (DoS) attacks or any harm to the competition infrastructure are strictly prohibited. \n
 **3.2.** Intentional physical damage to competition equipment will result in disqualification and require compensation for damages. \n
 **3.3.** The use of malicious tools or scripts that harm other teams or the judging system is not allowed. \n
 **3.4.** Any form of cooperation, flag or answer sharing between teams is prohibited and considered a violation for both parties. This will result in a score of zero for the involved challenge for both teams.

## 4. Scoring System

 **4.1.** Each challenge will be assigned a specific score based on the number of times it has been solved. \n
 **4.2.** The scoring system is dynamic, and the score for solving each problem will be calculated according to a specific formula.

$$
\\left\\lfloor19 + \\frac{981}{1+(\\frac{\\max\\{0, \\#S - 1\\}}{11.92})^{1.21}}\\right\\rfloor
$$

 **4.3.** The time each answer or flag is submitted, along with the team’s total score, determines the final ranking. \n
 **4.4.** Since the quality of deliverables in challenges with manual scoring is important, the score for these parts may be adjusted manually by the scientific committee judges. \n
 **4.5.** For challenges that do not involve flag submission, the deliverables will be recorded by the organizers, and the recorded version will serve as the reference in case of any objections.

## 5. Ownership and Use of Data

 **5.1.** All code, reports, and documentation produced by participants will be used solely for competition evaluation and development purposes, and their intellectual property rights remain with the creators. \n
 **5.2.** The organizers reserve the right to use statistical data, results, and images from the competition for promotional or educational purposes.

## 6. Judging and Decision-Making

 **6.1.** All objections and special cases must be reported no later than one hour after the competition ends. \n
 **6.2.** The final decision on scoring, violations, or unforeseen circumstances lies with the judging panel. \n
 **6.3.** The judging panel reserves the right to disqualify any team in the event of cheating or unprofessional behavior.

## 7. Support and Questions

 **7.1.** During the competition, an official support channel will be available to answer technical questions. \n
 **7.2.** Questions must be asked publicly and through the official channel, except in special cases.

`;

const Conditions = () => {
  const language = useLanguageStore((state) => state.language);

  return (
    <div>
      <Box px="10%" paddingTop="100px">
        <MarkdownViewer
          markdown={language == "en" ? englishMarkdown : persianMarkdown}
        />
      </Box>
    </div>
  );
};

export default Conditions;
