/**
 * 数组扁平化工具函数集合
 * 将多维数组转换为一维数组的多种实现方式
 */

/**
 * 方法1: 使用递归实现数组扁平化
 * @param {Array} arr - 需要扁平化的多维数组
 * @returns {Array} 扁平化后的一维数组
 */
function flatten1(arr) {
  // 创建结果数组
  const result = [];
  
  // 遍历数组中的每个元素
  for (let i = 0; i < arr.length; i++) {
    // 如果元素是数组，则递归调用flatten1并展开结果
    if (Array.isArray(arr[i])) {
      result.push(...flatten1(arr[i]));
    } else {
      // 如果元素不是数组，则直接添加到结果数组中
      result.push(arr[i]);
    }
  }
  
  // 返回扁平化后的数组
  return result;
}

/**
 * 方法2: 使用reduce实现数组扁平化
 * @param {Array} arr - 需要扁平化的多维数组
 * @returns {Array} 扁平化后的一维数组
 */
function flatten2(arr) {
  // 使用reduce累积处理数组中的每个元素
  return arr.reduce((prev, cur) => {
    // 如果当前元素是数组，则递归处理并连接到累积结果中
    // 否则直接将元素添加到累积结果中
    return prev.concat(Array.isArray(cur) ? flatten2(cur) : cur);
  }, []); // 初始值为空数组
}

/**
 * 方法3: 使用ES6的flat方法实现数组扁平化
 * @param {Array} arr - 需要扁平化的多维数组
 * @param {number} depth - 指定要扁平化的深度，默认为Infinity（完全扁平化）
 * @returns {Array} 扁平化后的数组
 */
function flatten3(arr, depth = Infinity) {
  // 直接使用ES6的flat方法进行扁平化
  return arr.flat(depth);
}

/**
 * 方法4: 使用栈实现数组扁平化（迭代方式）
 * @param {Array} arr - 需要扁平化的多维数组
 * @returns {Array} 扁平化后的一维数组
 */
function flatten4(arr) {
  // 创建栈结构，用于存储待处理的元素
  const stack = [...arr];
  // 存储最终结果
  const result = [];
  
  // 当栈不为空时继续处理
  while (stack.length > 0) {
    // 弹出栈顶元素
    const next = stack.pop();
    
    // 如果弹出的元素是数组，则将其元素逆序后压入栈中
    // 逆序是为了保证元素的原始顺序
    if (Array.isArray(next)) {
      stack.push(...next.reverse());
    } else {
      // 如果不是数组，则添加到结果数组的开头以保持原始顺序
      result.unshift(next);
    }
  }
  
  // 返回扁平化后的数组
  return result;
}

/**
 * 方法5: 使用toString和split实现数组扁平化（仅适用于数组元素都是数字的情况）
 * @param {Array} arr - 需要扁平化的多维数组（元素必须都是数字）
 * @returns {Array} 扁平化后的一维数组
 */
function flatten5(arr) {
  // 将数组转换为字符串，再按逗号分割，最后转换回数字
  return arr.toString().split(',').map(item => +item);
}

// 使用示例:
// const testArray = [1, [2, 3, [4, 5]], 6, [7, [8, 9]]];
// console.log(flatten1(testArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flatten2(testArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flatten3(testArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flatten4(testArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// console.log(flatten5(testArray)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]