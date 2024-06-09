import { TailSpin } from "react-loader-spinner";

interface Props {
  isButton?: boolean;
}

const Loader = ({ isButton }: Props) => {
  return (
    <>
      {isButton ? (
        <div className="mr-2">
          <TailSpin
            visible={true}
            height={20}
            width={20}
            color="#fff"
            ariaLabel="tail-spin-loading"
            radius={1}
            wrapperStyle={{}}
          />
        </div>
      ) : (
        <div className="fixed inset-0 flex-center bg-background overflow-hidden z-50">
          <TailSpin
            visible={true}
            height={80}
            width={80}
            color="#0F172A"
            ariaLabel="tail-spin-loading"
            radius={1}
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
};

export default Loader;
