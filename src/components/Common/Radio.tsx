type RadioProps = {
  text: string;
  name: string;
  id: string;
  value: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export const Radio = ({ text, name, id, value, ...rest }: RadioProps) => {
  return (
    <label
      className="mb-5 inline-block w-fit flex-1 cursor-pointer rounded-lg p-6 text-center ring-1 ring-lightgray transition-shadow checked:bg-primary hover:ring-primary has-[:checked]:ring-secondary"
      htmlFor={id}
    >
      {text}
      <input id={id} type="radio" name={name} value={value} hidden {...rest} />
    </label>
  );
};
