import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const WelcomeModal = ({
  show = true,
  onClose = () => null,
  characterName = "",
  characterImage = "",
  voiceId = null,
}) => {
  const [isVoiceIdAvailable, setIsVoiceIdAvailable] = useState(!!voiceId);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetch(`/api/character`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data); // Log the data
  //       setIsVoiceIdAvailable(
  //         data.character ? !!data.character.voiceid : false
  //       );
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setIsVoiceIdAvailable(false);
  //       setIsLoading(false);
  //     });
  // }, [isVoiceIdAvailable]);
  useEffect(() => {
    setIsVoiceIdAvailable(!!voiceId);
  }, [voiceId]);

  const closeModal = () => {
    if (voiceId && typeof onClose === "function") {
      onClose();
    }
  };
  // console.log(voiceId)
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={isVoiceIdAvailable ? closeModal : () => {}}
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
            <div className="relative my-8 inline-block h-1/2 w-1/2 transform  overflow-hidden  bg-gray-200 text-left align-middle shadow-xl transition-all sm:rounded-md">
              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <div className="flex justify-center">
                    <Image
                      src={characterImage}
                      alt="characterImage"
                      width={100} // replace with your image's width
                      height={100} // replace with your image's height
                      className="rounded-full"
                    />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mt-6 bg-gradient-to-r from-orange-500  to-pink-500 bg-clip-text text-center text-lg font-bold text-transparent  sm:text-2xl"
                  >
                    Hey there! 😊 It's {characterName}. Welcome to my digital
                    lounge, a special place where we can chat (and speak!) about
                    anything and everything.
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                    I created a digital version of myself, just for you. We can
                    dive into the fun, flirty, or even more personal topics.
                    Feel like continuing our conversation tomorrow? You can
                    always come back and pick up right where we left off.
                    <br />
                    This space is all about connection, understanding, and pure
                    enjoyment. So don't be shy, let's start our one-of-a-kind
                    relationship. See you inside!
                  </Dialog.Description>
                  <div className="flex justify-center">
                    {isLoading ? (
                      <div>Loading...</div>
                    ) : isVoiceIdAvailable ? (
                      <button
                        type="button"
                        className="mt-4 rounded-sm bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-3 text-xl text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={closeModal}
                      >
                        Start Chat
                      </button>
                    ) : (
                      <div className="mt-4 rounded-sm bg-gray-300 px-4 py-3 text-xl text-gray-500">
                        Character is Under Construction
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default WelcomeModal;
