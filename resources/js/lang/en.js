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
    table: {
        filterBar: {
            search: {
                title: 'Search',
                placeholder: 'Search...'
            },
            pagination: {
                displaying: 'Displaying',
                to: 'to',
                of: 'of',
                items: 'items'
            },
            data: {
                noData: 'No Data Available',
                noRelevant: 'No relevant data'
            },
            infoClass: 'Left floated left aligned six wide column'
        }
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
        //dítributor
        distributor: 'Distributor',
        distributorActive: 'Providing',
        distributorStopProviding: 'Stop providing',
        distributorAdd: 'New distributor',
    },
    account: {
        title: 'Account',
        changeImg: 'Change Image',
        birthDay: 'Birth day',
        name: 'Name',
        lastName: 'Last name',
        numberPhone: 'Number phone',
        password: 'Password',
        gender: {
            label: 'Gender',
            male: 'Male',
            female: 'Female'
        },
        description: 'Description',
        notification: {
            name: {
                error: 'Name is required'
            },
            numberPhone: {
                error: 'Please input digits',
                errorLength: 'The password can not be less than 8 digits'
            },
            file: {
                size: {
                    error: 'Avatar picture size can not exceed 2MB'
                },
                type: {
                    error: 'Avatar picture must be JPG, PNG format'
                },
                success: 'Update avatar success',
                error: 'Update avatar fail'
            },
            success: 'Update info success',
            error: 'Update info fail'
        }
    },
    distributor: {
        add: {
            title: 'Add',
        },
        view: {
            title: 'View distributor',
            nameDistributor: 'Name distributor',
            fullName: 'Full name'
        },
        button: 'Add',
        name: 'Name distributor'
    },
    menu: {
        add: {
            title: 'Add food',
        },
        view: {
            title: 'View food',
            nameDistributor: 'Tên nhà phân phối',
            fullName: 'Họ tên người đứng đầu'
        },
        name: 'Name',
        image: 'Image',
        description: 'Description',
        price: 'Price',
        discount: 'Discount',
        ingredient: 'Ingredient',
        calo: 'Calo',
        dateDiscount: 'Date discount',
        kind: 'Kind food',
        per: 'per',
    },
    fieldDefs: {
        actionDelete: {
            title: 'Warning',
            content: {
                delete: 'This will permanently delete item. Continue?',
                restore: 'Do you want restore item?'
            },
            success: {
                delete: 'Delete completed!',
                restore: 'Restore completed!'
            },
            cancel: 'Delete canceled',
            error: 'Error service.'
        }
    }
}
