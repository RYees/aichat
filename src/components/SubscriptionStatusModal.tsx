import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const SubscriptionStatusModal = (props: any) => {
  const onClose = props.onClose;
  const show = props.show;
  const status = props.isStatus;
  //console.log("planstatus", status)
  const closeModal = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-md transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <Dialog.Title
                    as="h3"
                    className="mt-6 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent  sm:text-2xl"
                  >
                    Thank you for being a valuable user!
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                    Your current stripe subscription status is{" "}
                    <strong>{status}</strong>!
                  </Dialog.Description>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SubscriptionStatusModal;
