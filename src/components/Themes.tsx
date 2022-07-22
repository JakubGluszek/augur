import React from "react";

const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]

const Themes: React.FC = () => {
  const setTheme = (name: string) => {
    const html = document.querySelector("html")
    html?.setAttribute("data-theme", name)
    sessionStorage.setItem("theme", name)
  }

  return (
    <>
      {
        themes.map(v =>
          <li
            className="bg-base-100 text-base-cotent w-full cursor-pointer rounded-lg h-10"
            key={v}
            data-theme={v}
            onClick={() => setTheme(v)}
          >
            <div className="w-full h-full flex flex-row p-2">
              <div className="grow">{v}</div>
              <div className="w-fit h-full flex flex-row gap-1">
                <div className="bg-primary w-2 rounded h-full"></div>
                <div className="bg-secondary w-2 rounded h-full"></div>
                <div className="bg-accent w-2 rounded h-full"></div>
                <div className="bg-neutral w-2 rounded h-full"></div>
              </div>
            </div>
          </li>
        )
      }
    </>
  )
};

export default Themes;

