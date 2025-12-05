<div align="center">

# YiJinJing App  
### A lightweight intelligent-finance frontend powered by our open-source model stack

</div>

---

## Overview

YiJinJing App 是一个基于 **Vite + React + TypeScript** 构建的轻量级智能金融应用前端。  
它作为整个“易金经（YiJinJing）”体系的用户界面层，承载了图像展示、交互式体验与移动端适配等关键功能。

该 App 由我们开源的 **YiJinJing Model Project** 提供智能能力支撑，包括：

- 大模型推理接口（LLM inference）  
- 技术分析提示词结构（prompting schemes）  
- 策略建模模块（modeling backbone）
- 数据解析与语义层补全（semantic reasoning layer）

通过将模型能力与前端 UI 整合，YiJinJing 实现了一个可运行、可交互的智能投研与知识体验 Demo。

---

## Run Locally

**Prerequisites:** Node.js (v18+ recommended)

### 1. Install dependencies
```bash
npm install
GEMINI_API_KEY=your_key_here
2. Configure keys

在 .env.local 中设置你的 Gemini API Key：

GEMINI_API_KEY=your_key_here


若与我们开源的 YiJinJing-Model 项目联动，请在其中启动本地模型服务并在此处配置：

MODEL_API_URL=http://localhost:8000/api

3. Start development server
npm run dev


启动后，你即可在浏览器或移动端查看完整的 UI 与交互效果。

Project Structure
YiJinJing/
 ├── index.html
 ├── index.tsx
 ├── vite.config.ts
 ├── metadata.json
 ├── assets/               # App UI images and static files
 └── components/           # UI components for image-based experience

Integration with the YiJinJing Model Project

YiJinJing App 并非单独存在，它与开源模型项目形成 “前端展示层 + 智能推理层” 的双层结构：

模块	作用
YiJinJing App（本仓库）	前端界面、交互体验、图片内容呈现
YiJinJing Model Project	智能策略推理、语义分析、技术模型支撑

App 中所有智能能力如技术分析生成、语义总结、智能提示等，均由 YiJinJing Model 提供计算支持。

这使得 YiJinJing 成为一个可运行、可扩展、可二次开发的智能金融体系 Demo。

Future Work

与更多模型端点适配（Gemini / DeepSeek / Llama / YiJinJing-LLM）

移动端更完善的界面交互

完整投研流程打通

多模态内容承载（图像、文本、K线、策略逻辑）
