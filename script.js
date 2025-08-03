// Generate captcha with letters + numbers
// Generate captcha with letters & numbers
function generateCaptcha() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

// When page loads
window.onload = () => {
  document.getElementById('captchaText').textContent = generateCaptcha();
  document.getElementById('signinCaptchaText').textContent = generateCaptcha();

  // Clear forms & inputs
  document.getElementById('signupForm').reset();
  document.getElementById('signinForm').reset();
};

// Toggle forms + clear & refresh captcha
document.getElementById('showSignin').addEventListener('click', () => {
  document.getElementById('signupForm').classList.remove('active');
  document.getElementById('signinForm').classList.add('active');
  document.getElementById('signinCaptchaText').textContent = generateCaptcha();
  document.getElementById('signinForm').reset();
});

document.getElementById('showSignup').addEventListener('click', () => {
  document.getElementById('signinForm').classList.remove('active');
  document.getElementById('signupForm').classList.add('active');
  document.getElementById('captchaText').textContent = generateCaptcha();
  document.getElementById('signupForm').reset();
});

// Refresh captcha buttons
document.getElementById('refreshCaptcha').addEventListener('click', () => {
  document.getElementById('captchaText').textContent = generateCaptcha();
});
document.getElementById('refreshSigninCaptcha').addEventListener('click', () => {
  document.getElementById('signinCaptchaText').textContent = generateCaptcha();
});

// Sign up (register new user)
document.getElementById('signupForm').addEventListener('submit', function(e){
  e.preventDefault();
  let username = document.getElementById('newUsername').value.trim();
  let password = document.getElementById('newPassword').value;
  let captchaInput = document.getElementById('captchaInput').value;
  let captchaText = document.getElementById('captchaText').textContent;

  if(captchaInput !== captchaText){
    alert('Captcha does not match!');
    document.getElementById('captchaText').textContent = generateCaptcha();
    return;
  }

  let encryptedPassword = CryptoJS.MD5(password).toString();

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if(users[username]){
    alert('Username already exists! Please choose another.');
    return;
  }

  users[username] = encryptedPassword;
  localStorage.setItem('users', JSON.stringify(users));

  // ✅ Directly go to participants page after sign up
  window.location.href = 'participants.html';
});

// Sign in (check username & password)
document.getElementById('signinForm').addEventListener('submit', function(e){
  e.preventDefault();
  let username = document.getElementById('existingUsername').value.trim();
  let password = document.getElementById('existingPassword').value;
  let captchaInput = document.getElementById('signinCaptchaInput').value;
  let captchaText = document.getElementById('signinCaptchaText').textContent;

  if(captchaInput !== captchaText){
    alert('Captcha does not match!');
    document.getElementById('signinCaptchaText').textContent = generateCaptcha();
    return;
  }

  let encryptedPassword = CryptoJS.MD5(password).toString();

  let users = JSON.parse(localStorage.getItem('users')) || {};

  if(users[username] && users[username] === encryptedPassword){
    window.location.href = 'participants.html';
  } else {
    alert('Invalid username or password!');
  }
});
