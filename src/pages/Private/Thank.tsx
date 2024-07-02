import React from 'react'
import { useNavigate } from 'react-router-dom';

const Thank = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
      navigate('/');
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-md shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Cảm ơn bạn đã đăng bài!</h1>
          <p className="mb-4">Bài viết của bạn đã được gửi và sẽ được duyệt sớm nhất.</p>
          <p className="mb-4">Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với admin:</p>
          <div className="mb-4">
            <p>Email: admin@example.com</p>
            <p>Điện thoại: 123-456-789</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">Chúng tôi sẽ liên hệ với bạn nếu có bất kỳ thông tin bổ sung nào cần thiết.</p>
          <button
            onClick={handleRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    );
}

export default Thank