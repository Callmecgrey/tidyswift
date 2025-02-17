import UIKit

class LandingViewController: UIViewController {

    // MARK: - UI Elements

    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Welcome to TidyRide"
        label.font = UIFont.boldSystemFont(ofSize: 32)
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let loginButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Login", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20, weight: .medium)
        button.backgroundColor = UIColor.systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let signupButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Sign Up", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20, weight: .medium)
        button.backgroundColor = UIColor.systemGreen
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    // MARK: - View Lifecycle

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        setupUI()
        setupActions()
    }
    
    // MARK: - Setup Methods

    private func setupUI() {
        view.addSubview(titleLabel)
        view.addSubview(loginButton)
        view.addSubview(signupButton)
        
        // Set up Auto Layout constraints
        NSLayoutConstraint.activate([
            // Title Label Constraints
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 80),
            titleLabel.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            titleLabel.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            
            // Login Button Constraints
            loginButton.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 40),
            loginButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            loginButton.widthAnchor.constraint(equalToConstant: 200),
            loginButton.heightAnchor.constraint(equalToConstant: 50),
            
            // Signup Button Constraints
            signupButton.topAnchor.constraint(equalTo: loginButton.bottomAnchor, constant: 20),
            signupButton.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            signupButton.widthAnchor.constraint(equalToConstant: 200),
            signupButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    private func setupActions() {
        loginButton.addTarget(self, action: #selector(loginTapped), for: .touchUpInside)
        signupButton.addTarget(self, action: #selector(signupTapped), for: .touchUpInside)
    }
    
    // MARK: - Button Actions

    @objc private func loginTapped() {
        // Navigate to the Login page
        let loginVC = LoginViewController()
        navigationController?.pushViewController(loginVC, animated: true)
    }
    
    @objc private func signupTapped() {
        // Navigate to the Signup page
        let signupVC = SignupViewController()
        navigationController?.pushViewController(signupVC, animated: true)
    }
}
