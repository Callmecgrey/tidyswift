import UIKit

// MARK: - Account Type Enum

enum AccountType {
    case user
    case driver
    case professional
}

// MARK: - SignupViewController (Account Selection)

class SignupViewController: UIViewController {
    
    // MARK: - Properties
    
    private var selectedAccountType: AccountType?
    
    // MARK: - UI Elements
    
    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Select Account Type"
        label.font = UIFont.boldSystemFont(ofSize: 24)
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    // Radio-style buttons implemented as UIButtons.
    private let userButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("  Account for Users", for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.setImage(UIImage(systemName: "circle"), for: .normal)
        button.setImage(UIImage(systemName: "largecircle.fill.circle"), for: .selected)
        button.tintColor = .systemBlue
        button.contentHorizontalAlignment = .left
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let driverButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("  Account for Drivers", for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.setImage(UIImage(systemName: "circle"), for: .normal)
        button.setImage(UIImage(systemName: "largecircle.fill.circle"), for: .selected)
        button.tintColor = .systemBlue
        button.contentHorizontalAlignment = .left
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let professionalButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("  Account for Professional Services", for: .normal)
        button.setTitleColor(.black, for: .normal)
        button.setImage(UIImage(systemName: "circle"), for: .normal)
        button.setImage(UIImage(systemName: "largecircle.fill.circle"), for: .selected)
        button.tintColor = .systemBlue
        button.contentHorizontalAlignment = .left
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let continueButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Continue", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        // Initially disabled until an option is selected.
        button.isEnabled = false
        button.alpha = 0.5
        return button
    }()
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        title = "Sign Up"
        
        setupUI()
        setupActions()
    }
    
    // MARK: - UI Setup
    
