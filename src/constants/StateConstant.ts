enum StateConstant {
  // 初始化状态
  INIT = 0,
  // 等待开始状态
  WAIT_START = 1,
  // 开始状态
  START = 2,
  // 等待结果状态
  WAIT_END = 3,
  // 结果状态
  END = 4,
  // 结果状态
  PRIZE = 5,
  // 重置状态
  RESET = 6,
  // 不可用状态
  DISABLE = 100,
}

export default StateConstant;
