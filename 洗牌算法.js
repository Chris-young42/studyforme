/**
 * 对数组进行随机洗牌操作
 * 使用 Fisher-Yates 洗牌算法，确保每种排列的概率相等
 * @param {Array} arr - 需要洗牌的数组
 * @returns {Array} 返回洗牌后的新数组
 */
function shuffle(arr) {
  // 创建原数组的副本，避免修改原数组
  const a = arr.slice();
  // 使用 Fisher-Yates 洗牌算法从数组末尾开始向前处理
  // i 从数组最后一个元素的索引开始，逐步向前移动
  for (let i = a.length - 1; i > 0; i--) {
    // 在 [0, i] 范围内随机选择一个索引 j
    // 这确保了每个元素都有同等机会被选中
    const j = Math.floor(Math.random() * (i + 1));
    // 交换当前元素 a[i] 与随机选中的元素 a[j]
    // 使用 ES6 解构赋值进行交换，无需临时变量
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}