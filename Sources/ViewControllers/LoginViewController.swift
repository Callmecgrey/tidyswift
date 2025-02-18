import UIKit

class LoginViewController: UIViewController, UITextFieldDelegate {
    
    // MARK: - Email Input UI Elements
    
    private let instructionLabel: UILabel = {
        let label = UILabel()
        label.text = "Login to Your Account"
        label.font = UIFont.systemFont(ofSize: 20, weight: .medium)
        label.textColor = UIColor.systemBlue
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    private let emailTextField: UITextField = {
        let textField = UITextField()
        textField.placeholder = "Enter your email"
        textField.borderStyle = .roundedRect
        textField.autocapitalizationType = .none
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    private let continueButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Continue", for: .normal)
        button.backgroundColor = UIColor.systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        button.alpha = 0.0  // initially hidden
        button.layer.shadowColor = UIColor.black.cgColor
        button.layer.shadowOpacity = 0.2
        button.layer.shadowOffset = CGSize(width: 0, height: 2)
        button.layer.shadowRadius = 4
        return button
    }()
    
    // Container for the email input UI
    private let emailContainer: UIStackView = {
        let stack = UIStackView()
        stack.axis = .vertical
        stack.spacing = 20
        stack.alignment = .fill
        stack.translatesAutoresizingMaskIntoConstraints = false
        return stack
    }()
    
    // MARK: - OTP Verification UI Elements
    
    // OTP Title Label
    private let otpTitleLabel: UILabel = {
        let label = UILabel()
        label.text = "Enter OTP Code"
        label.font = UIFont.boldSystemFont(ofSize: 24)
        label.textColor = UIColor.systemBlue
        label.textAlignment = .center
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    // OTP Message Label
    private let otpMessageLabel: UILabel = {
        let label = UILabel()
        label.textColor = UIColor.systemBlue
        label.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        label.textAlignment = .center
        label.numberOfLines = 0
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()
    
    // Six OTP text fields arranged horizontally. Each accepts only one character.
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
    
    // Resend Code button (aligned to left)
    private let resendButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Resend Code", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 18, weight: .medium)
        button.setTitleColor(UIColor.systemBlue, for: .normal)
        button.contentHorizontalAlignment = .left
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    // Standalone Verify Code button (big button at the bottom)
    private let verifyCodeButton: UIButton = {
        let button = UIButton(type: .system)
        button.setTitle("Verify Code", for: .normal)
        button.titleLabel?.font = UIFont.systemFont(ofSize: 20, weight: .medium)
        button.setTitleColor(.white, for: .normal)
        button.backgroundColor = UIColor.systemBlue
        button.layer.cornerRadius = 8
        button.translatesAutoresizingMaskIntoConstraints = false
        button.alpha = 0.0  // initially hidden
        button.isEnabled = false
        return button
    }()
    
    // Container for the OTP verification UI (without the verify button)
    private let otpContainer: UIView = {
        let view = UIView()
        view.translatesAutoresizingMaskIntoConstraints = false
        view.alpha = 0.0  // initially hidden
        return view
    }()
    
    // MARK: - Lifecycle
    
    override func viewDidLoad() {
        super.viewDidLoad()
        title = "Login"
        view.backgroundColor = UIColor(red: 235/255, green: 245/255, blue: 255/255, alpha: 1)
        emailTextField.delegate = self
        
        // Set delegates and add editingChanged targets for OTP text fields
        for field in otpTextFields {
            field.delegate = self
            field.addTarget(self, action: #selector(otpTextFieldDidChange(_:)), for: .editingChanged)
        }
        
        setupEmailUI()
        setupOTPUI()
        setupVerifyButtonUI()
        setupActions()
        
        // Add long press gesture to OTP container to clear all fields.
        let longPress = UILongPressGestureRecognizer(target: self, action: #selector(handleOTPContainerLongPress))
        otpContainer.addGestureRecognizer(longPress)
    }
    
    // MARK: - Setup Email Input UI
    
    private func setupEmailUI() {
        emailContainer.addArrangedSubview(instructionLabel)
        emailContainer.addArrangedSubview(emailTextField)
        emailContainer.addArrangedSubview(continueButton)
        
        view.addSubview(emailContainer)
        NSLayoutConstraint.activate([
            emailContainer.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            emailContainer.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            emailContainer.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20)
        ])
        
        emailTextField.heightAnchor.constraint(equalToConstant: 44).isActive = true
        continueButton.heightAnchor.constraint(equalToConstant: 50).isActive = true
    }
    
    // MARK: - Setup OTP Verification UI
    
    private func setupOTPUI() {
        // Create a vertical stack view to hold the OTP labels.
        let otpLabelsStack = UIStackView(arrangedSubviews: [otpTitleLabel, otpMessageLabel])
        otpLabelsStack.axis = .vertical
        otpLabelsStack.spacing = 10
        otpLabelsStack.alignment = .fill
        otpLabelsStack.translatesAutoresizingMaskIntoConstraints = false
        
        // Stack view for OTP text fields.
        let otpFieldsStack = UIStackView(arrangedSubviews: otpTextFields)
        otpFieldsStack.axis = .horizontal
        otpFieldsStack.spacing = 10
        otpFieldsStack.alignment = .fill
        otpFieldsStack.distribution = .fillEqually
        otpFieldsStack.translatesAutoresizingMaskIntoConstraints = false
        
        // Vertical stack for OTP area (labels, fields, and resend button)
        let otpMainStack = UIStackView(arrangedSubviews: [otpLabelsStack, otpFieldsStack, resendButton])
        otpMainStack.axis = .vertical
        otpMainStack.spacing = 20
        otpMainStack.alignment = .fill
        otpMainStack.translatesAutoresizingMaskIntoConstraints = false
        
        otpContainer.addSubview(otpMainStack)
        view.addSubview(otpContainer)
        
        NSLayoutConstraint.activate([
            otpContainer.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 40),
            otpContainer.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            otpContainer.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            
            otpMainStack.topAnchor.constraint(equalTo: otpContainer.topAnchor),
            otpMainStack.leadingAnchor.constraint(equalTo: otpContainer.leadingAnchor),
            otpMainStack.trailingAnchor.constraint(equalTo: otpContainer.trailingAnchor),
            otpMainStack.bottomAnchor.constraint(equalTo: otpContainer.bottomAnchor)
        ])
    }
    
    // Setup the large Verify Code button at the bottom of the screen.
    private func setupVerifyButtonUI() {
        view.addSubview(verifyCodeButton)
        NSLayoutConstraint.activate([
            verifyCodeButton.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            verifyCodeButton.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            verifyCodeButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            verifyCodeButton.heightAnchor.constraint(equalToConstant: 50)
        ])
    }
    
    // MARK: - Setup Actions
    
    private func setupActions() {
        continueButton.addTarget(self, action: #selector(continueTapped), for: .touchUpInside)
        resendButton.addTarget(self, action: #selector(resendCodeTapped), for: .touchUpInside)
        verifyCodeButton.addTarget(self, action: #selector(verifyCodeTapped), for: .touchUpInside)
    }
    
    // MARK: - UITextFieldDelegate
    
    // For emailTextField, show/hide Continue button and later validate email.
    // For OTP text fields, restrict to one character and handle backspace to clear previous field.
    func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
        if textField == emailTextField {
            let currentText = textField.text ?? ""
            guard let stringRange = Range(range, in: currentText) else { return true }
            let updatedText = currentText.replacingCharacters(in: stringRange, with: string)
            
            UIView.animate(withDuration: 0.3) {
                self.continueButton.alpha = updatedText.isEmpty ? 0.0 : 1.0
            }
            return true
        }
        
        // For OTP text fields:
        if otpTextFields.contains(textField) {
            let currentText = textField.text ?? ""
            
            // Handle deletion (backspace) when field is already empty.
            if string.isEmpty && currentText.isEmpty {
                if let currentIndex = otpTextFields.firstIndex(of: textField), currentIndex > 0 {
                    let previousField = otpTextFields[currentIndex - 1]
                    previousField.text = ""
                    previousField.becomeFirstResponder()
                    updateVerifyButtonState()
                    return false
                }
            }
            
            // Prevent entering more than one character.
            if currentText.count >= 1 && !string.isEmpty {
                return false
            }
        }
        return true
    }
    
    // Auto-advance to the next OTP field when a character is entered and update Verify button state.
    @objc private func otpTextFieldDidChange(_ textField: UITextField) {
        guard let text = textField.text, text.count >= 1 else {
            updateVerifyButtonState()
            return
        }
        
        if let currentIndex = otpTextFields.firstIndex(of: textField), currentIndex < otpTextFields.count - 1 {
            otpTextFields[currentIndex + 1].becomeFirstResponder()
        } else {
            textField.resignFirstResponder()
        }
        updateVerifyButtonState()
    }
    
    // Checks if all OTP fields are filled; if so, shows and enables the Verify Code button.
    private func updateVerifyButtonState() {
        let allFilled = otpTextFields.allSatisfy { ($0.text ?? "").count == 1 }
        UIView.animate(withDuration: 0.3) {
            self.verifyCodeButton.alpha = allFilled ? 1.0 : 0.0
        }
        verifyCodeButton.isEnabled = allFilled
    }
    
    // MARK: - Clear OTP Fields on Long Press
    
    @objc private func handleOTPContainerLongPress(_ gesture: UILongPressGestureRecognizer) {
        // Only trigger on the beginning of the long press.
        if gesture.state == .began {
            otpTextFields.forEach { $0.text = "" }
            otpTextFields.first?.becomeFirstResponder()
            updateVerifyButtonState()
        }
    }
    
    // MARK: - Actions
    
    // Validate email before transitioning to OTP UI.
    @objc private func continueTapped() {
        guard let email = emailTextField.text, isValidEmail(email) else {
            let alert = UIAlertController(title: "Invalid Email", message: "Please enter a valid email address.", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default))
            present(alert, animated: true)
            return
        }
        
        otpMessageLabel.text = "An OTP has been sent to \(email)"
        
        // Transition: fade out email UI and fade in OTP UI.
        UIView.animate(withDuration: 0.3, animations: {
            self.emailContainer.alpha = 0.0
        }) { _ in
            self.emailContainer.isHidden = true
            self.otpContainer.isHidden = false
            UIView.animate(withDuration: 0.3) {
                self.otpContainer.alpha = 1.0
            }
        }
    }
    
    @objc private func resendCodeTapped() {
        let alert = UIAlertController(title: "OTP Resent", message: "A new OTP has been sent to \(emailTextField.text ?? "")", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    @objc private func verifyCodeTapped() {
        // Combine OTP fields into a code string.
        let otpCode = otpTextFields.compactMap { $0.text }.joined()
        // For now, simply display an alert.
        let alert = UIAlertController(title: "OTP Entered", message: "You entered: \(otpCode)", preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default))
        present(alert, animated: true)
    }
    
    // MARK: - Email Validation
    
    private func isValidEmail(_ email: String) -> Bool {
        // Simple regex for email validation.
        let emailRegEx = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
        let emailPred = NSPredicate(format:"SELF MATCHES %@", emailRegEx)
        return emailPred.evaluate(with: email)
    }
}