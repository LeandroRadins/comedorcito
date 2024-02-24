interface Props extends React.HTMLProps<HTMLLabelElement> {}

export const Label = ({ children, ...props }: Props) => {
  return (
    <label
      className="block text-1xl font-medium leading-6 text-gray-900"
      {...props}
    >
      {children}
    </label>
  );
};
