#!/bin/bash

# Using the current directory as the base folder
BASE_DIR="."

echo "Creating TidySwift folder structure in the current directory..."

# Create project files in the base directory
touch "$BASE_DIR/TidySwift.xcodeproj"
touch "$BASE_DIR/TidySwift.xcworkspace"

# Create App directory and files
mkdir -p "$BASE_DIR/App/Assets.xcassets"
touch "$BASE_DIR/App/AppDelegate.swift"
touch "$BASE_DIR/App/SceneDelegate.swift"
touch "$BASE_DIR/App/Info.plist"

# Create Sources directory and subdirectories

# Models
mkdir -p "$BASE_DIR/Sources/Models"
touch "$BASE_DIR/Sources/Models/User.swift"
touch "$BASE_DIR/Sources/Models/Order.swift"

# Views
mkdir -p "$BASE_DIR/Sources/Views/Components"
touch "$BASE_DIR/Sources/Views/Components/TidyButton.swift"
touch "$BASE_DIR/Sources/Views/Components/TidyLabel.swift"

mkdir -p "$BASE_DIR/Sources/Views/Cells"
touch "$BASE_DIR/Sources/Views/Cells/OrderCell.swift"

# ViewControllers (New Pages)
mkdir -p "$BASE_DIR/Sources/ViewControllers"
touch "$BASE_DIR/Sources/ViewControllers/LandingViewController.swift"      # Home landing page (sign up / login)
touch "$BASE_DIR/Sources/ViewControllers/LoginViewController.swift"        # Login page
touch "$BASE_DIR/Sources/ViewControllers/SignupViewController.swift"       # Signup page
touch "$BASE_DIR/Sources/ViewControllers/DashboardViewController.swift"    # Home page after login
touch "$BASE_DIR/Sources/ViewControllers/CreateOrderViewController.swift"  # Create an order page
touch "$BASE_DIR/Sources/ViewControllers/AcceptOrderViewController.swift"  # Accept order page
touch "$BASE_DIR/Sources/ViewControllers/ListProductsViewController.swift" # List product page
touch "$BASE_DIR/Sources/ViewControllers/OrderDetailsViewController.swift" # Order details page (if needed)

# Networking
mkdir -p "$BASE_DIR/Sources/Networking"
touch "$BASE_DIR/Sources/Networking/APIManager.swift"
touch "$BASE_DIR/Sources/Networking/Endpoints.swift"
touch "$BASE_DIR/Sources/Networking/NetworkConstants.swift"

# Managers
mkdir -p "$BASE_DIR/Sources/Managers"
touch "$BASE_DIR/Sources/Managers/UserManager.swift"
touch "$BASE_DIR/Sources/Managers/OrderManager.swift"
touch "$BASE_DIR/Sources/Managers/SessionManager.swift"

# Services
mkdir -p "$BASE_DIR/Sources/Services"
touch "$BASE_DIR/Sources/Services/PaymentService.swift"
touch "$BASE_DIR/Sources/Services/NotificationService.swift"
touch "$BASE_DIR/Sources/Services/LaundryService.swift"

# Helpers
mkdir -p "$BASE_DIR/Sources/Helpers/Extensions"
touch "$BASE_DIR/Sources/Helpers/Extensions/UIView+Extensions.swift"
touch "$BASE_DIR/Sources/Helpers/Extensions/String+Extensions.swift"
touch "$BASE_DIR/Sources/Helpers/Utilities.swift"

# Create Resources directory and subdirectories
mkdir -p "$BASE_DIR/Resources/Localizations"
mkdir -p "$BASE_DIR/Resources/Images"
mkdir -p "$BASE_DIR/Resources/Fonts"

echo "Folder structure created successfully!"
