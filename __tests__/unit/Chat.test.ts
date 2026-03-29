// Chat.spec.ts
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Chat from "./Chat.vue";

describe("Chat 组件", () => {
  it('正确渲染 "hello" 文本', () => {
    const wrapper = mount(Chat);
    // 断言组件渲染出的文本内容包含 "hello"
    expect(wrapper.text()).toContain("hello");
  });

  it("根元素是一个 div", () => {
    const wrapper = mount(Chat);
    expect(wrapper.element.tagName).toBe("DIV");
  });
});
