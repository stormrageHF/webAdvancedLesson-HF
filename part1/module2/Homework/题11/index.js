// 描述标记整理算法的工作流程

/*
是标记清除算法的增强版
主要分标记阶段和清除阶段
1.遍历所有的对象，将活动的对象标记出来
2.清除阶段，会先执行整理，移动对象位置，使空间地址连续
3.清除所有未标记对象，将标记抹除
4.把回收的空间放到空闲列表上，方便后序程序申请

*/