/**
 * 纯字符串解析URL（适合Node环境，且不依赖Node内置URL API）
 * @param {string} url - 需要解析的URL字符串
 * @returns {Object} 包含href、protocol、host、hostname、port、pathname、search、hash和query等属性
 * 返回对象包含:
 *   - href: 原始URL
 *   - protocol: 协议部分，如 'http:'
 *   - host: 主机名和端口，如 'example.com:8080'
 *   - hostname: 主机名，如 'example.com'
 *   - port: 端口号，如 '8080'
 *   - pathname: 路径部分，如 '/path/to/page'
 *   - search: 查询字符串，如 '?param=value'
 *   - hash: 哈希部分，如 '#section'
 *   - query: 查询参数对象，如 {param: 'value'}
 */
function parseUrl(url) {
  const result = {
    href: url,
    protocol: '',
    host: '',
    hostname: '',
    port: '',
    pathname: '',
    search: '',
    hash: '',
    query: {},
  };

  // 先拆 hash
  let [urlWithoutHash, hash = ''] = url.split('#');
  result.hash = hash ? `#${hash}` : '';

  // 再拆 search
  let [urlWithoutSearch, search = ''] = urlWithoutHash.split('?');
  result.search = search ? `?${search}` : '';

  // 解析 query 参数
  if (search) {
    search.split('&').forEach(pair => {
      if (!pair) return;
      const [k, v] = pair.split('=').map(decodeURIComponent);
      result.query[k] = v;
    });
  }

  // 解析 protocol
  const protocolMatch = urlWithoutSearch.match(/^([a-z0-9.+-]+:)?\/\//i);
  if (protocolMatch) {
    result.protocol = protocolMatch[1] || '';
    urlWithoutSearch = urlWithoutSearch.slice(protocolMatch[0].length);
  }

  // 解析 host (hostname + port) 和 pathname
  const slashIndex = urlWithoutSearch.indexOf('/');
  if (slashIndex === -1) {
    // 没有路径，全部是host
    result.host = urlWithoutSearch;
    result.pathname = '/';
  } else {
    result.host = urlWithoutSearch.slice(0, slashIndex);
    result.pathname = urlWithoutSearch.slice(slashIndex) || '/';
  }

  // 分割 hostname 和 port
  const portIndex = result.host.indexOf(':');
  if (portIndex !== -1) {
    result.hostname = result.host.slice(0, portIndex);
    result.port = result.host.slice(portIndex + 1);
  } else {
    result.hostname = result.host;
    result.port = '';
  }

  return result;
}