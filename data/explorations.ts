export type Exploration = {
  id: string;
  title: string;
  image: string;
  /** Max height in px — varies per card, capped at 720 */
  maxH: number;
};

export const explorations: Exploration[] = [
  {
    id: "goals",
    title: "Goals",
    image: "/images/lab/Goals.png",
    maxH: 520,
  },
  {
    id: "healthtech",
    title: "Healthtech",
    image: "/images/lab/healthtech.png",
    maxH: 680,
  },
  {
    id: "reports",
    title: "Reports",
    image: "/images/lab/reports.png",
    maxH: 600,
  },
  {
    id: "xynehome",
    title: "Xyne Home",
    image: "/images/lab/xynehome.png",
    maxH: 440,
  },
  {
    id: "transfer-complete",
    title: "Transfer Complete",
    image: "/images/lab/transfer complete.png",
    maxH: 560,
  },
  {
    id: "upi-transfer",
    title: "UPI Transfer",
    image: "/images/lab/upitransfer.png",
    maxH: 500,
  },
  {
    id: "dotp",
    title: "OTP Design",
    image: "/images/lab/dotp.png",
    maxH: 480,
  },
  {
    id: "swiggy-otp",
    title: "Swiggy OTP",
    image: "/images/lab/swiggyotp.png",
    maxH: 540,
  },
  {
    id: "swishpp",
    title: "Swish Payment",
    image: "/images/lab/swishpp.png",
    maxH: 460,
  },
  {
    id: "vpa",
    title: "VPA",
    image: "/images/lab/vpa.png",
    maxH: 580,
  },
  {
    id: "acko",
    title: "Acko",
    image: "/images/lab/acko.png",
    maxH: 520,
  },
  {
    id: "studio",
    title: "Studio",
    image: "/images/lab/studio.png",
    maxH: 720,
  },
  {
    id: "shot-1",
    title: "Shot",
    image: "/images/lab/shot-1.png",
    maxH: 720,
  },
  {
    id: "body",
    title: "Body",
    image: "/images/lab/Body.png",
    maxH: 560,
  },
  {
    id: "home-screen",
    title: "Home Screen",
    image: "/images/lab/Home Screen.png",
    maxH: 540,
  },
  {
    id: "signin",
    title: "Sign In",
    image: "/images/lab/Signin/Login Page.png",
    maxH: 520,
  },
  {
    id: "itrfile",
    title: "ITR Filing",
    image: "/images/lab/itrfile.png",
    maxH: 720,
  },
  {
    id: "stepper",
    title: "Stepper",
    image: "/images/lab/stepper.png",
    maxH: 560,
  },
  {
    id: "tax",
    title: "Tax",
    image: "/images/lab/tax.png",
    maxH: 720,
  },
  {
    id: "tax-filing",
    title: "Tax Filing",
    image: "/images/lab/taxFiling.png",
    maxH: 600,
  },
  {
    id: "insurance",
    title: "Insurance",
    image: "/images/lab/insurance.png",
    maxH: 560,
  },
  {
    id: "hospital-details",
    title: "Hospital Details",
    image: "/images/lab/Hospital Details.png",
    maxH: 580,
  },
];
