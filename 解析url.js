function parseUrl(url) {
  const a = document ? document.createElement("a") : null;
  if (a) {
    a.href = url;
    const query = {};
    const q = (a.search || "").replace(/^\?/, "");
    if (q) {
      q.split("&").forEach((pair) => {
        const [k, v] = pair.split("=").map(decodeURIComponent);
        query[k] = v;
      });
    }
    return {
      href: a.href,
      protocol: a.protocol,
      host: a.host,
      hostname: a.hostname,
      port: a.port,
      pathname: a.pathname,
      search: a.search,
      hash: a.hash,
      query,
    };
  }
  // Node 环境 fallback
  const [base, hash = ""] = url.split("#");
  const [path, search = ""] = base.split("?");
  const query = {};
  if (search) {
    search.split("&").forEach((pair) => {
      const [k, v] = pair.split("=").map(decodeURIComponent);
      query[k] = v;
    });
  }
  return {
    href: url,
    pathname: path,
    search: search ? `?${search}` : "",
    hash: hash ? `#${hash}` : "",
    query,
  };
}
