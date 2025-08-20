import type { SectionProps } from "@/types";

const Section = ({ id, className = "", ...rest }: SectionProps) => {
return (
    <section
    id={id}
    className={`scroll-mt-[72px] py-16 ${className}`}
    {...rest}
    />
);
}

export default Section;
