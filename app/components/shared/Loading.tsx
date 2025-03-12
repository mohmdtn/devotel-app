import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

interface Props {
  className?: string;
}

const Loading = ({ className }: Props) => {
  return (
    <section className={`w-full flex justify-center items-center ${className}`}>
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </section>
  );
};

export default Loading;
