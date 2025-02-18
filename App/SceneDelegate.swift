import UIKit

class SceneDelegate: UIResponder, UIWindowSceneDelegate {

    var window: UIWindow?

    func scene(_ scene: UIScene,
               willConnectTo session: UISceneSession,
               options connectionOptions: UIScene.ConnectionOptions) {
        // Ensure we have a valid UIWindowScene
        guard let windowScene = (scene as? UIWindowScene) else { return }
        
        // Create a new UIWindow using the windowScene constructor
        let window = UIWindow(windowScene: windowScene)
        window.backgroundColor = .white  // Set the window's background color
        
        // Create an instance of your initial view controller
        let landingVC = LandingViewController()
        
        // Embed your landing view controller inside a navigation controller
        let navigationController = UINavigationController(rootViewController: landingVC)
        navigationController.navigationBar.barStyle = .default
        navigationController.navigationBar.isTranslucent = false
        navigationController.navigationBar.backgroundColor = .white
        
        // Set the rootViewController of the window to the navigation controller
        window.rootViewController = navigationController
        
        // Save and display the window
        self.window = window
        window.makeKeyAndVisible()
    }
    
    // Optional scene lifecycle methods
    func sceneDidDisconnect(_ scene: UIScene) {
        // Called when the scene is being released by the system.
    }

    func sceneDidBecomeActive(_ scene: UIScene) {
        // Called when the scene moves from an inactive state to an active state.
    }

    func sceneWillResignActive(_ scene: UIScene) {
        // Called when the scene will move from an active state to an inactive state.
    }

    func sceneWillEnterForeground(_ scene: UIScene) {
        // Called as the scene transitions from the background to the foreground.
    }

    func sceneDidEnterBackground(_ scene: UIScene) {
        // Called as the scene transitions from the foreground to the background.
    }
}