const { URL } = require('url');

/**
 * 解析URL字符串，返回包含URL各部分信息的对象
 * @param {string} url - 需要解析的URL字符串
 * @returns {Object} 包含URL各部分信息的对象，包括href、protocol、host、hostname、port、pathname、search、hash和query属性
 */
function parseUrl(url) {
  try {
    const myUrl = new URL(url);

    // 解析查询参数
    const query = {};
    for (const [key, value] of myUrl.searchParams.entries()) {
      query[key] = value;
    }

    return {
      href: myUrl.href,
      protocol: myUrl.protocol,
      host: myUrl.host,
      hostname: myUrl.hostname,
      port: myUrl.port,
      pathname: myUrl.pathname,
      search: myUrl.search,
      hash: myUrl.hash,
      query,
    };
  } catch (error) {
    // 如果传入的 url 无效，可以返回空对象或抛出异常
    console.error('Invalid URL:', error.message);
    return null;
  }
}

module.exports = parseUrl;