import React, { useState } from 'react'
import { userApis } from '../../apis/UserApis';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/slice/appSlice';
import { toast } from 'react-toastify';
interface IUser {
    id: number;
    name: string;
    username: string;
    avatar: string;
    email: string;
    phone: string;
}

interface EditProfileProps {
    user: IUser;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
}
const ProfileModal: React.FC<EditProfileProps> = ({ user, showModal, setShowModal }) => {
    const {currentUser} = useSelector((state: any) => state.app);
    const [editUser, setEditUser] = useState<IUser>(user);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!editUser.username.trim()) {
            newErrors.username = 'Tên người dùng không được để trống';
        }
        if (!editUser.email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!editUser.phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^\d+$/.test(editUser.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSave = async () => {
        const data = {
            ...editUser,
            JWTToken:{
                accessToken: currentUser?.accessToken,
                refreshToken: currentUser?.refreshToken
            }
        }
        console.log(data);
        if (validate()) {
            await userApis.update(String(editUser.id), editUser);
            dispatch(loginSuccess(data));
            setShowModal(false);
            toast.success('Cập nhật thông tin thành công');
        }
        else {
            toast.error(errors.username || errors.email || errors.phone || errors.avatar);
        }
    };

    return (
        showModal && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-6 rounded-md w-full max-w-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Chỉnh sửa thông tin cá nhân</h2>
                    <div className='flex flex-col gap-6'>
                        <div className="flex items-center gap-6">
                            <img
                                src={editUser.avatar}
                                alt="Avatar"
                                className="w-36 h-36 object-cover rounded-full"
                            />
                            <input
                                type="text"
                                name="avatar"
                                value={editUser.avatar}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                                placeholder="URL ảnh đại diện"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-gray-700">Họ và tên</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editUser.name}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Tên người dùng"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Tên người dùng</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={editUser.username}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Tên người dùng"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editUser.email}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Số điện thoại</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={editUser.phone}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Số điện thoại"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={onSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default ProfileModal