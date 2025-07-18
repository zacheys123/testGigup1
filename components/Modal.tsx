import { UserProps, VideoProfileProps } from "@/types/userinterfaces";
import { motion } from "framer-motion";
import Chat from "./chat/Chat";

interface ModalProps {
  onOpenX: () => void;
  onClose: () => void;
  modal: {
    type: string;
    user: UserProps;
  };
  user: UserProps;
}

const Modal: React.FC<ModalProps> = ({ onClose, modal, user, onOpenX }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className=" rounded-lg p-6 shadow-lg max-w-md w-full text-white relative flex  h-[100%] justify-center items-center"
  >
    <div className="h-[70%] ">
      <h2 className="text-xl font-bold mb-4">
        {modal.type === "chat" ? (
          <Chat
            onClose={onClose}
            modal={modal}
            myuser={user}
            onOpenX={onOpenX}
          />
        ) : (
          <section className="h-[500px] w-full">
            {modal?.user?.videosProfile &&
              modal?.user?.videosProfile?.length > 0 && (
                <header className="my-3">{`${modal?.user?.firstname}'s Videos`}</header>
              )}
            {modal?.user?.videosProfile &&
            modal?.user?.videosProfile.length > 0 ? (
              <div className="overflow-y-scroll h-full ">
                {modal?.user?.videosProfile.map((video: VideoProfileProps) => (
                  <video
                    src={video?.url}
                    key={video?._id}
                    controls
                    className="w-full h-full object-cover my-3 shadow-md shadow-yellow-800 "
                  />
                ))}
              </div>
            ) : (
              <div className="flex  h-[100%] justify-center items-center">
                <p className="text-center text-gray-400">
                  {modal?.user?.videosProfile?.length === 0
                    ? "No videos found"
                    : ""}
                </p>
              </div>
            )}
          </section>
        )}
      </h2>
      <button
        onClick={onClose}
        className="absolute top-8 right-12 text-gray-200 hover:text-white transition-all"
      >
        ✕
      </button>
    </div>
  </motion.div>
);

export default Modal;