    private func setupUI() {
        view.addSubview(titleLabel)
        view.addSubview(userButton)
        view.addSubview(driverButton)
        view.addSubview(professionalButton)
        view.addSubview(continueButton)
        
        NSLayoutConstraint.activate([
            // Title at top
            titleLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            titleLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor),
            
            // User button
            userButton.topAnchor.constraint(equalTo: titleLabel.bottomAnchor, constant: 40),
            userButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            userButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            userButton.heightAnchor.constraint(equalToConstant: 44),
            
            // Driver button
            driverButton.topAnchor.constraint(equalTo: userButton.bottomAnchor, constant: 20),
            driverButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            driverButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            driverButton.heightAnchor.constraint(equalToConstant: 44),
            
            // Professional button
            professionalButton.topAnchor.constraint(equalTo: driverButton.bottomAnchor, constant: 20),
            professionalButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            professionalButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            professionalButton.heightAnchor.constraint(equalToConstant: 44),
            
            // Continue button at bottom
            continueButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -40),
            continueButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            continueButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            continueButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    // MARK: - Actions Setup
    
    private func setupActions() {
        userButton.addTarget(self, action: #selector(accountTypeSelected(_:)), for: .touchUpInside)
        driverButton.addTarget(self, action: #selector(accountTypeSelected(_:)), for: .touchUpInside)
        professionalButton.addTarget(self, action: #selector(accountTypeSelected(_:)), for: .touchUpInside)
        continueButton.addTarget(self, action: #selector(continueTapped), for: .touchUpInside)
    }
    
    @objc private func accountTypeSelected(_ sender: UIButton) {
        // Deselect all radio buttons.
        [userButton, driverButton, professionalButton].forEach { $0.isSelected = false }
        
        // Select the tapped button.
        sender.isSelected = true
        
        // Update the selected account type.
        if sender == userButton {
            selectedAccountType = .user
        } else if sender == driverButton {
            selectedAccountType = .driver
        } else if sender == professionalButton {
            selectedAccountType = .professional
        }
        
        // Enable the Continue button.
        continueButton.isEnabled = true
        continueButton.alpha = 1.0
    }
    
    @objc private func continueTapped() {
        guard let accountType = selectedAccountType else { return }
        
        // Navigate based on selected account type.
        switch accountType {
        case .user:
            let userVC = SignupUserViewController()
            navigationController?.pushViewController(userVC, animated: true)
        case .driver:
            let driverVC = SignupDriverViewController()
            navigationController?.pushViewController(driverVC, animated: true)
        case .professional:
            let professionalVC = SignupProfessionalViewController()
            navigationController?.pushViewController(professionalVC, animated: true)
        }
    }
}

// MARK: - Common OTP Verification Screen

class SignupOTPViewController: UIViewController, UITextFieldDelegate {
    
    // Email (or business email) is passed in to display the message.
    var email: String = ""
    
    private let titleLabel: UILabel = {
        let label = UILabel()
        label.text = "Enter OTP Code"
        label.font = UIFont.boldSystemFont(ofSize: 24)
        label.textColor = .systemBlue
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let messageLabel: UILabel = {
        let label = UILabel()
        label.textColor = .systemBlue
        label.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    // Create 6 OTP text fields (one character each)
    private var otpTextFields: [UITextField] = {
        var fields = [UITextField]()
        for _ in 0..<6 {
            let field = UITextField()
            field.borderStyle = .roundedRect
            field.textAlignment = .center
            field.font = UIFont.systemFont(ofSize: 20)
            field.keyboardType = .numberPad
            field.translatesAutoresizingMaskIntoConstraints = false
            field.heightAnchor.constraint(equalToConstant: 50).isActive = true
            fields.append(field)
        }
        return fields
    }()
    
    // Standalone Verify Code button (big button at the bottom)
    private let verifyButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Verify Code", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20, weight: .medium)
        button.setTitleColor(.white, for: .normal)
        button.backgroundColor = .systemBlue
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        button.alpha = 0.0
        button.isEnabled = false
        return button
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "OTP Verification"
        view.backgroundColor = UIColor(red: 235/255, green: 245/255, blue: 255/255, alpha: 1)
        
        for field in otpTextFields {
            field.delegate = self
            field.addTarget(self, action: #selector(otpFieldDidChange(_:)), for: .editingChanged)
        }
        
        setupUI()
        verifyButton.addTarget(self, action: #selector(verifyTapped), for: .touchUpInside)
        
        messageLabel.text = "An OTP has been sent to \(email)"
    }
    
    private func setupUI() {
        let labelsStack = UIStackView(arrangedSubviews: [titleLabel, messageLabel])
        labelsStack.axis = .vertical
        labelsStack.spacing = 10
        labelsStack.alignment = .fill
        labelsStack.translatesAutoresizingMaskIntoConstraints = false
        
        let otpStack = UIStackView(arrangedSubviews: otpTextFields)
        otpStack.axis = .horizontal
        otpStack.spacing = 10
        otpStack.alignment = .fill
        otpStack.distribution = .fillEqually
        otpStack.translatesAutoresizingMaskIntoConstraints = false
        
        let contentStack = UIStackView(arrangedSubviews: [labelsStack, otpStack])
        contentStack.axis = .vertical
        contentStack.spacing = 20
        contentStack.translatesAutoresizingMaskIntoConstraints = false
        
        view.addSubview(contentStack)
        view.addSubview(verifyButton)
        
        NSLayoutConstraint.activate([
            contentStack.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            contentStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            contentStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            
            verifyButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            verifyButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            verifyButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            verifyButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    @objc private func otpFieldDidChange(_ textField: UITextField) {
        guard let text = textField.text, text.count == 1 else {
            updateVerifyButtonState()
            return
        }
        if let index = otpTextFields.firstIndex(of: textField), index < otpTextFields.count - 1 {
            otpTextFields[index + 1].becomeFirstResponder()
        } else {
            textField.resignFirstResponder()
        }
        updateVerifyButtonState()
    }
    
    private func updateVerifyButtonState() {
        let allFilled = otpTextFields.allSatisfy { ($0.text ?? "").count == 1 }
        UIView.animate(withDuration: 0.3) {
            self.verifyButton.alpha = allFilled ? 1.0 : 0.0
        }
        verifyButton.isEnabled = allFilled
    }
    
    @objc private func verifyTapped() {
        let otp = otpTextFields.compactMap { $0.text }.joined()
        let alert = UIAlertController(title: "OTP Entered", message: "You entered: \(otp)", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    // Allow backspace to move to the previous field.
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        if otpTextFields.contains(textField) {
            let currentText = textField.text ?? ""
            if string.isEmpty && currentText.isEmpty {
                if let index = otpTextFields.firstIndex(of: textField), index > 0 {
                    let prevField = otpTextFields[index - 1]
                    prevField.text = ""
                    prevField.becomeFirstResponder()
                    updateVerifyButtonState()
                    return false
                }
            }
            if currentText.count >= 1 && !string.isEmpty {
                return false
            }
        }
        return true
    }
}

// MARK: - SignupUserViewController (User Flow)

class SignupUserViewController: UIViewController, UITextFieldDelegate {
    // Fields: Name, Email, and a button for Location Access.
    private let nameTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter your full name"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let emailTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter your email"
        tf.borderStyle = .roundedRect
        tf.keyboardType = .emailAddress
        tf.autocapitalizationType = .none
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    // Simulate location permission with a button.
    private let locationButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Allow Location Access", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let continueButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Continue", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let formStack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 20
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "User Signup"
        view.backgroundColor = .white
        emailTextField.delegate = self
        nameTextField.delegate = self
        
        setupUI()
        continueButton.addTarget(self, action: #selector(continueTapped), for: .touchUpInside)
        locationButton.addTarget(self, action: #selector(requestLocationAccess), for: .touchUpInside)
    }
    
    private func setupUI() {
        formStack.addArrangedSubview(nameTextField)
        formStack.addArrangedSubview(emailTextField)
        formStack.addArrangedSubview(locationButton)
        formStack.addArrangedSubview(continueButton)
        
        view.addSubview(formStack)
        NSLayoutConstraint.activate([
            formStack.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            formStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            formStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            nameTextField.heightAnchor.constraint(equalToConstant: 44),
            emailTextField.heightAnchor.constraint(equalToConstant: 44),
            locationButton.heightAnchor.constraint(equalToConstant: 50),
            continueButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    @objc private func requestLocationAccess() {
        let alert = UIAlertController(title: "Location Access", message: "Location access granted (simulated).", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    @objc private func continueTapped() {
        guard let email = emailTextField.text, isValidEmail(email),
              let name = nameTextField.text, !name.isEmpty else {
            let alert = UIAlertController(title: "Error", message: "Please fill in all fields with valid values.", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
            return
        }
        let otpVC = SignupOTPViewController()
        otpVC.email = email
        navigationController?.pushViewController(otpVC, animated: true)
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        return NSPredicate(format:"SELF MATCHES %@", emailRegex).evaluate(with: email)
    }
}

// MARK: - SignupDriverViewController (Driver Flow)

class SignupDriverViewController: UIViewController, UITextFieldDelegate {
    // Fields: Name, Email, Location Access, and a segmented control for service options.
    private let nameTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter your full name"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let emailTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter your email"
        tf.borderStyle = .roundedRect
        tf.keyboardType = .emailAddress
        tf.autocapitalizationType = .none
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let locationButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Allow Location Access", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    // Use a segmented control to choose service options.
    private let serviceSegment: UISegmentedControl = {
        let seg = UISegmentedControl(items: ["Drop-off/Pickup", "Drop-off, Pickup & Render"])
        seg.selectedSegmentIndex = 0
        seg.translatesAutoresizingMaskIntoConstraints = false
        return seg
    }()
    
    private let continueButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Continue", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let formStack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 20
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Driver Signup"
        view.backgroundColor = .white
        emailTextField.delegate = self
        nameTextField.delegate = self
        
        setupUI()
        continueButton.addTarget(self, action: #selector(continueTapped), for: .touchUpInside)
        locationButton.addTarget(self, action: #selector(requestLocationAccess), for: .touchUpInside)
    }
    
    private func setupUI() {
        formStack.addArrangedSubview(nameTextField)
        formStack.addArrangedSubview(emailTextField)
        formStack.addArrangedSubview(locationButton)
        formStack.addArrangedSubview(serviceSegment)
        formStack.addArrangedSubview(continueButton)
        
        view.addSubview(formStack)
        NSLayoutConstraint.activate([
            formStack.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            formStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            formStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            nameTextField.heightAnchor.constraint(equalToConstant: 44),
            emailTextField.heightAnchor.constraint(equalToConstant: 44),
            locationButton.heightAnchor.constraint(equalToConstant: 50),
            continueButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    @objc private func requestLocationAccess() {
        let alert = UIAlertController(title: "Location Access", message: "Location access granted (simulated).", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    @objc private func continueTapped() {
        guard let email = emailTextField.text, isValidEmail(email),
              let name = nameTextField.text, !name.isEmpty else {
            let alert = UIAlertController(title: "Error", message: "Please fill in all fields with valid values.", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
            return
        }
        let serviceOption = serviceSegment.selectedSegmentIndex == 0 ? "Drop-off/Pickup" : "Drop-off, Pickup & Render"
        print("Driver selected service: \(serviceOption)")
        
        let otpVC = SignupOTPViewController()
        otpVC.email = email
        navigationController?.pushViewController(otpVC, animated: true)
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        return NSPredicate(format:"SELF MATCHES %@", emailRegex).evaluate(with: email)
    }
}

// MARK: - SignupProfessionalViewController (Professional Flow)

class SignupProfessionalViewController: UIViewController, UITextFieldDelegate {
    // Fields: Business Name, Full Address, Services Rendered, and Email.
    private let businessNameTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter your business name"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let addressTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter full address"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    // Allow one service per text field.
    private let serviceTextField1: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Service 1"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let serviceTextField2: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Service 2 (optional)"
        tf.borderStyle = .roundedRect
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let emailTextField: UITextField = {
        let tf = UITextField()
        tf.placeholder = "Enter business email"
        tf.borderStyle = .roundedRect
        tf.keyboardType = .emailAddress
        tf.autocapitalizationType = .none
        tf.translatesAutoresizingMaskIntoConstraints = false
        return tf
    }()
    
    private let continueButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Continue", for: .normal)
        button.backgroundColor = .systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    private let formStack: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 20
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Professional Signup"
        view.backgroundColor = .white
        businessNameTextField.delegate = self
        addressTextField.delegate = self
        emailTextField.delegate = self
        
        setupUI()
        continueButton.addTarget(self, action: #selector(continueTapped), for: .touchUpInside)
    }
    
    private func setupUI() {
        formStack.addArrangedSubview(businessNameTextField)
        formStack.addArrangedSubview(addressTextField)
        formStack.addArrangedSubview(serviceTextField1)
        formStack.addArrangedSubview(serviceTextField2)
        formStack.addArrangedSubview(emailTextField)
        formStack.addArrangedSubview(continueButton)
        
        view.addSubview(formStack)
        NSLayoutConstraint.activate([
            formStack.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            formStack.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            formStack.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            businessNameTextField.heightAnchor.constraint(equalToConstant: 44),
            addressTextField.heightAnchor.constraint(equalToConstant: 44),
            emailTextField.heightAnchor.constraint(equalToConstant: 44),
            continueButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    @objc private func continueTapped() {
        guard let businessName = businessNameTextField.text, !businessName.isEmpty,
              let address = addressTextField.text, !address.isEmpty,
              let email = emailTextField.text, isValidEmail(email) else {
            let alert = UIAlertController(title: "Error", message: "Please fill in all required fields with valid values.", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
            return
        }
        
        let otpVC = SignupOTPViewController()
        otpVC.email = email
        navigationController?.pushViewController(otpVC, animated: true)
    }
    
    private func isValidEmail(_ email: String) -> Bool {
        let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        return NSPredicate(format:"SELF MATCHES %@", emailRegex).evaluate(with: email)
    }
}