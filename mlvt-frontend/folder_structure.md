```
└── 📁mlvt_project
    └── 📁public
        └── index.html
        └── manifest.json
    └── 📁src
        └── 📁assets    #this folder for permanent img used in project like logo,...
            └── avatar.png
            └── background.jpg
        └── 📁components #this folder to contain your components that is reusable in pages
            └── 📁main
                └── index.tsx
            └── 📁navbar
                └── index.tsx
            └── 📁ProcessedVidPopUp
                └── index.tsx
            └── 📁searchbar
                └── index.tsx
            └── 📁sidebar
                └── index.tsx
            └── 📁signup
                └── index.tsx
            └── 📁SocialLoginButton
                └── FacebookLoginButton.tsx
                └── GoogleLoginButton.tsx
                └── SocialLoginButton.tsx
            └── 📁VideoTransPopUp
                └── index.tsx
            └── 📁your-project
                └── index.tsx
        └── 📁config #!IMPORTANT I define the color/ font used for whole project here.
            └── theme.tsx
        └── 📁layout #This folder help to structure some pages that have similar layout
            └── index.tsx
            └── loginSignup.tsx
        └── 📁pages #Your page lie here
            └── 📁error
                └── index.tsx
            └── 📁home
                └── index.tsx
            └── 📁login
                └── index.tsx
            └── 📁signup
                └── index.tsx
        └── 📁prefabs
            └── HTML.jsx
            └── MUI.jsx
        └── 📁types
            └── Project.ts
        └── App.css
        └── App.test.tsx
        └── App.tsx
        └── index.css
        └── index.tsx
        └── react-app-env.d.ts
        └── reportWebVitals.ts
        └── routes.tsx #IMPORTANT define the route to page 
        └── setupTests.ts
    └── .gitignore
    └── config-overrides.js
    └── mightymeld.json
    └── mightymeld.secrets
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.json
```