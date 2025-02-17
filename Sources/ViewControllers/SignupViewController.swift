import UIKit

class SignupViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        title = "Sign Up"
        
        let label = UILabel()
        label.text = "Signup Page"
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
