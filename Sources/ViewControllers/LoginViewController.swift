import UIKit

class LoginViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        title = "Login"
        
        let label = UILabel()
        label.text = "Login Page"
        label.font = UIFont.systemFont(ofSize: 24)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(label)
        NSLayoutConstraint.activate([
            label.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            label.centerXAnchor.constraint(equalTo: view.centerXAnchor)
        ])
    }
}
