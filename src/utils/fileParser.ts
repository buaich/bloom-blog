// 解析Markdown文件,封装信息到Promise对象中
export function parseMarkdownFile(file: File): Promise<{
  noteTitle: string;
  noteContent: string;
}> {
  return new Promise((resolve, reject) => {
    // 判断是否为.md文件
    if (!file.name.toLocaleLowerCase().endsWith(".md")) {
      reject(new Error("only parse markdown file!"));
      return;
    }
    // 浏览器API，用于异步读取文件
    const reader = new FileReader();

    // 读取文件成功触发
    reader.onload = (event) => {
      // 文件名作为noteTitle
      const noteTitle = file.name.replace(/\.md$/i, "");
      // 文件内容作为noteContent
      const noteContent = (event.target?.result as string) || "";
      // 修改Promise对象中的数据
      resolve({ noteTitle, noteContent });
    };
    // 读取文件错误触发
    reader.onerror = (event) => reject(new Error("文件读取失败"));

    // 真正读取
    reader.readAsText(file);
  });
}
