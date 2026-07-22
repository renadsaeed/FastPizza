import { Link } from "react-router-dom";
export default function Button({ children, disabled, to, type, onClick }) {
  // const classname =
  //   "bg-yellow-300 py-3 px-4 rounded-full text-stone-800 font-semibold uppercase tracking-wide hover:bg-yellow-400 inline-block transition-colors duration-300 disabled:opacity-50 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:bg-yellow-400 disabled:cursor-not-allowed ";
  const base =
    "bg-yellow-300 rounded-full text-stone-800 font-semibold uppercase tracking-wide hover:bg-yellow-400 inline-block transition-colors duration-300 disabled:opacity-50 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:bg-yellow-400 disabled:cursor-not-allowed ";
  const style = {
    primary: base + " py-3 px-4 md:py-4 md:px-6 text-sm sm:text-base  mb-2 ",
    small: base + " py-2 px-3 md:px-5 md:py-2.5 mb-2 text-sm sm:text-base ",
    round:
      base +
      " py-1 px-3 md:py-1.5 md:px-3  md:px-5 md:py-2.5 mb-2 text-sm sm:text-base rounded-full ",
    secondary:
      " border border-stone-300  py-2 px-3 md:px-5 md:py-2.5 mb-2 text-sm sm:text-base rounded-full text-stone-400 font-semibold uppercase tracking-wide hover:bg-stone-300 inline-block transition-colors duration-300 disabled:opacity-50 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:bg-stone-300 disabled:cursor-not-allowed hover:text-stone-800 ",
  };

  if (to) {
    return (
      <Link to={to} className={style[type]}>
        {" "}
        {children}{" "}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button disabled={disabled} className={style[type]} onClick={onClick}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={style[type]}>
      {children}
    </button>
  );
}
