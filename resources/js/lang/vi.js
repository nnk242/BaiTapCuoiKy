export default {
    common: {
        select_lang: 'Ngôn ngữ',
        name: {
            vi: 'Tiếng Việt',
            en: 'English'
        },
        notification: {
            success: 'Thay đổi ngôn ngữ thành công!',
            error: 'Thay đổi ngôn ngữ thất bại!'
        }
    },
    login: {
        title: 'Đăng nhập',
        name: 'Đăng nhập',
        username: 'Tên đăng nhập:',
        password: 'Mật khẩu:',
        button: 'Đăng nhập',
        placeholder: {
            username: 'Nhập tên đăng nhập...',
            password: 'Nhập mật khẩu...'
        },
        notification: {
            username: {
                error: 'Tên tài khoản không thể nhỏ hơn 4 ký tự.'
            },
            password: {
                error: 'Mật khẩu không thể nhỏ hơn 6 ký tự.'
            },
            error: 'Thông tin tài khoản không chính xác.'
        }
    },
    navbar: {
        account: 'Tài khoản',
        logout: 'Đăng xuất',
        changePassword: 'Đổi mật khẩu'
    },
    table: {
        filterBar: {
            search: {
                title: 'Tìm kiếm',
                placeholder: 'Tìm kiếm...'
            }
        },
        pagination: {
            displaying: 'Hiển thị',
            to: 'đến',
            of: 'của',
            items: 'mục'
        },
        data: {
            noData: 'Chưa có dữ liệu',
            noRelevant: 'Chưa có dữ liệu liên quan'
        },
        infoClass: 'Bên trái nổi trái thẳng hàng sáu cột rộng'
    },

    notfound: {
        home: 'Trang chủ',
        title: 'Trang của bạn truy cập không tồn tại!',
        back: 'Quay lại'
    },
    tagsView: {
        refresh: 'Làm mới',
        close: 'Đóng',
        closeOthers: 'Đóng mọi thứ khác',
        closeAll: 'Đóng tất cả'
    },
    changePassword: {
        title: 'Thay đổi mật khẩu',
        oldPassword: 'Mật khẩu cũ',
        newPassword: 'Mật khẩu mới',
        rePassword: 'Nhập lại',
        button: 'Thay đổi',
        notification: {
            oldPassword: {
                error: 'Mật khẩu không chính xác',
                errorServer: 'Có lỗi từ server'
            },
            rePassword: {
                error: 'Mật khẩu không khớp'
            },
            success: 'Thay đổi mật khẩu thành công',
            error: 'Mật khẩu cần lớn hơn 6 kí tự',
            errorCt: 'Thông tin gửi lên chưa chính xác'
        }
    },
    route: {
        changePassword: 'Đổi mật khẩu',
        accountbe: 'Tài khoản',
        //distributor
        distributor: 'Nhà phân phối',
        distributorActive: 'Đang cung cấp',
        distributorStopProviding: 'Ngưng cung cấp',
        distributorAdd: 'Thêm',
    },
    account: {
        title: 'Thông tin tài khoản',
        changeImg: 'Thay đổi',
        birthDay: 'Sinh nhật',
        name: 'Tên',
        lastName: 'Họ tên đệm',
        numberPhone: 'Số điện thoại',
        password: 'Mật khẩu',
        gender: {
            label: 'Giới tính',
            male: 'Nam',
            female: 'Nữ'
        },
        description: 'Giới thiệu',
        notification: {
            name: {
                error: 'Tên không được bỏ trống'
            },
            numberPhone: {
                error: 'Phải là số',
                errorLength: 'Số điện thoại phải trên 8 ký tự'
            },
            file: {
                size: {
                    error: 'Phải nhỏ hơn 2Mb'
                },
                type: {
                    error: 'Phải là jpeg, png'
                },
                success: 'Thay đổi ảnh thành công',
                error: 'Thay đổi ảnh thất bại'
            },
            success: 'Cập nhật thông tin tài khoản thành công',
            error: 'Cập nhật thông tin thất bại',
        }
    },
    distributor: {
        add: {
            title: 'Thêm nhà phân phối',
        },
        view: {
            title: 'Xem nhà phân phối',
            nameDistributor: 'Tên nhà phân phối',
            fullName: 'Họ tên người đứng đầu'
        },
        button: 'Thêm',
        name: 'Tên phân phối'
    },
    menu: {
        add: {
            title: 'Thêm nhà món ăn',
        },
        view: {
            title: 'Xem món ăn',
            nameDistributor: 'Tên nhà phân phối',
            fullName: 'Họ tên người đứng đầu'
        },
        name: 'Tên món ăn',
        image: 'Hình ảnh',
        description: 'Giới thiệu',
        price: 'Giá',
        discount: 'Giảm giá',
        ingredient: 'Thành phần',
        calo: 'Calo',
        dateDiscount: 'Ngày giảm giá',
        kind: 'Loại đồ ăn',
        per: 'per',
        notification: {
            name: {
                error: 'Tên không được bỏ trống',
                errorServer: 'Có lỗi từ server'
            },
            rePassword: {
                error: 'Mật khẩu không khớp'
            },
            success: 'Thay đổi mật khẩu thành công',
            error: 'Mật khẩu cần lớn hơn 6 kí tự',
            errorCt: 'Thông tin gửi lên chưa chính xác'
        }
    },
    fieldDefs: {
        action: {
            title: 'Cảnh báo!',
            content: {
                delete: 'Bạn có muốn xóa dự liệu này...',
                restore: 'Bạn có muốn phục hồi dữ liệu này?'
            },
            success: {
                delete: 'Xóa thành công!',
                restore: 'Phục hồi dữ liệu thành công...'
            },
            cancel: 'Hành động đã hủy',
            error: 'Đã xảy ra lỗi từ hệ thống.'
        }
    }
}
