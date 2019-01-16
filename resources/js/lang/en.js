export default {
    common: {
        select_lang: 'Language',
        name: {
            vi: 'Tiếng Việt',
            en: 'English'
        },
        notification: {
            success: 'Switch language success!',
            error: 'Switch language fail!'
        }
    },
    login: {
        title: 'Login',
        name: 'Login',
        username: 'Username:',
        password: 'Password:',
        button: 'Sign in',
        placeholder: {
            username: 'Input username...',
            password: 'Input password...'
        },
        notification: {
            username: {
                error: 'The username can not be less than 4 digits.'
            },
            password: {
                error: 'The password can not be less than 6 digits.'
            },
            error: 'Account information incorrect.'
        }
    },
    navbar: {
        account: 'account',
        logout: 'Log Out',
        changePassword: 'Change password'
    },
    notfound: {
        home: 'Home',
        title: 'Page notfound!',
        back: 'Back'
    },
    tagsView: {
        refresh: 'Refresh',
        close: 'Close',
        closeOthers: 'Close other',
        closeAll: 'Close all'
    },
    changePassword: {
        title: 'Change password',
        oldPassword: 'Old password',
        newPassword: 'New password',
        rePassword: 'Confirm',
        button: 'Submit',
        notification: {
            oldPassword: {
                error: 'Incorrect password',
                errorServer: 'Server error'
            },
            rePassword: {
                error: 'Passwords don\'t match'
            },
            success: 'Change password success',
            error: 'The password can not be less than 6 digits',
            errorCt: 'Send request error'
        }
    },
    route: {
        changePassword: 'Change password',
        accountbe: 'Account',
    }
}
