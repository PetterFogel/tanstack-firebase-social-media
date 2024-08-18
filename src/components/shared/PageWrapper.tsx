import { ReactNode } from "react";
import MetaData from "./MetaData";

interface Props {
  pageTitle: string;
  children: ReactNode;
}

const PageWrapper = ({ pageTitle, children }: Props) => {
  return (
    <>
      <MetaData title={pageTitle} />
      <section className="w-full max-w-5xl mx-auto p-4 md:py-8 mb-10">
        <div className="space-y-8 md:space-y-12">
          <h2 className="text-3xl font-bold">{pageTitle}</h2>
          {children}
        </div>
      </section>
    </>
  );
};

export default PageWrapper;
