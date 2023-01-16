import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import * as styles from "./styles";

const image = [
  "/images/bingo-bluey.gif",
  "/images/you-win-you-did-it.gif",
  "/images/christoph-waltz.gif",
  "/images/excited-adventure-time.gif",
  "/images/giphy.gif",
];

interface CelebrationProps {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

export const Celebration = (props: CelebrationProps) => {
  const { isOpen = true, handleClose, handleOpen } = props;
  const randomImage = image[Math.floor(Math.random() * image.length)];

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-you-win"
        aria-describedby="modal-you-win-meme"
      >
        <Box sx={styles.container}>
          <Image
            src={randomImage}
            alt="You Win Meme"
            fill
          />
        </Box>
      </Modal>
    </div>
  );
};

export default Celebration;
