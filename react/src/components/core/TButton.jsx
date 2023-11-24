import { Link } from "react-router-dom"

export default function TButton({

    color = "indigo",
    to = "",
    circle = false,
    href = '',
    link = false,
    target = "_blank",
    onClick = () => {},
    children

}) {

    let classes = [
        "flex",
        "whitespace-nowrap",
        "text-sm",
        "border",
        "border-2",
        "border-transparent",
    ];

    if (link) {
        classes = [
            ...classes,
            "transition-colors"
        ];

        switch (color){
            case "indigo":
                classes = [
                    ...classes,
                    "text-indigo-600",
                    "hover:bg-indigo-50",
                    "hover:border-indigo-600",
                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:ring-indigo-500",
                    "focus:border-indigo-600",
                    "active:bg-indigo-600",
                    "active:text-white"
                ]
                break;
            case "red":
                classes = [...classes, "text-red-500", "focus:ring-red-500", "hover:bg-red-50", "hover:border-red-500", "active:bg-red-500", "active:text-white"];
                
        }

    }  else {
        classes = [...classes, "text-white", "focus:ring-2", "focus:ring-offset-2"];
    
        switch (color) {
          case "indigo":
            classes = [
              ...classes,
              "bg-indigo-600",
              "hover:bg-indigo-700",
              "focus:ring-indigo-500",
            ];
            break;
          case "red":
            classes = [
              ...classes,
              "bg-red-600",
              "hover:bg-red-700",
              "focus:ring-red-500",
            ];
            break;
          case "green":
            classes = [
              ...classes,
              "bg-emerald-500",
              "hover:bg-emerald-600",
              "focus:ring-emerald-400",
            ];
            break;
        }
      }
    
      if (circle) {
        classes = [
          ...classes,
          "h-8",
          "w-8",
          "items-center",
          "justify-center",
          "rounded-full",
          "text-sm",
        ];
      } else {
        classes = [...classes, "p-0", "py-2", "px-4", "rounded-md"];
      }


  return (
    <>
      {href && (
        <a href={href} className={classes.join(" ")} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={classes.join(" ")}>{children}</button>
      )}
    </>
  )

}
