"use client";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[60px] sm:text-[80px] md:text-[120px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 select-none">
            404
          </h1>

          {/* Floating Elements */}
          <div className="absolute top-0 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-purple-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-16 h-16 sm:w-20 sm:h-20 bg-blue-400 rounded-full blur-xl opacity-60 animate-pulse delay-75"></div>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Oops! Trang không tồn tại
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời
            không khả dụng.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <button
            onClick={() => {
              router.back();
            }}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Quay lại
          </button>
          <button
            onClick={() => {
              router.replace("/");
            }}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-purple-300 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Về trang chủ
          </button>
        </div>

        {/* Additional Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-purple-600 transition-colors">
            Liên hệ hỗ trợ
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Báo cáo lỗi
          </a>
          <span className="hidden sm:inline">•</span>
          <a href="#" className="hover:text-purple-600 transition-colors">
            Sitemap
          </a>
        </div>
      </div>
    </div>
  );
}
