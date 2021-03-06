// 描述 v8 新生代存储区垃圾回收的流程

/*
新生代对象：存活时间较短的对象，局部变量

空间复制算法 + 标记整理算法
将新生代区一分为二，两个等大的空间，使用空间和空闲空间
使用空间状态是from，空闲空间状态是to；
活动对象都存储于from空间；
from区的对象进行标记整理后，将活动对象拷贝到to区，备份 
from区完成释放，from和to交换空间

细节注意点：
拷贝过程中可能会出现晋升；
晋升就是将新生代区的对象放到老生代区
晋升两种情况会出现：
1.一轮GC过后，还存在的新生代对象
2.to的空间使用率超过25%，那就要将这些对象移动到老生代区，为了给from留足够的空间
*/