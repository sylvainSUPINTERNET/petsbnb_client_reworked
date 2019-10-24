import LoginForm from './Authentication/LoginForm';
import Home from './Home';

/**
 * Class only, this CAN'T BE USE TO MAKE A RENDER SUCH AS <LoginForm/>
 * @type {{AUTH_HOME_COMPONENT: *, AUTH_LOGIN_COMPONENT: *}}
 */
const ApplicationComponents = {
  AUTH_LOGIN_COMPONENT : LoginForm,
  AUTH_HOME_COMPONENT: Home
};

export default ApplicationComponents;