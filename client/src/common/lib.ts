export const setCookie = (cname: string, cvalue: string) => {
  const d = new Date();
  d.setTime(d.getTime() + 3500 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  if (window.localStorage) {
    localStorage.setItem("keyExpires", d.toUTCString());
  }
};

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function stringToColor(string: string, hightlight: boolean) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  return (
    "rgba(" +
    (parseInt(`${color.substr(0, 2)}`, 16) % 255) +
    "," +
    (parseInt(`${color.substr(2, 2)}`, 16) % 255) +
    "," +
    (parseInt(`${color.substr(4, 2)}`, 16) % 255) +
    "," +
    (hightlight ? "0.9" : "0.2") +
    ")"
  );
}

export function stringAvatar(
  user: {
    name: string;
    url?: any | undefined;
  },
  size: {
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
  }
) {
  return {
    sx: {
      color: stringToColor(user.name, true),
      bgcolor: stringToColor(user.name, false),
      width: size.width,
      height: size.height,
      fontSize: size.fontSize ? size.fontSize : "16px",
    },
    children: `${
      user.name.split(" ").length > 1
        ? user.name.split(" ")[0][0] + user.name.split(" ")[1][0]
        : user.name.split("")[0]
    }`,
    src: user.url,
    alt: user.name || "Khach hang",
  };
}
