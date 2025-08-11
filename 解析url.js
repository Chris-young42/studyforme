/**
 * 解析URL字符串，返回包含URL各部分信息的对象
 * @param {string} url - 需要解析的URL字符串
 * @returns {Object} 包含URL各部分信息的对象，包括href、protocol、host、hostname、port、pathname、search、hash和query属性
 */
function parseUrl(url) {
  // 尝试创建一个<a>元素用于解析URL，如果在浏览器环境中可以利用浏览器内置的URL解析功能
  const a = document ? document.createElement("a") : null;
  if (a) {
    // 将URL赋值给<a>元素的href属性，浏览器会自动解析URL的各个部分
    a.href = url;
    
    // 初始化查询参数对象，用于存储URL中的查询参数键值对
    const query = {};
    
    // 提取查询字符串并移除开头的问号，例如将"?a=1&b=2"变为"a=1&b=2"
    const q = (a.search || "").replace(/^\?/, "");
    
    // 如果存在查询字符串，则解析其中的键值对
    if (q) {
      // 按"&"分割查询字符串为键值对数组，例如"a=1&b=2"变为["a=1", "b=2"]
      q.split("&").forEach((pair) => {
        // 将键值对按"="分割并解码，处理URL编码的字符
        const [k, v] = pair.split("=").map(decodeURIComponent);
        // 将键值对存储到query对象中
        query[k] = v;
      });
    }
    
    // 返回包含URL各部分信息的对象
    return {
      href: a.href,      // 完整URL
      protocol: a.protocol,  // 协议部分，如"http:"或"https:"
      host: a.host,      // 主机名和端口，如"example.com:8080"
      hostname: a.hostname,  // 主机名，如"example.com"
      port: a.port,      // 端口号，如"8080"
      pathname: a.pathname,  // 路径部分，如"/path/to/page"
      search: a.search,  // 查询字符串，如"?a=1&b=2"
      hash: a.hash,      // 锚点部分，如"#section1"
      query,             // 解析后的查询参数对象
    };
  }
  
  // Node环境降级处理，当document对象不存在时使用字符串操作解析URL
  // 按"#"分割URL为基本部分和锚点部分
  const [base, hash = ""] = url.split("#");
  // 按"?"分割基本部分为路径和查询字符串
  const [path, search = ""] = base.split("?");
  
  // 初始化查询参数对象
  const query = {};
  
  // 解析查询参数
  if (search) {
    // 按"&"分割查询字符串为键值对数组
    search.split("&").forEach((pair) => {
      // 将键值对按"="分割并解码
      const [k, v] = pair.split("=").map(decodeURIComponent);
      // 将键值对存储到query对象中
      query[k] = v;
    });
  }
  
  // 返回解析结果对象
  return {
    href: url,                           // 完整URL
    pathname: path,                      // 路径部分
    search: search ? `?${search}` : "",  // 查询字符串，需要手动添加前缀"?"
    hash: hash ? `#${hash}` : "",        // 锚点部分，需要手动添加前缀"#"
    query,                               // 解析后的查询参数对象
  };
}