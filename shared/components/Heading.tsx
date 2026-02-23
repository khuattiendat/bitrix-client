import { cn } from "../lib/utils";

interface HeadingProps {
  title?: string;
  className?: string;
}
const Heading = (props: HeadingProps) => {
  const { title, className } = props;
  return (
    <div>
      <h1 className={cn("text-3xl leading-10", className)}>{title}</h1>
    </div>
  );
};
export default Heading;
