import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { userApis } from '../../apis/UserApis';

interface IUser {
    id?: number;
    username: string;
    email: string;
    isAdmin: string;
    phone: string;
    avatar: string;
    password?: string;
}

interface UserModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    type: 'add' | 'edit';
    user: IUser | null;
}

const UserModal: React.FC<UserModalProps> = ({ showModal, setShowModal, type, user }) => {
    const [formData, setFormData] = useState<IUser>({
        id: user?.id,
        username: user?.username || '',
        email: user?.email || '',
        isAdmin: user?.isAdmin || 'Người dùng',
        phone: user?.phone || '',
        avatar: user?.avatar || '',
        password: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...user,
                password: '' // Reset password field on edit
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async () => {
        if (type == 'add') {
            if (formData.username === '' || formData.email === '' || formData.password === '') {
                toast.error('Vui lòng điền đầy đủ thông tin');
                return;
            }
            else {
                setFormData({
                    ...formData,
                });
                await userApis.create(formData);
                toast.success('Thêm người dùng thành công');
            }
        }
        else {
            if (formData.username === '' || formData.email === '' || formData.id === undefined) {
                toast.error('Vui lòng điền đầy đủ thông tin');
                return;
            }
            else {
                setFormData({
                    ...formData,
                });
                await userApis.update(formData.id, formData);
                toast.success('Cập nhật người dùng thành công');
            }
        }
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-bold mb-4">{type === 'add' ? 'Thêm người dùng' : 'Sửa người dùng'}</h2>
                <form >
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">Tên</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {type === 'add' && (
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="password">Mật khẩu</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required={type === 'add'}
                            />
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="isAdmin">Quyền</label>
                        <select
                            id="isAdmin"
                            name="isAdmin"
                            value={formData.isAdmin}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={1}>Admin</option>
                            <option value={0}>Người dùng</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="phone">Điện thoại</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="avatar">Avatar URL</label>
                        <input
                            type="text"
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            {type === 'add' ? 'Thêm' : 'Lưu'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;