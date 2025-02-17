import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
        
        // Ensure we have a valid windowScene
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        // Create a new UIWindow using the windowScene constructor
        let window = UIWindow(windowScene: windowScene)
        
        // Create an instance of your initial view controller (LandingViewController)
        let landingVC = LandingViewController()
        
        // Embed your landing page inside a navigation controller
        let navigationController = UINavigationController(rootViewController: landingVC)
        
        // Set the rootViewController of the window to the navigation controller
        window.rootViewController = navigationController
        
        // Make the window visible
        self.window = window
        window.makeKeyAndVisible()
    }
}
