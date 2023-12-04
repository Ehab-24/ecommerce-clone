interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <h2 className="text-sm font-bold mb-2 text-neutral-800">{title}</h2>;
};

export default SectionTitle;
