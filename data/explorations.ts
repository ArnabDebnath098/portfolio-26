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
];
