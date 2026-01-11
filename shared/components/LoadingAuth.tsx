import { Spin } from "antd";

const LoadingAuth = () => {
  return (
    <div className="h-dvh flex justify-center items-center">
      <Spin size="large" children={<div className="mt-20">Vui lòng chờ</div>} />
    </div>
  );
};

export default LoadingAuth;
