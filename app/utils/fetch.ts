// next app router fetch, can be used in both server and client side，can config base url
export const hFetch = async (url: string, options: any) => {
  //   const baseUrl =
  //     process.env.NODE_ENV === "development"
  //       ? "http://localhost:3000"
  //       : process.env.NEXT_PUBLIC_BASE_URL;
  // check if is server side, if is server side, add cookie to request headers
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    options.headers = {
      ...options.headers,
      cookie: cookies().toString(),
    };
  }
  if (url.startsWith("/")) {
    url = url.slice(1);
  }
  return fetch(`${url}`, options);
};
