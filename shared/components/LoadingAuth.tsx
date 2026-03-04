import { Spin } from "antd";
interface LoadingAuthProps {
  size?: "small" | "default" | "large";
  children?: React.ReactNode;
}

const LoadingAuth = (props: LoadingAuthProps) => {
  const { size = "large", children } = props;
  return (
    <div className="h-dvh flex justify-center items-center bg-white">
      <Spin size={size}>
        <div className="mt-20">{children ? children : "Vui lòng chờ"}</div>
      </Spin>
    </div>
  );
};

export default LoadingAuth;
