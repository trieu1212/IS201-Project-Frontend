import React from 'react'
import { authApis } from '../../apis/AuthApis'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const ForgotPass = () => {
    const [email, setEmail] = React.useState<string>('')
    const [result, setResult] = React.useState<any>()
    const handleSubmit = async () => {
        try {
            const res = await authApis.forgotPass(email)
            setResult(res.data)
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Quên mật khẩu</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Địa chỉ Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                        onClick={handleSubmit}
                    >
                        Gửi yêu cầu lấy mật khẩu
                    </button>
                </form>
                {result && (
                    <div className="mt-4">
                        <p className="text-lg font-semibold text-gray-800">Kết quả</p>
                        <p className="text-gray-600">{result.message}</p>
                    </div>
                )}
                <div>
                    <p className="mt-4 text-gray-600">Quay lại <Link to="/login" className="text-blue-500 hover:underline">Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPass