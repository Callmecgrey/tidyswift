# tidy-swift

```
TidySwift/
├── TidySwift.xcodeproj
├── TidySwift.xcworkspace         // If you're using CocoaPods/Swift Package Manager
├── App/
│   ├── AppDelegate.swift
│   ├── SceneDelegate.swift       // For iOS 13+ projects
│   ├── Info.plist
│   └── Assets.xcassets
├── Sources/
│   ├── Models/                   // Data models for users, orders, etc.
│   │   ├── User.swift
│   │   ├── Order.swift
│   │   └── ...
│   ├── Views/                    // Reusable UI components and custom views
│   │   ├── Components/
│   │   │   ├── TidyButton.swift
│   │   │   └── TidyLabel.swift
│   │   ├── Cells/
│   │   │   ├── OrderCell.swift
│   │   │   └── ...
│   │   └── ...
│   ├── ViewControllers/          // Screen-specific view controllers
│   │   ├── LandingViewController.swift      // Home landing page: asks user to sign up or login
│   │   ├── LoginViewController.swift        // Login page
│   │   ├── SignupViewController.swift       // Signup page
│   │   ├── DashboardViewController.swift    // Home page after login
│   │   ├── CreateOrderViewController.swift    // Create an order page
│   │   ├── AcceptOrderViewController.swift    // Accept order page
│   │   ├── ListProductsViewController.swift   // List product page
│   │   └── OrderDetailsViewController.swift   // Additional order detail page (if needed)
│   ├── Networking/               // API calls and network layer
│   │   ├── APIManager.swift
│   │   ├── Endpoints.swift
│   │   └── NetworkConstants.swift
│   ├── Managers/                 // Logic controllers/managers for different app modules
│   │   ├── UserManager.swift
│   │   ├── OrderManager.swift
│   │   └── SessionManager.swift
│   ├── Services/                 // Services for payments, notifications, etc.
│   │   ├── PaymentService.swift
│   │   ├── NotificationService.swift
│   │   └── LaundryService.swift
│   └── Helpers/                  // Extensions, utilities, and helper functions
│       ├── Extensions/
│       │   ├── UIView+Extensions.swift
│       │   └── String+Extensions.swift
│       └── Utilities.swift
└── Resources/                    // Non-code resources
    ├── Localizations/            // Localization files (e.g., en.lproj, es.lproj)
    ├── Images/                   // Additional image assets not in the xcassets folder
    └── Fonts/                    // Custom fonts
```
