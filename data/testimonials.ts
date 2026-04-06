export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  initials: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "sajin",
    name: "Sajin P Asokan",
    role: "Concept Artist & Creative Consultant",
    company: "Ex-JUSPAY",
    quote:
      "I highly recommend Arnab Debnath. His dedication, creativity, and problem-solving skills are exceptional. Arnab consistently delivers results and is a valuable team player. It's been a pleasure collaborating with him.",
    initials: "SA",
    avatar: "/images/testimonial/sajin.jpeg",
  },
  {
    id: "riz",
    name: "Riz Ainuddin",
    role: "Design & Operations Leader",
    company: "Ex-LottieFiles, AirAsia",
    quote:
      "Arnab showed genuine interest in learning what it takes to be a self-taught product designer and the type of person who takes criticism well. He is a fast learner, took immediate action upon receiving feedback and delivered the results he needed. I believe he will succeed as an upcoming professional as a designer.",
    initials: "RA",
    avatar: "/images/testimonial/riz.jpeg",
  },
  {
    id: "mayank",
    name: "Mayank Kumar",
    role: "Corporate Development Manager",
    company: "Exponent Energy · Ex-Juspay, ICICI Bank",
    quote:
      "Arnab by far is one of the best product designers I have come across. His ability to grasp requirements and turn them into product consumable is impeccable. What differentiates Arnab from his peers is his understanding of the business and customer. He doesn't fall into Analysis-Paralysis and is able to turn things around quicker than you would expect. Always at his A-Game!",
    initials: "MK",
    avatar: "/images/testimonial/Mayank.jpeg",
  },
  {
    id: "avinash",
    name: "Avinash Gupta",
    role: "Assistant Manager – Creative",
    company: "Clear · Ex-Juspay",
    quote:
      "Had the pleasure of working with Arnab on the Smart Convert and Offers module. He is highly enthusiastic, organized, and approaches problem-solving with great attention to detail. Arnab's dedication and planning skills make him a valuable team member. I highly recommend him for any project or opportunity.",
    initials: "AG",
    avatar: "/images/testimonial/avinash.jpeg",
  },
  {
    id: "anubha",
    name: "Anubha Mishra",
    role: "Product",
    company: "Zeta · Ex-Juspay",
    quote:
      "I have worked with Arnab on various projects during my time at Juspay and I cannot recommend him enough! I can easily say that I have never come across any designer who not only has a strong grasp of design trends but also tries to achieve continually better designs with creativity and practice. He has always brought fresh ideas to a problem and has never hesitated to explore a wide range of design possibilities. He always understands a given problem very well, fully understands the needs and approaches a solution ensuring functionality and user-experience as priorities. I have seen him transform multiple payment problems into intuitive, elegantly designed solutions and it has been a learning experience for me to see his work.",
    initials: "AM",
    avatar: "/images/testimonial/anubha.jpeg",
  },
];
