import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    // Called when the application has finished launching.
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Customize initial setup if needed.
        return true
    }
    
    // MARK: - UISceneSession Lifecycle (for iOS 13+)
    
    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        // Create a new scene with the default configuration.
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }
    
    func application(_ application: UIApplication, didDiscardSceneSessions sceneSessions: Set<UISceneSession>) {
        // Handle cleanup of any discarded scenes here.
    }
}
