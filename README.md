# IT Blog

This is an IT Blog built with Astro, a modern static site generator, **created for learning purposes**. The blog covers various topics, including data science, design, and programming. The project is designed to be fast, flexible, and easy to maintain.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BlogPostList.tsx
│   │   ├── Comments.tsx
│   ├── content/
│   │   ├── blog/
│   │   │   ├── data-science/
│   │   │   │   └── *.md
│   │   │   ├── design/
│   │   │   │   ├── *.md
│   │   │   ├── programming/
│   │   │   │   └── *.md
│   ├── layouts/
│   │   ├── BlogPost.astro
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── [category]/
│   │   │   └── [slug].astro
│   │   ├── data-science.astro
│   │   ├── design.astro
│   │   ├── index.astro
│   │   └── programming.astro
└── package.json
```

## 📚 Blog Content

The blog content is organized into categories such as data science, design, and programming. Each category has its own folder under `src/content/blog/`.

## 🛠️ Components

The project includes several reusable components such as `BlogPostList` and `Comments`. These components are located in the `src/components/` directory.

## 📄 Layouts

The project uses layout components to structure the pages. The main layouts are `BlogPost.astro` and `Layout.astro`, located in the `src/layouts/` directory.

## 🏃‍♂️ Running the Project

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:4321
   ```

## 📦 Building for Production

To build the project for production, run:

```sh
npm run build
```

The built files will be located in the `./dist/` directory.

## 🔍 Previewing the Build

To preview the built site locally, run:

```sh
npm run preview
```

This will start a local server to preview the production build.

